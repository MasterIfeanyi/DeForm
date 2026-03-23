import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import prisma from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)

  console.log('SESSION USER ID:', session?.user?.id)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }


  const allForms = await prisma.form.findMany({ take: 3 });
  console.log('SAMPLE FORMS:', allForms.map(f => f.userId));

  const forms = await prisma.form.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      published: true,
      submissionCount: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  const mapped = forms.map((form) => ({
    id: form.id,
    title: form.title,
    description: form.description,
    status: form.status,
    published: form.published,
    responseCount: form.submissionCount,
    createdAt: form.createdAt,
    updatedAt: form.updatedAt,
  }))

  console.log('FORMS FOUND:', forms.length, forms)

  return NextResponse.json(mapped)
}