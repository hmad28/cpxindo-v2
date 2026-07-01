import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Simple in-memory rate limiter
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > MAX_ATTEMPTS;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Terlalu banyak percobaan. Coba lagi dalam 15 menit.' }, { status: 429 });
  }

  const hash = process.env.ADMIN_PASSCODE_HASH;
  if (!hash) {
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
  attempts.delete(ip);

  const res = NextResponse.json({ success: true });
  res.cookies.set('cpx_admin_session', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return res;
}
