// app/api/auth/verify-email/route.js
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: 'Token is required' }, { status: 400 });
  }

  const record = await db.verificationToken.findUnique({
    where: { token },
    include: { user: true },
  });

  // 1. Token doesn't exist
  if (!record) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }

  // 2. Token expired
  if (record.expiresAt < new Date()) {
    await db.verificationToken.delete({ where: { token } });
    return NextResponse.json({ error: 'Token has expired' }, { status: 400 });
  }

  // 3. All good — mark user as verified
  await db.user.update({
    where: { id: record.userId },
    data: { emailVerified: new Date() },
  });

  // Clean up token — one-time use
  await db.verificationToken.delete({ where: { token } });

  return NextResponse.json({ success: true });
}