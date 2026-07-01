import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db/drizzle";
import { cmsSettings } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/api-auth";

export async function GET() {
  const db = getDb();
  const rows = await db.select().from(cmsSettings).where(eq(cmsSettings.id, "singleton"));
  const row = rows[0] ?? null;
  return NextResponse.json(row);
}

export async function PUT(req: Request) {
  const authErr = await requireAdmin();
  if (authErr) return authErr;

  const db = getDb();
  const body = await req.json();
  const updated = await db
    .insert(cmsSettings)
    .values({ ...body, id: "singleton", updatedAt: new Date() })
    .onConflictDoUpdate({
      target: cmsSettings.id,
      set: { ...body, updatedAt: new Date() },
    })
    .returning();

  return NextResponse.json(updated[0]);
}
