import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/admin')) {
    const res = NextResponse.next();
    res.headers.set('x-admin-route', '1');

    if (pathname !== '/admin/login') {
      const session = req.cookies.get('cpx_admin_session');
      if (!session || session.value !== 'authenticated') {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }
    }

    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
