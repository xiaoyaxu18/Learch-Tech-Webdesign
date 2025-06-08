import { NextResponse } from 'next/server'
import { getDb } from '../../../../../lib/mongodb'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request, { params }: { params: { courseId: string } }) {
  const db = await getDb()
  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.role !== 'admin') {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }
  const grades = await db.collection('grades').aggregate([
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
        userName: '$user.name',
        userEmail: '$user.email'
      }
    }
  ]).toArray();

  // 生成 CSV
  const header = 'User Name,User Email,Quiz ID,Score,Total,Percent,Updated At\n';
  const rows = grades.map(g =>
    `"${g.userName}","${g.userEmail}","${g.quizId}",${g.score},${g.total},${g.percent},"${g.updatedAt.toISOString()}"`
  );
  const csv = header + rows.join('\n');

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="grades-${params.courseId}.csv"`
    }
  });
}
