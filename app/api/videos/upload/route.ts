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

    const contentType = req.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      // 支持手动上传后插入 metadata
      const body = await req.json()

      if (!body.title || !body.url || !body.key || !body.courseId) {
        return NextResponse.json({ error: '缺少字段' }, { status: 400 })
      }

      const video = await Video.create({
        title: body.title,
        url: body.url,
        key: body.key,
        courseId: body.courseId,
        duration: body.duration || '00:00',
        uploadedBy: session.user.id,
        createdAt: new Date(),
        watched: false
      })

      return NextResponse.json({ video })
    }

    // 表单上传流程
    const formData = await req.formData()
    const videoFile = formData.get('video') as File
    const title = formData.get('title') as string
    const courseId = formData.get('courseId') as string

    if (!videoFile || !title || !courseId) {
      return NextResponse.json({ error: '缺少必需字段' }, { status: 400 })
    }

    const fileName = `${Date.now()}-${videoFile.name}`
    const fileKey = `course-videos/${fileName}`
    const fileBuffer = Buffer.from(await videoFile.arrayBuffer())
    const url = await uploadToS3(fileBuffer, fileKey, videoFile.type)

    const video = await Video.create({
      title,
      courseId,
      url,
      key: fileKey,
      duration: '00:00',
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