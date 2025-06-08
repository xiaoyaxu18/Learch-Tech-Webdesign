import { NextResponse } from 'next/server'
import { getDb } from '../../../../../../lib/mongodb'
import { ObjectId } from 'mongodb'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(
  req: Request,
  context: { params: Promise<{ courseId: string, quizId: string }> }
) {
  const { courseId, quizId } = await context.params;
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const userId = session.user.id;

  try {
    const db = await getDb()
    const body = await req.json()
    const { answers } = body

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json({ error: 'Missing or invalid answers' }, { status: 400 })
    }
    if (!ObjectId.isValid(userId)) {
      return NextResponse.json({ error: 'Invalid userId' }, { status: 400 })
    }
    if (!ObjectId.isValid(courseId) || !ObjectId.isValid(quizId)) {
      return NextResponse.json({ error: 'Invalid courseId or quizId' }, { status: 400 })
    }

    const quiz = await db.collection('quizzes').findOne({
      _id: new ObjectId(quizId),
      courseId: courseId
    })

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })
    }

    let score = 0
    let total = 0
    for (const q of quiz.questions) {
      total++
      const qid = q._id?.toString() || q.id
      const userAnswer = answers[qid]
      console.log(
        `判分: 题目ID=${qid}, 正确答案=${q.correctIndex}(${typeof q.correctIndex}), 用户答案=${userAnswer}(${typeof userAnswer}), 是否正确=${Number(userAnswer) === Number(q.correctIndex)}`
      )
      if (userAnswer !== undefined && Number(userAnswer) === Number(q.correctIndex)) {
        score++
      }
    }

    console.log('userId:', userId)
    console.log('courseId:', courseId)
    console.log('quizId:', quizId)
    console.log('answers:', answers)

    await db.collection('quiz_submissions').insertOne({
      courseId: courseId,
      quizId: new ObjectId(quizId),
      userId: new ObjectId(userId),
      answers,
      score,
      submittedAt: new Date()
    })

    await db.collection('grades').insertOne({
      userId: new ObjectId(userId),
      courseId: courseId,
      quizId: new ObjectId(quizId),
      score,
      total,
      percent: total ? ((score / total) * 100).toFixed(0) : 0,
      updatedAt: new Date(),
    });

    const percent = total ? ((score / total) * 100).toFixed(0) : 0
    return NextResponse.json({ score, total, percent })
  } catch (err: any) {
    if (err.code === 11000) {
      return NextResponse.json({ error: "You have already completed this quiz." }, { status: 409 });
    }
    console.error('Quiz submit error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
