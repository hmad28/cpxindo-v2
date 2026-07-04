import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db/drizzle";
import { faqs } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/api-auth";
import { parseJson } from "@/lib/api-validation";
import { FAQSchema } from "@/lib/validations";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authErr = await requireAdmin();
  if (authErr) return authErr;

  const { id } = await params;
  const db = getDb();
  const parsed = await parseJson(req, FAQSchema);
  if (parsed.error) return parsed.error;
  const updated = await db
    .update(faqs)
    .set({ ...parsed.data, id, updatedAt: new Date() })
    .where(eq(faqs.id, id))
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
  const deleted = await db.delete(faqs).where(eq(faqs.id, id)).returning();

  if (!deleted.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
