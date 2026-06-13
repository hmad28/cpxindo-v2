import { and, desc, eq, type SQL } from "drizzle-orm";
import { db } from "@/lib/db";
import { products, type Product } from "@/lib/db/schema";

export const demoProducts: Product[] = [
  { id:"ravelle", slug:"ravelle-home-2026", name:"Ravelle Home 2026", category:"Football", description:"Jersey match-day dengan material DRY-X™ yang ringan, breathable, dan cepat kering. Dibuat untuk performa tinggi sepanjang pertandingan.", price:189000, compareAtPrice:null, image:"https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=85", images:[], sizes:["S","M","L","XL","XXL"], colors:["Red","Black","White"], stock:48, featured:true, active:true, createdAt:new Date(), updatedAt:new Date() },
  { id:"velocity", slug:"velocity-court-pro", name:"Velocity Court Pro", category:"Basketball", description:"Basketball jersey dengan potongan atletis dan ventilasi maksimal untuk gerakan tanpa batas.", price:219000, compareAtPrice:249000, image:"https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1200&q=85", images:[], sizes:["S","M","L","XL"], colors:["Black","Red"], stock:32, featured:true, active:true, createdAt:new Date(), updatedAt:new Date() },
  { id:"apex", slug:"apex-training-tee", name:"Apex Training Tee", category:"Training", description:"Performance tee serbaguna untuk latihan harian dengan konstruksi lembut dan stretch.", price:149000, compareAtPrice:null, image:"https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=85", images:[], sizes:["S","M","L","XL","XXL"], colors:["Red","Black","Grey"], stock:71, featured:true, active:true, createdAt:new Date(), updatedAt:new Date() },
  { id:"core", slug:"core-match-shorts", name:"Core Match Shorts", category:"Football", description:"Celana pertandingan ringan dengan waistband elastis dan panel yang mendukung mobilitas.", price:129000, compareAtPrice:null, image:"https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=85", images:[], sizes:["S","M","L","XL"], colors:["Black","Red"], stock:54, featured:true, active:true, createdAt:new Date(), updatedAt:new Date() },
];

export async function getProducts(options?: { featured?: boolean; category?: string; includeInactive?: boolean }) {
  if (!db) return demoProducts.filter((p) => (!options?.featured || p.featured) && (!options?.category || p.category === options.category));
  const conditions = [
    options?.includeInactive ? undefined : eq(products.active, true),
    options?.featured ? eq(products.featured, true) : undefined,
    options?.category ? eq(products.category, options.category) : undefined,
  ].filter((condition): condition is SQL => Boolean(condition));
  return db.select().from(products).where(conditions.length ? and(...conditions) : undefined).orderBy(desc(products.createdAt));
}

export async function getProduct(slug: string) {
  if (!db) return demoProducts.find((product) => product.slug === slug) ?? null;
  const [product] = await db.select().from(products).where(and(eq(products.slug, slug), eq(products.active, true))).limit(1);
  return product ?? null;
}

export function formatIDR(value: number) { return new Intl.NumberFormat("id-ID", { style:"currency", currency:"IDR", maximumFractionDigits:0 }).format(value); }
