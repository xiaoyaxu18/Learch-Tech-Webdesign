import { NextResponse } from 'next/server'
import { getDb } from '../../lib/mongodb'
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

function generateAccessCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const db = await getDb()
  const accessCode = generateAccessCode()

  try {
    await db.collection('accessCodes').insertOne({
      userId: session.user.id,
      code: accessCode,
      createdAt: new Date(),
      isActive: true
    })

    return NextResponse.json({ accessCode })
  } catch (error) {
    console.error('Failed to create access code:', error)
    return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 })
  }
} 