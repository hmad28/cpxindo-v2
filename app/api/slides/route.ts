import { NextResponse } from "next/server";
import { getDb } from "@/lib/db/drizzle";
import { heroSlides } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/api-auth";

export async function GET() {
  const db = getDb();
  const rows = await db.select().from(heroSlides);
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const authErr = await requireAdmin();
  if (authErr) return authErr;

  const db = getDb();
  const body = await req.json();
  const inserted = await db.insert(heroSlides).values(body).returning();
  return NextResponse.json(inserted[0], { status: 201 });
}
