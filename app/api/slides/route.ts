import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getDb } from "@/lib/db/drizzle";
import { heroSlides } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/api-auth";
import { parseJson } from "@/lib/api-validation";
import { HeroSlideSchema } from "@/lib/validations";
import { getCachedSlides, storefrontTags } from "@/lib/storefront";

function revalidateSlides() {
  revalidateTag(storefrontTags.slides, { expire: 0 });
  revalidateTag(storefrontTags.all, { expire: 0 });
}

export async function GET() {
  const rows = await getCachedSlides();
  return NextResponse.json(rows, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
  });
}

export async function POST(req: Request) {
  const authErr = await requireAdmin();
  if (authErr) return authErr;

  const db = getDb();
  const parsed = await parseJson(req, HeroSlideSchema);
  if (parsed.error) return parsed.error;
  const inserted = await db.insert(heroSlides).values(parsed.data).returning();
  revalidateSlides();
  return NextResponse.json(inserted[0], { status: 201 });
}
