import { NextResponse } from 'next/server'
import { getDb } from '../../../../../lib/mongodb'
import { ObjectId } from 'mongodb'
import { writeFile } from 'fs/promises'
import path from 'path'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'

export async function GET(req: Request, { params }: { params: { courseId: string, assignmentId: string } }) {
  const db = await getDb()

  const assignment = await db.collection('assignments').findOne({
    _id: new ObjectId(params.assignmentId),
    courseId: params.courseId,
  })

  if (!assignment) {
    return NextResponse.json({ error: 'Assignment not found' }, { status: 404 })
  }

  return NextResponse.json(assignment)
}

export async function PATCH(req: Request, { params }: { params: { courseId: string, assignmentId: string } }) {
  const db = await getDb()
  const body = await req.json()

  const result = await db.collection('assignments').updateOne(
    {
      _id: new ObjectId(params.assignmentId),
      courseId: params.courseId,
    },
    {
      $set: {
        title: body.title,
        description: body.description,
        dueDate: body.dueDate,
        points: body.points,
      }
    }
  )

  return NextResponse.json({ modifiedCount: result.modifiedCount })
}

export async function DELETE(req: Request, { params }: { params: { courseId: string, assignmentId: string } }) {
  const db = await getDb()

  const result = await db.collection('assignments').deleteOne({
    _id: new ObjectId(params.assignmentId),
    courseId: params.courseId,
  })

  return NextResponse.json({ deletedCount: result.deletedCount })
}

export async function POST(req: Request, { params }: { params: { courseId: string, assignmentId: string } }) {
  const formData = await req.formData()
  const file = formData.get('file') as File
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  })

  const fileKey = `assignments/${randomUUID()}-${file.name}`

  try {
    await s3.send(new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: fileKey,
      Body: buffer,
      ContentType: file.type,
    }))
  } catch (err) {
    console.error('S3 Upload Error:', err)
    return NextResponse.json({ error: 'S3 upload failed', details: `${err}` }, { status: 500 })
  }

  const fileUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`

  const db = await getDb()
  const result = await db.collection('assignments').updateOne(
    {
      _id: new ObjectId(params.assignmentId),
      courseId: params.courseId,
    },
    {
      $set: {
        attachmentUrl: fileUrl
      }
    }
  )

  return NextResponse.json({ url: fileUrl, modifiedCount: result.modifiedCount })
}