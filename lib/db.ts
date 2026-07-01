import { eq } from "drizzle-orm";
import { getDb } from "./db/drizzle";
import {
  products as productsTable,
  testimonials as testimonialsTable,
  heroSlides as heroSlidesTable,
  faqs as faqsTable,
  cmsSettings as cmsSettingsTable,
} from "./db/schema";
import { Product, products as defaultProducts, testimonials as defaultTestimonials, faqs as defaultFAQs } from "./data";

export interface Testimonial {
  id: string;
  name: string;
  team: string;
  text: string;
  rating: number;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface FAQ {
  id: string;
  q: string;
  a: string;
}

export interface CMSSettings {
  shopName: string;
  slogan: string;
  address: string;
  mapsUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  shopeeUrl: string;
  tokopediaUrl: string;
  lazadaUrl: string;
  aboutTitle: string;
  aboutDesc1: string;
  aboutDesc2: string;
  customImage: string;
  customFabricChipTitle: string;
  customFabricChipDesc: string;
  customTitle: string;
  customSubtitle: string;
}

const defaultCMS: CMSSettings = {
  shopName: "CPX JERSEY",
  slogan: "Bikin jersey tim yang kelihatan beda.",
  address: "Jl. Griya Cempaka Arum, Rancanumpang, Kec. Gedebage, Kota Bandung, Jawa Barat",
  mapsUrl: "https://maps.google.com/maps?cid=13496578164680451559&output=embed",
  instagramUrl: "https://www.instagram.com/cpx.sportswear/",
  tiktokUrl: "https://www.tiktok.com/@cpx.sportswear",
  shopeeUrl: "https://shopee.co.id/cpxonline",
  tokopediaUrl: "https://www.tokopedia.com/abaholot",
  lazadaUrl: "https://www.lazada.co.id/shop/tojerbike",
  aboutTitle: "MEWADAHI SEMANGAT SPORTIVITAS & GAYA.",
  aboutDesc1: "CPX hadir untuk mewadahi semangat sportivitas dan gaya. Setiap jahitan dirancang guna memberikan performa serta kenyamanan maksimal. Melayani pembuatan jersey bola, futsal, basket, hingga e-sport yang semuanya bisa di-custom sesuai keinginan konsumen.",
  aboutDesc2: "Kami telah berpengalaman di industri konveksi olahraga dan dipercaya oleh ratusan tim serta komunitas di seluruh Indonesia untuk tampil solid di dalam maupun luar lapangan.",
  customImage: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1400&q=90",
  customFabricChipTitle: "DRY-X™ FABRIC",
  customFabricChipDesc: "Stay cool. Play harder.",
  customTitle: "YOUR TEAM. YOUR RULES.",
  customSubtitle: "Dari ide pertama sampai jersey siap tanding, tim desain kami bantu wujudkan identitas tim kamu dengan detail yang presisi.",
};

// ----------------------------------------------------
// PRODUCTS
// ----------------------------------------------------
export async function getStoredProducts(): Promise<Product[]> {
  const db = getDb();
  const rows = await db.select().from(productsTable);
  if (rows.length === 0) return defaultProducts;
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    type: r.type,
    price: r.price,
    discountPrice: r.discountPrice ?? undefined,
    image: r.image,
    images: r.images,
    tag: r.tag ?? undefined,
    colors: r.colors,
    sizes: r.sizes,
    description: r.description,
    materialJersey: r.materialJersey ?? undefined,
    materialCelana: r.materialCelana ?? undefined,
    isCustom: r.isCustom ?? undefined,
    minOrder: r.minOrder ?? undefined,
    wholesalePrice: r.wholesalePrice ?? undefined,
    suitableFor: r.suitableFor ?? undefined,
  }));
}

export async function saveProducts(list: Product[]) {
  const db = getDb();
  await db.delete(productsTable);
  if (list.length > 0) {
    await db.insert(productsTable).values(
      list.map((p) => ({
        id: p.id,
        name: p.name,
        type: p.type,
        price: p.price,
        discountPrice: p.discountPrice ?? null,
        image: p.image,
        images: p.images,
        tag: p.tag ?? null,
        colors: p.colors,
        sizes: p.sizes,
        description: p.description,
        materialJersey: p.materialJersey ?? null,
        materialCelana: p.materialCelana ?? null,
        isCustom: p.isCustom ?? false,
        minOrder: p.minOrder ?? null,
        wholesalePrice: p.wholesalePrice ?? null,
        suitableFor: p.suitableFor ?? [],
      }))
    );
  }
}

// ----------------------------------------------------
// TESTIMONIALS
// ----------------------------------------------------
export async function getStoredTestimonials(): Promise<Testimonial[]> {
  const db = getDb();
  const rows = await db.select().from(testimonialsTable);
  if (rows.length === 0) return defaultTestimonials;
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    team: r.team,
    text: r.text,
    rating: r.rating,
  }));
}

export async function saveTestimonials(list: Testimonial[]) {
  const db = getDb();
  await db.delete(testimonialsTable);
  if (list.length > 0) {
    await db.insert(testimonialsTable).values(list);
  }
}

// ----------------------------------------------------
// ADMINS (kept in localStorage — no auth to tie to DB)
// ----------------------------------------------------
export function getStoredAdmins(): string[] {
  if (typeof window === "undefined") return ["6285172003667", "6285172003668"];
  const stored = localStorage.getItem("cpx_admins");
  if (!stored) {
    const defaults = ["6285172003667", "6285172003668"];
    localStorage.setItem("cpx_admins", JSON.stringify(defaults));
    return defaults;
  }
  try {
    const parsed = JSON.parse(stored);
    return parsed.length > 0 ? parsed : ["6285172003667", "6285172003668"];
  } catch {
    return ["6285172003667", "6285172003668"];
  }
}

export function saveAdmins(list: string[]) {
  if (typeof window === "undefined") return;
  const cleaned = list.filter((num) => num.trim() !== "");
  localStorage.setItem("cpx_admins", JSON.stringify(cleaned.length > 0 ? cleaned : ["6285172003667", "6285172003668"]));
}

// ----------------------------------------------------
// HERO SLIDES
// ----------------------------------------------------
export async function getStoredSlides(): Promise<HeroSlide[]> {
  const db = getDb();
  const rows = await db.select().from(heroSlidesTable);
  if (rows.length === 0) {
    return [
      { id: "slide-1", title: "BIKIN JERSEY TIM YANG KELIHATAN BEDA.", subtitle: "Studio jersey custom untuk tim, komunitas, dan brand yang butuh tampilan kuat, bahan nyaman, dan proses produksi yang jelas. CPX membantu tampil solid.", image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1600&q=80" },
      { id: "slide-2", title: "CPX VICTORY PREMIUM EDITION.", subtitle: "Material pilihan Dryfit Milano dengan pola zig-zag eksklusif, halus, adem, dan cepat menyerap keringat. Tersedia harga grosir.", image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1600&q=80" },
      { id: "slide-3", title: "MADE FOR THOSE WHO NEVER SETTLE.", subtitle: "Kombinasi desain yang berani, material yang tepat, dan pengerjaan tanpa kompromi untuk tim Anda.", image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1600&q=80" },
    ];
  }
  return rows.map((r) => ({ id: r.id, title: r.title, subtitle: r.subtitle, image: r.image }));
}

export async function saveSlides(list: HeroSlide[]) {
  const db = getDb();
  await db.delete(heroSlidesTable);
  if (list.length > 0) {
    await db.insert(heroSlidesTable).values(list);
  }
}

// ----------------------------------------------------
// WISHLIST (stays in localStorage — per-user, no auth)
// ----------------------------------------------------
export function getStoredWishlist(): string[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("cpx_wishlist");
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function saveWishlist(list: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("cpx_wishlist", JSON.stringify(list));
}

// ----------------------------------------------------
// CMS SETTINGS
// ----------------------------------------------------
export async function getStoredCMS(): Promise<CMSSettings> {
  const db = getDb();
  const rows = await db.select().from(cmsSettingsTable).where(eq(cmsSettingsTable.id, "singleton"));
  if (!rows.length) return defaultCMS;
  const r = rows[0];
  return {
    shopName: r.shopName,
    slogan: r.slogan,
    address: r.address,
    mapsUrl: r.mapsUrl,
    instagramUrl: r.instagramUrl,
    tiktokUrl: r.tiktokUrl,
    shopeeUrl: r.shopeeUrl,
    tokopediaUrl: r.tokopediaUrl,
    lazadaUrl: r.lazadaUrl,
    aboutTitle: r.aboutTitle,
    aboutDesc1: r.aboutDesc1,
    aboutDesc2: r.aboutDesc2,
    customImage: r.customImage,
    customFabricChipTitle: r.customFabricChipTitle,
    customFabricChipDesc: r.customFabricChipDesc,
    customTitle: r.customTitle,
    customSubtitle: r.customSubtitle,
  };
}

export async function saveCMS(settings: CMSSettings) {
  const db = getDb();
  await db
    .insert(cmsSettingsTable)
    .values({ ...settings, id: "singleton", updatedAt: new Date() })
    .onConflictDoUpdate({
      target: cmsSettingsTable.id,
      set: { ...settings, updatedAt: new Date() },
    });
}

// ----------------------------------------------------
// FAQS
// ----------------------------------------------------
export async function getStoredFAQs(): Promise<FAQ[]> {
  const db = getDb();
  const rows = await db.select().from(faqsTable);
  if (rows.length === 0) {
    return defaultFAQs.map((f, i) => ({ id: `faq-${i + 1}`, q: f.q, a: f.a }));
  }
  return rows.map((r) => ({ id: r.id, q: r.q, a: r.a }));
}

export async function saveFAQs(list: FAQ[]) {
  const db = getDb();
  await db.delete(faqsTable);
  if (list.length > 0) {
    await db.insert(faqsTable).values(list);
  }
}
