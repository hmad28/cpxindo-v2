import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { getDb } from "./drizzle";
import { products, testimonials, heroSlides, faqs, cmsSettings } from "./schema";
import { products as defaultProducts, testimonials as defaultTestimonials, faqs as defaultFAQs } from "../data";

const defaultSlides = [
  {
    id: "slide-1",
    title: "BIKIN JERSEY TIM YANG KELIHATAN BEDA.",
    subtitle: "Studio jersey custom untuk tim, komunitas, dan brand yang butuh tampilan kuat, bahan nyaman, dan proses produksi yang jelas. CPX membantu tampil solid.",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "slide-2",
    title: "CPX VICTORY PREMIUM EDITION.",
    subtitle: "Material pilihan Dryfit Milano dengan pola zig-zag eksklusif, halus, adem, dan cepat menyerap keringat. Tersedia harga grosir.",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "slide-3",
    title: "MADE FOR THOSE WHO NEVER SETTLE.",
    subtitle: "Kombinasi desain yang berani, material yang tepat, dan pengerjaan tanpa kompromi untuk tim Anda.",
    image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "slide-4",
    title: "CUSTOM JERSEY UNTUK SETIAP OLAHRAGA.",
    subtitle: "Dari basket, badminton, futsal, hingga e-sport — semua bisa di-custom sesuai identitas tim kamu.",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "slide-5",
    title: "HARGA GROSIR, KUALITAS PREMIUM.",
    subtitle: "Minimal 6 pcs sudah dapat harga grosir. Semakin banyak, semakin hemat. Cocok untuk tim dan komunitas.",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1600&q=80",
  },
];

const defaultCMS = {
  id: "singleton",
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

async function seed() {
  const db = getDb();
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(products);
  await db.delete(testimonials);
  await db.delete(heroSlides);
  await db.delete(faqs);
  await db.delete(cmsSettings);
  console.log("  Cleared existing data");

  await db.insert(products).values(
    defaultProducts.map((p) => ({
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
  ).onConflictDoNothing();
  console.log(`  Products: ${defaultProducts.length}`);

  await db.insert(testimonials).values(
    defaultTestimonials.map((t) => ({
      id: t.id,
      name: t.name,
      team: t.team,
      text: t.text,
      rating: t.rating,
    }))
  ).onConflictDoNothing();
  console.log(`  Testimonials: ${defaultTestimonials.length}`);

  await db.insert(heroSlides).values(defaultSlides).onConflictDoNothing();
  console.log(`  Hero Slides: ${defaultSlides.length}`);

  await db.insert(faqs).values(
    defaultFAQs.map((f, i) => ({
      id: `faq-${i + 1}`,
      q: f.q,
      a: f.a,
    }))
  ).onConflictDoNothing();
  console.log(`  FAQs: ${defaultFAQs.length}`);

  await db.insert(cmsSettings).values(defaultCMS).onConflictDoNothing();
  console.log(`  CMS Settings: 1`);

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
