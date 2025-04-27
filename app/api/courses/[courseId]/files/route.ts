import { NextResponse } from 'next/server'
import { uploadToS3 } from '../../../../lib/s3-utils'
import { getDb } from '../../../../lib/mongodb'

export async function POST(req: Request, { params }: { params: { courseId: string } }) {
  const data = await req.formData()
  const file = data.get('file') as unknown as File
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  const buffer = Buffer.from(await file.arrayBuffer())
  const key = `${params.courseId}/${file.name}`

  const url = await uploadToS3(buffer, key, file.type)

  const db = await getDb()
  await db.collection('files').insertOne({
    courseId: params.courseId,
    fileName: file.name,
    url,
    uploadedAt: new Date(),
  })

  return NextResponse.json({ url })
}

export async function GET(req: Request, { params }: { params: { courseId: string } }) {
  const db = await getDb()
  const files = await db.collection('files')
    .find({ courseId: params.courseId })
    .sort({ uploadedAt: -1 })
    .toArray()

  return NextResponse.json(files)
}