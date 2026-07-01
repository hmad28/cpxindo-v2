import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // Protect admin tab on dashboard
  if (pathname === '/dashboard' && searchParams.get('admin') === 'true') {
    const session = req.cookies.get('cpx_admin_session');
    if (!session || session.value !== 'authenticated') {
      const url = req.nextUrl.clone();
      url.searchParams.delete('admin');
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard'],
};
