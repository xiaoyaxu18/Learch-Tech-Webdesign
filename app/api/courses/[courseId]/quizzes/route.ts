
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'
import { getDb } from '../../../../lib/mongodb'

export async function POST(req: Request, { params }: { params: { courseId: string } }) {
  const body = await req.json()
  const { title, description, questions = [] } = body

  if (!title) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const db = await getDb()
  const result = await db.collection('quizzes').insertOne({
    courseId: params.courseId,
    title,
    description,
    questions,
    createdAt: new Date(),
  })

  return NextResponse.json({ insertedId: result.insertedId })
}


export async function GET(req: Request, { params }: { params: { courseId: string } }) {
  const db = await getDb()
  const quizzes = await db
    .collection('quizzes')
    .find({ courseId: params.courseId })
    .sort({ createdAt: -1 })
    .toArray()

  return NextResponse.json(quizzes)
}