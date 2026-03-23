import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req) {
  const { code, email } = await req.json();

  if (!code) {
    return NextResponse.json({ error: 'Verification code is required' }, { status: 400 });
  }

  const record = await prisma.verificationToken.findUnique({
    where: { token: code },
    include: { user: true },
  });

  if (!record) {
    return NextResponse.json({ error: 'Invalid token or expired code' }, { status: 400 });
  }

  if (record.expiresAt < new Date()) {
    await prisma.verificationToken.delete({ where: { token: code } });
    return NextResponse.json({ error: 'Code has expired' }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: record.userId },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({ where: { token: code } });

  return NextResponse.json({ success: true, email: record.user.email });
}