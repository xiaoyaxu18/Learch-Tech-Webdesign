
import { NextResponse } from 'next/server'
import { getDb } from '../../../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(req: Request, { params }: { params: { courseId: string, quizId: string } }) {
  const db = await getDb()
  const quiz = await db.collection('quizzes').findOne({
    _id: new ObjectId(params.quizId),
    courseId: params.courseId
  })

  if (!quiz) {
    return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })
  }

  return NextResponse.json(quiz)
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string, quizId: string } }
) {
  const db = await getDb()
  const body = await req.json()
  const { title, description, dueDate, duration, points, submissionType } = body

  const result = await db.collection('quizzes').updateOne(
    {
      _id: new ObjectId(params.quizId),
      courseId: params.courseId,
    },
    {
      $set: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        duration,
        points,
        submissionType,
        updatedAt: new Date(),
      },
    }
  )

  if (result.modifiedCount === 0) {
    return NextResponse.json({ error: 'Update failed or no changes made' }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}