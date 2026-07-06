import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createAdminSession } from '@/lib/admin-session';
import { getClientIp, isAdminLoginRateLimited, resetAdminLoginRateLimit } from '@/lib/admin-rate-limit';

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);

  if (await isAdminLoginRateLimited(ip)) {
    return NextResponse.json({ error: 'Terlalu banyak percobaan. Coba lagi dalam 15 menit.' }, { status: 429 });
  }

  const hash = process.env.ADMIN_PASSCODE_HASH;
  const sessionSecret = process.env.SESSION_SECRET;
  if (!hash || !sessionSecret) {
    return NextResponse.json({ error: 'Server tidak terkonfigurasi' }, { status: 500 });
  }

  let body: { passcode?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Request tidak valid' }, { status: 400 });
  }

  const { passcode } = body;
  if (!passcode || typeof passcode !== 'string') {
    return NextResponse.json({ error: 'Passcode diperlukan' }, { status: 400 });
  }

  const valid = await bcrypt.compare(passcode, hash);
  if (!valid) {
    return NextResponse.json({ error: 'Passcode admin salah' }, { status: 401 });
  }

  // Reset rate limit on success
  await resetAdminLoginRateLimit(ip);

  const res = NextResponse.json({ success: true });
  res.cookies.set('cpx_admin_session', await createAdminSession(sessionSecret, 60 * 60 * 8), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return res;
}
