import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getDb } from "@/lib/db/drizzle";
import { products } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/api-auth";
import { parseJson } from "@/lib/api-validation";
import { ProductSchema } from "@/lib/validations";
import { getCachedProducts, storefrontTags } from "@/lib/storefront";

function revalidateProducts() {
  revalidateTag(storefrontTags.products, { expire: 0 });
  revalidateTag(storefrontTags.all, { expire: 0 });
}

export async function GET() {
  const rows = await getCachedProducts();
  return NextResponse.json(rows, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
  });
}

export async function POST(req: Request) {
  const authErr = await requireAdmin();
  if (authErr) return authErr;

  const db = getDb();
  const parsed = await parseJson(req, ProductSchema);
  if (parsed.error) return parsed.error;
  const inserted = await db.insert(products).values(parsed.data).returning();
  revalidateProducts();
  return NextResponse.json(inserted[0], { status: 201 });
}
