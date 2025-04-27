import { NextResponse } from 'next/server'
import { uploadToS3 } from '@/app/lib/s3-utils'
import dbConnect from '@/app/lib/db'
import Video from '@/app/models/Video'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: '未授权' }, { status: 401 })
    }

    await dbConnect()
    
    const formData = await req.formData()
    const videoFile = formData.get('video') as File
    const title = formData.get('title') as string
    const courseId = formData.get('courseId') as string

    if (!videoFile || !title || !courseId) {
      return NextResponse.json({ error: '缺少必需字段' }, { status: 400 })
    }

    // 生成唯一的文件名
    const fileName = `${Date.now()}-${videoFile.name}`
    const fileKey = `course-videos/${fileName}`

    // 将文件转换为 Buffer
    const fileBuffer = Buffer.from(await videoFile.arrayBuffer())

    // 上传到 S3
    const url = await uploadToS3(fileBuffer, fileKey, videoFile.type)

    // 创建视频记录
    const video = await Video.create({
      title,
      courseId,
      url,
      key: fileKey, // 保存 S3 key 以便后续生成签名 URL
      duration: '00:00', // 这里需要实际计算视频时长
      uploadedBy: session.user.id
    })

    return NextResponse.json({ video })
  } catch (error: any) {
    console.error('视频上传错误:', error)
    return NextResponse.json(
      { error: error.message || '视频上传失败' },
      { status: 500 }
    )
  }
} 