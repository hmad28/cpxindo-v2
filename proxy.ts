import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "./lib/admin-session";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    const res = NextResponse.next();
    res.headers.set("x-admin-route", "1");

    if (pathname !== "/admin/login") {
      const session = req.cookies.get("cpx_admin_session");
      const isValid = await verifyAdminSession(session?.value, process.env.SESSION_SECRET);
      if (!isValid) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }
    }

    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
