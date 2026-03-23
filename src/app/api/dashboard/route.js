import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';

export async function GET(req) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userId = session.user.id;

  const [forms, responses] = await Promise.all([
    prisma.form.count({ where: { userId } }),
    prisma.response.count({ where: { form: { userId } } }),
  ]);

  return NextResponse.json({
    forms:      { total: forms     },
    responses:  { total: responses },
    views:      { total: 0         }, // add later
    conversion: { rate: 0          }, // add later
  });
}