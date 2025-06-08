import { NextResponse } from 'next/server'
import { uploadToS3 } from '../../../../lib/s3-utils'
import { getDb } from '../../../../lib/mongodb'
import { getCurrentUser } from '../../../../lib/auth'

export async function POST(req: Request, { params }: { params: { courseId: string } }) {
  const data = await req.formData()
  const file = data.get('file') as unknown as File
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  const buffer = Buffer.from(await file.arrayBuffer())
  const key = `${params.courseId}/${file.name}`

  const url = await uploadToS3(buffer, key, file.type)

  const db = await getDb()
  const user = await getCurrentUser()
  const uploadedBy = user?.email || 'unknown'
  await db.collection('files').insertOne({
    courseId: params.courseId,
    fileName: file.name,
    url,
    uploadedAt: new Date(),
    uploadedBy,
  })

  return NextResponse.json({ url })
}

export async function GET(req: Request, { params }: { params: { courseId: string } }) {
  const db = await getDb()
  const user = await getCurrentUser()
  const isAdmin = user?.role === 'admin'
  const email = user?.email

  // 假设只有一个 admin，admin 的 email 就是 user.role === 'admin' 的 email
  // 如果有多个 admin，可以维护一个 adminEmailList
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@yourdomain.com'; // 请替换为你的 admin 邮箱

  const allFiles = await db.collection('files')
    .find({ courseId: params.courseId })
    .sort({ uploadedAt: -1 })
    .toArray()

  let files
  if (isAdmin) {
    files = allFiles
  } else {
    files = allFiles.filter((f: any) => f.uploadedBy === ADMIN_EMAIL || f.uploadedBy === email)
  }

  return NextResponse.json(files)
}