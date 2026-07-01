import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db/drizzle";
import { heroSlides } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/api-auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authErr = await requireAdmin();
  if (authErr) return authErr;

  const { id } = await params;
  const db = getDb();
  const body = await req.json();
  const updated = await db
    .update(heroSlides)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(heroSlides.id, id))
    .returning();

  if (!updated.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(updated[0]);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authErr = await requireAdmin();
  if (authErr) return authErr;

  const { id } = await params;
  const db = getDb();
  const deleted = await db.delete(heroSlides).where(eq(heroSlides.id, id)).returning();

  if (!deleted.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
