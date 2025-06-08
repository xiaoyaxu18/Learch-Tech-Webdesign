import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getDb } from '@/app/lib/mongodb' // 按你的实际路径调整
// import S3/MongoDB 相关依赖

const s3 = new S3Client({ region: process.env.AWS_REGION })

export async function POST(
  req: Request,
  { params }: { params: { courseId: string, assignmentId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  // 解析 multipart/form-data
  const formData = await req.formData()
  const file = formData.get('file') as File
  if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })

  // 读取文件内容
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // 构造 S3 key
  const key = `${params.courseId}/submitted-assignments/${session.user.id}_${params.assignmentId}_${file.name}`

  // 上传到 S3
  await s3.send(new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: file.type,
  }))

  // S3 文件 URL
  const s3Url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`

  // 记录到 MongoDB
  const db = await getDb()
  await db.collection('assignment_submissions').insertOne({
    courseId: params.courseId,
    assignmentId: params.assignmentId,
    userId: session.user.id,
    uploadedBy: session.user.email,
    userName: session.user.name,
    fileUrl: s3Url,
    fileName: file.name,
    submittedAt: new Date()
  })

  return NextResponse.json({ success: true, fileUrl: s3Url })
}

export async function GET(
  req: Request,
  { params }: { params: { courseId: string, assignmentId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const db = await getDb()
  const isAdmin = session.user.role === 'admin'
  const email = session.user.email
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@yourdomain.com' // 替换为你的admin邮箱

  if (isAdmin) {
    // 返回该 assignment 下所有提交
    const allSubmissions = await db.collection('assignment_submissions').find({
      courseId: params.courseId,
      assignmentId: params.assignmentId
    }).toArray()
    return NextResponse.json(allSubmissions)
  } else {
    // 只返回自己
    const submission = await db.collection('assignment_submissions').findOne({
      courseId: params.courseId,
      assignmentId: params.assignmentId,
      userId: session.user.id
    })
    if (!submission) {
      return NextResponse.json({ fileUrl: null })
    }
    return NextResponse.json({
      fileUrl: submission.fileUrl,
      fileName: submission.fileName,
      submittedAt: submission.submittedAt
    })
  }
}
