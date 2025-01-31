import { NextResponse } from 'next/server'
import dbConnect from '@/app/lib/db'
import User from '@/app/models/User'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(req: Request) {
  try {
    await dbConnect()
    
    const { name, email, password } = await req.json()

    // 检查邮箱是否已存在
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email is already registered' },
        { status: 400 }
      )
    }

    // 创建新用户
    const user = await User.create({
      name,
      email,
      password
    })

    // 生成 JWT
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
} 