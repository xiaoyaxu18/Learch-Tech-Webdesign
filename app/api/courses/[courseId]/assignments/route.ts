import { NextResponse } from 'next/server'
import { getDb } from '../../../../lib/mongodb'
import { ObjectId } from 'mongodb'

// GET: 获取当前课程(courseId)下的所有assignments
export async function GET(req: Request, { params }: { params: { courseId: string } }) {
  const db = await getDb()
  const assignments = await db.collection('assignments')
    .find({ courseId: params.courseId })
    .toArray()

  return NextResponse.json(assignments)
}

// POST: 新建一个assignment
export async function POST(req: Request, { params }: { params: { courseId: string } }) {
  const db = await getDb()
  const body = await req.json()

  // 防止body里缺字段，做简单校验
  if (!body.title || !body.dueDate || !body.points) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const newAssignment = {
    courseId: params.courseId,    // 路径参数带的courseId
    title: body.title,             // 前端传来的标题
    dueDate: body.dueDate,         // 前端传来的截止日期
    points: body.points,           // 前端传来的分数
    submitted: false,              // 默认还没交
    createdAt: new Date(),         // 自动加上创建时间
  }

  const result = await db.collection('assignments').insertOne(newAssignment)

  return NextResponse.json({ 
    insertedId: result.insertedId,
    message: 'Assignment created successfully'
  }, { status: 201 })
}