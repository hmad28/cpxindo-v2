import { NextResponse } from "next/server";
import { getDb } from "@/lib/db/drizzle";
import { faqs } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/api-auth";
import { parseJson } from "@/lib/api-validation";
import { FAQSchema } from "@/lib/validations";

export async function GET() {
  const db = getDb();
  const rows = await db.select().from(faqs);
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const authErr = await requireAdmin();
  if (authErr) return authErr;

  const db = getDb();
  const parsed = await parseJson(req, FAQSchema);
  if (parsed.error) return parsed.error;
  const inserted = await db.insert(faqs).values(parsed.data).returning();
  return NextResponse.json(inserted[0], { status: 201 });
}
