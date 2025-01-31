import { NextResponse } from 'next/server'
import dbConnect from '@/app/lib/db'

export async function GET() {
  try {
    await dbConnect()
    return NextResponse.json({ message: '数据库连接成功' })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
} 