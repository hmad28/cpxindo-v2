import { NextResponse } from "next/server";
import { getDb } from "@/lib/db/drizzle";
import { heroSlides } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/api-auth";
import { parseJson } from "@/lib/api-validation";
import { HeroSlideSchema } from "@/lib/validations";

export async function GET() {
  const db = getDb();
  const rows = await db.select().from(heroSlides);
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const authErr = await requireAdmin();
  if (authErr) return authErr;

  const db = getDb();
  const parsed = await parseJson(req, HeroSlideSchema);
  if (parsed.error) return parsed.error;
  const inserted = await db.insert(heroSlides).values(parsed.data).returning();
  return NextResponse.json(inserted[0], { status: 201 });
}
