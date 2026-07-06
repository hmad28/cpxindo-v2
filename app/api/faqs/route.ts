import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getDb } from "@/lib/db/drizzle";
import { faqs } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/api-auth";
import { parseJson } from "@/lib/api-validation";
import { FAQSchema } from "@/lib/validations";
import { getCachedFAQs, storefrontTags } from "@/lib/storefront";

function revalidateFAQs() {
  revalidateTag(storefrontTags.faqs, { expire: 0 });
  revalidateTag(storefrontTags.all, { expire: 0 });
}

export async function GET() {
  const rows = await getCachedFAQs();
  return NextResponse.json(rows, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
  });
}

export async function POST(req: Request) {
  const authErr = await requireAdmin();
  if (authErr) return authErr;

  const db = getDb();
  const parsed = await parseJson(req, FAQSchema);
  if (parsed.error) return parsed.error;
  const inserted = await db.insert(faqs).values(parsed.data).returning();
  revalidateFAQs();
  return NextResponse.json(inserted[0], { status: 201 });
}
