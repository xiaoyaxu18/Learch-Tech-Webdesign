import { NextResponse } from 'next/server'
import dbConnect from '@/app/lib/db'
import User from '@/app/models/User'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(req: Request) {
  try {
    console.log('Connecting to database...')
    await dbConnect()
    
    const body = await req.json()
    console.log('Received registration data:', body)

    const { name, email, password } = body

    // 检查必需字段
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 检查邮箱是否已存在
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email is already registered' },
        { status: 400 }
      )
    }

    // 创建新用户
    console.log('Creating new user...')
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

    console.log('User created successfully')

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    })
  } catch (error: any) {
    console.error('Registration API error:', error)
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 500 }
    )
  }
} 