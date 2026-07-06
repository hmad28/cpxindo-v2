import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { getDb } from "./drizzle";
import { products } from "./schema";
import { eq } from "drizzle-orm";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { createServer } from "http";

const IMG_DIR = join(process.cwd(), "public", "images", "products");

// Paste fresh cookies from browser here
const COOKIES = process.env.TOKPED_COOKIES || "";

// Product URLs scraped from store listing
const PRODUCT_URLS: Record<string, string> = {
  "tokped-103423146226":
    "https://www.tokopedia.com/abaholot/jersey-olahraga-wanita-anti-uv-padel-tenis-badminton-benzema-m-tiis-quickdry-elastis-anti-lembab-ladies-1736217737053504840-1736217895998358856",
  "tokped-103374273045":
    "https://www.tokopedia.com/abaholot/jersey-trail-motocross-gritrail-airflow-ventilasi-dry-fit-jersey-cross-mtb-downhill-adventure-1735544532950680904-1735544617302787400",
  "tokped-102582457060":
    "https://www.tokopedia.com/abaholot/cpx-sport-set-cycling-jersey-baju-gowes-mtb-lengan-pendek-plus-celana-sepeda-pria-training-panjang-1733268971729290568",
  "tokped-102179275323":
    "https://www.tokopedia.com/abaholot/baju-jersey-sport-oversize-cpx-one-piece-07-olaharaga-dan-gaya-casual-santai-join-nakama-sport-1732342232760288584",
};

async function fetchPageImageUrls(url: string): Promise<string[]> {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
      Cookie: COOKIES,
      Accept: "text/html,application/xhtml+xml",
      Referer: "https://www.tokopedia.com/",
    },
  });
  if (!res.ok) return [];
  const html = await res.text();

  const imgMatches =
    html.match(
      /https:\/\/p\d+-images-sign[^"'\s]+aphluv4xwc[^"'\s]+\.jpeg/g
    ) || [];

  const hashMap = new Map<string, string>();
  for (const u of imgMatches) {
    const hashMatch = u.match(/\/([a-f0-9]{32})~/);
    if (!hashMatch) continue;
    const hash = hashMatch[1];
    if (
      !hashMap.has(hash) ||
      (u.includes("white-pad") && !hashMap.get(hash)!.includes("white-pad"))
    ) {
      hashMap.set(hash, u);
    }
  }
  return Array.from(hashMap.values());
}

function startLocalServer(): Promise<{
  port: number;
  close: () => void;
  getFiles: () => Map<string, Buffer>;
}> {
  return new Promise((resolve) => {
    const files = new Map<string, Buffer>();
    const server = createServer((req, res) => {
      if (req.method === "POST" && req.url === "/save") {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
          try {
            const data = JSON.parse(body);
            const buf = Buffer.from(data.base64, "base64");
            files.set(data.filename, buf);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ ok: true, size: buf.length }));
          } catch (e) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: String(e) }));
          }
        });
      } else if (req.method === "GET" && req.url === "/health") {
        res.writeHead(200);
        res.end(JSON.stringify({ count: files.size }));
      } else {
        res.writeHead(404);
        res.end("not found");
      }
    });
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      const port = typeof addr === "object" && addr ? addr.port : 0;
      resolve({
        port,
        close: () => server.close(),
        getFiles: () => files,
      });
    });
  });
}

async function main() {
  if (!COOKIES) {
    console.error("Set TOKPED_COOKIES env var with browser cookies");
    process.exit(1);
  });

  await mkdir(IMG_DIR, { recursive: true });
  const db = getDb();

  const allProducts = await db.select().from(products);
  const tokpedProducts = allProducts.filter((p) =>
    p.id.startsWith("tokped-")
  );
  console.log(`Found ${tokpedProducts.length} Tokopedia products in DB`);

  // Step 1: Fetch image URLs from HTML (Node.js fetch works for HTML)
  const productImageUrls = new Map<string, string[]>();

  for (const [productId, url] of Object.entries(PRODUCT_URLS)) {
    console.log(`\nFetching page for ${productId}...`);
    const imageUrls = await fetchPageImageUrls(url);
    console.log(`  Found ${imageUrls.length} unique images`);
    if (imageUrls.length > 0) {
      productImageUrls.set(productId, imageUrls);
    }
    await new Promise((r) => setTimeout(r, 500));
  });

  if (productImageUrls.size === 0) {
    console.log("No images found. Check cookies.");
    process.exit(1);
  });

  // Step 2: Output image URLs as JSON for browser download
  // The browser will fetch these and POST to our local server
  const manifest: Record<string, string[]> = {};
  productImageUrls.forEach((urls, pid) => {
      manifest[pid] = urls.slice(0, 5);
  });

  console.log("\n=== IMAGE_URLS_JSON ===");
  console.log(JSON.stringify(manifest));
  console.log("=== END_IMAGE_URLS ===");

  // Keep process alive for server
  console.log("\nWaiting for browser to download images...");
  console.log("Send SIGINT to stop.");

  // Wait for SIGINT
  await new Promise(() => {});
}

main().catch(console.error);
