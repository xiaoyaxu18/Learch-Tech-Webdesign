import { NextResponse } from 'next/server'
import { getDb } from '../../../../lib/mongodb'
import { ObjectId } from 'mongodb'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request, { params }: { params: { courseId: string } }) {
  const db = await getDb()
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const userId = session.user.id;
  const userRole = session.user.role; // 假设你的 session 里有 role 字段

  let grades;
  if (userRole === 'admin') {
    // 管理员：查该课程下所有用户的成绩，并聚合用户信息
    grades = await db.collection('grades').aggregate([
      { $match: { courseId: params.courseId } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          quizId: 1,
          score: 1,
          total: 1,
          percent: 1,
          updatedAt: 1,
          userId: {
            name: '$user.name',
            email: '$user.email',
            _id: '$user._id'
          }
        }
      }
    ]).toArray();
  } else {
    // 普通用户：只查自己的成绩
    grades = await db.collection('grades').find({
      userId: new ObjectId(userId),
      courseId: params.courseId,
    }).toArray();
  }
  return NextResponse.json(grades)
}

export async function POST(req: Request, { params }: { params: { courseId: string } }) {
  const db = await getDb()
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const userId = session.user.id;
  const { quizId, score, total, percent } = await req.json();

  try {
    await db.collection('grades').insertOne({
      userId: new ObjectId(userId),
      quizId: new ObjectId(quizId),
      courseId: params.courseId,
      score,
      total,
      percent,
      updatedAt: new Date(),
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err.code === 11000) {
      // 唯一索引冲突
      return NextResponse.json({ error: "You have already completed this quiz." }, { status: 409 });
    }
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
