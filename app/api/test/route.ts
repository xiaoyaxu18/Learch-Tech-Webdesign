import { NextResponse } from 'next/server'
import dbConnect from '@/app/lib/db'
import mongoose from 'mongoose'

export async function GET() {
  try {
    await dbConnect()
    
    // 检查连接状态
    const connectionState = mongoose.connection.readyState
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting']
    
    return NextResponse.json({ 
      message: 'Database connection test',
      state: states[connectionState],
      database: mongoose.connection.name,
      host: mongoose.connection.host
    })
  } catch (error: any) {
    console.error('Database connection error:', error)
    return NextResponse.json(
      { 
        error: error.message,
        details: error.stack 
      },
      { status: 500 }
    )
  }
} 