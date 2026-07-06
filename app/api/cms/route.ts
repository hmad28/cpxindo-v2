import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db/drizzle";
import { cmsSettings } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/api-auth";
import { parseJson } from "@/lib/api-validation";
import { CMSSettingsSchema } from "@/lib/validations";
import { getCachedCMS, storefrontTags } from "@/lib/storefront";

function revalidateCMS() {
  revalidateTag(storefrontTags.cms, { expire: 0 });
  revalidateTag(storefrontTags.all, { expire: 0 });
}

export async function GET() {
  const row = await getCachedCMS();
  return NextResponse.json(row, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
  });
}

export async function PUT(req: Request) {
  const authErr = await requireAdmin();
  if (authErr) return authErr;

  const db = getDb();
  const parsed = await parseJson(req, CMSSettingsSchema);
  if (parsed.error) return parsed.error;
  const body = parsed.data;
  const updated = await db
    .insert(cmsSettings)
    .values({ ...body, id: "singleton", updatedAt: new Date() })
    .onConflictDoUpdate({
      target: cmsSettings.id,
      set: { ...body, updatedAt: new Date() },
    })
    .returning();

  revalidateCMS();
  return NextResponse.json(updated[0]);
}
