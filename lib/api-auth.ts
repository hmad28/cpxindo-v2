import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyAdminSession } from "./admin-session";

export async function requireAdmin(): Promise<NextResponse | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("cpx_admin_session");
  const isValid = await verifyAdminSession(session?.value, process.env.SESSION_SECRET);
  if (!isValid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
