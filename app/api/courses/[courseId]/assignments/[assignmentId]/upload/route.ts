import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'
import { getDb } from '../../../../../../lib/mongodb'
import { ObjectId } from 'mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function POST(req: Request, { params }: { params: { courseId: string, assignmentId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
  }

  const formData = await req.formData()
  const files = formData.getAll('file') as File[]

  if (files.length === 0) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  })

  const urls: string[] = []

  for (const file of files) {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const fileKey = `assignments/${randomUUID()}-${file.name}`

    try {
      await s3.send(new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: fileKey,
        Body: buffer,
        ContentType: file.type,
        ContentDisposition: 'attachment',
      }))

      const fileUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`
      urls.push(fileUrl)
    } catch (err) {
      console.error('S3 Upload Error:', err)
      return NextResponse.json({ error: 'S3 upload failed', details: `${err}` }, { status: 500 })
    }
  }

  const db = await getDb()
  const result = await db.collection('assignments').updateOne(
    {
      _id: new ObjectId(params.assignmentId),
      courseId: params.courseId,
    },
    {
      $push: {
        attachmentUrls: { $each: urls }
      }
    }
  )

  return NextResponse.json({ urls, modifiedCount: result.modifiedCount })
}

export async function DELETE(req: Request, { params }: { params: { courseId: string, assignmentId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
  }

  const { url } = await req.json()

  const db = await getDb()
  const assignment = await db.collection('assignments').findOne({
    _id: new ObjectId(params.assignmentId),
    courseId: params.courseId,
  })

  if (!assignment || !assignment.attachmentUrls?.includes(url)) {
    return NextResponse.json({ error: 'Attachment not found' }, { status: 404 })
  }

  const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  })

  const key = url.split('.amazonaws.com/')[1]

  try {
    await s3.send(new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
    }))
  } catch (err) {
    console.error('S3 Delete Error:', err)
    return NextResponse.json({ error: 'Failed to delete file from S3', details: `${err}` }, { status: 500 })
  }

  await db.collection('assignments').updateOne(
    {
      _id: new ObjectId(params.assignmentId),
      courseId: params.courseId,
    },
    {
      $pull: { attachmentUrls: url }
    }
  )

  const updated = await db.collection('assignments').findOne({
    _id: new ObjectId(params.assignmentId),
    courseId: params.courseId,
  })

  return NextResponse.json({ attachmentUrls: updated?.attachmentUrls || [] })
}