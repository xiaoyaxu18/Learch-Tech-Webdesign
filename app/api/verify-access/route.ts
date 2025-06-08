import { NextResponse } from 'next/server'
import { getDb } from '../../lib/mongodb'
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { code } = await req.json()
  if (!code) {
    return NextResponse.json({ error: 'Access code is required' }, { status: 400 })
  }

  const db = await getDb()
  const accessCode = await db.collection('accessCodes').findOne({
    userId: session.user.id,
    code: code,
    isActive: true
  })

  if (!accessCode) {
    return NextResponse.json({ error: 'Invalid access code' }, { status: 403 })
  }

  return NextResponse.json({ valid: true })
} 