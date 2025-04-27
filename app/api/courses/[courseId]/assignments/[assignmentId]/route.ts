import { NextResponse } from 'next/server'
import { getDb } from '../../../../../lib/mongodb'
import { ObjectId } from 'mongodb'

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