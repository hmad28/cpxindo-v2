import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getDb } from "@/lib/db/drizzle";
import { testimonials } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/api-auth";
import { parseJson } from "@/lib/api-validation";
import { TestimonialSchema } from "@/lib/validations";
import { getCachedTestimonials, storefrontTags } from "@/lib/storefront";

function revalidateTestimonials() {
  revalidateTag(storefrontTags.testimonials, { expire: 0 });
  revalidateTag(storefrontTags.all, { expire: 0 });
}

export async function GET() {
  const rows = await getCachedTestimonials();
  return NextResponse.json(rows, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
  });
}

export async function POST(req: Request) {
  const authErr = await requireAdmin();
  if (authErr) return authErr;

  const db = getDb();
  const parsed = await parseJson(req, TestimonialSchema);
  if (parsed.error) return parsed.error;
  const inserted = await db.insert(testimonials).values(parsed.data).returning();
  revalidateTestimonials();
  return NextResponse.json(inserted[0], { status: 201 });
}
