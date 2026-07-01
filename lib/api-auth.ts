import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function requireAdmin(): Promise<NextResponse | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("cpx_admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
