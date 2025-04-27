import { NextResponse } from 'next/server'
import dbConnect from '@/app/lib/db'
import Video from '@/app/models/Video'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(
  req: Request,
  { params }: { params: { videoId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: '未授权' }, { status: 401 })
    }

    await dbConnect()
    
    const video = await Video.findById(params.videoId)
      .populate('uploadedBy', 'name')
      .lean()

    if (!video) {
      return NextResponse.json({ error: '视频不存在' }, { status: 404 })
    }

    return NextResponse.json(video)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '获取视频失败' },
      { status: 500 }
    )
  }
} 