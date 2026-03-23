import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import prisma from '@/lib/prisma'

export async function GET(_req, { params }) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const form = await prisma.form.findFirst({
    where: {
      id: params.id,
      userId: session.user.id,
    },
    include: {
      fields: {
        orderBy: { position: 'asc' },
      },
    },
  })

  if (!form) {
    return NextResponse.json({ error: 'Form not found' }, { status: 404 })
  }

  return NextResponse.json(form)
}

export async function DELETE(_req, { params }) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const form = await prisma.form.findFirst({
    where: {
      id: params.id,
      userId: session.user.id,
    },
  })

  if (!form) {
    return NextResponse.json({ error: 'Form not found' }, { status: 404 })
  }

  await prisma.form.delete({ where: { id: params.id } })

  return NextResponse.json({ success: true })
}