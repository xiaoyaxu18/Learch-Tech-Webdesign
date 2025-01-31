import { NextResponse } from 'next/server'
import dbConnect from '@/app/lib/db'
import User from '@/app/models/User'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(req: Request) {
  try {
    await dbConnect()
    
    const { email, password } = await req.json()

    // 查找用户并包含密码字段
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return NextResponse.json(
        { error: 'User does not exist' },
        { status: 401 }
      )
    }

    // 验证密码
    const isValid = await user.comparePassword(password)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Incorrect password' },
        { status: 401 }
      )
    }

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
      { error: 'An error occurred during login' },
      { status: 500 }
    )
  }
} 