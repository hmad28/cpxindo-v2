import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db/drizzle";
import { products } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/api-auth";
import { parseJson } from "@/lib/api-validation";
import { ProductSchema } from "@/lib/validations";
import { storefrontTags } from "@/lib/storefront";

function revalidateProducts() {
  revalidateTag(storefrontTags.products, { expire: 0 });
  revalidateTag(storefrontTags.all, { expire: 0 });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authErr = await requireAdmin();
  if (authErr) return authErr;

  const { id } = await params;
  const db = getDb();
  const parsed = await parseJson(req, ProductSchema);
  if (parsed.error) return parsed.error;
  const updated = await db
    .update(products)
    .set({ ...parsed.data, id, updatedAt: new Date() })
    .where(eq(products.id, id))
    .returning();

  if (!updated.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  revalidateProducts();
  return NextResponse.json(updated[0]);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authErr = await requireAdmin();
  if (authErr) return authErr;

  const { id } = await params;
  const db = getDb();
  const deleted = await db.delete(products).where(eq(products.id, id)).returning();

  if (!deleted.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  revalidateProducts();
  return NextResponse.json({ success: true });
}
