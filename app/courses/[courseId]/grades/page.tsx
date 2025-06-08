"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { FileText, CheckCircle } from 'lucide-react'

interface Grade {
  quizId: string
  score: number
  total: number
  percent: string
  updatedAt: string
  userId?: {
    name?: string
    email?: string
    _id?: string
  } | string
}

interface QuizTitleMap {
  [quizId: string]: string
}

export default function GradesPage() {
  const params = useParams()
  const courseId = params.courseId as string
  const [grades, setGrades] = useState<Grade[]>([])
  const [quizTitles, setQuizTitles] = useState<QuizTitleMap>({})
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGrades() {
      const res = await fetch(`/api/courses/${courseId}/grades`)
      if (res.ok) {
        const data = await res.json()
        setGrades(data)

        // 批量获取 quiz 标题
        const quizIds = data.map((g: Grade) => g.quizId)
        const titles: QuizTitleMap = {}
        await Promise.all(
          quizIds.map(async (id: string) => {
            const res = await fetch(`/api/courses/${courseId}/quizzes/${id}`)
            if (res.ok) {
              const quiz = await res.json()
              titles[id] = quiz.title || id
            } else {
              titles[id] = id
            }
          })
        )
        setQuizTitles(titles)
      }
      setLoading(false)
    }
    fetchGrades()

    // 获取当前用户角色
    async function fetchRole() {
      const res = await fetch('/api/auth/session')
      if (res.ok) {
        const session = await res.json()
        setRole(session?.user?.role ?? null)
      }
    }
    fetchRole()
  }, [courseId])

  if (loading) return <div className="p-4">Loading grades...</div>

  if (!grades.length) return <div className="p-4">No grades yet.</div>

  function groupByUser(grades: Grade[]) {
    const map: { [userId: string]: Grade[] } = {};
    grades.forEach(g => {
      let id = '';
      if (typeof g.userId === 'object' && g.userId && g.userId._id) {
        id = g.userId._id;
      } else if (typeof g.userId === 'string') {
        id = g.userId;
      }
      if (!id) return; // 跳过无效 userId
      if (!map[id]) map[id] = [];
      map[id].push(g);
    });
    return map;
  }

  if (role === 'admin') {
    const grouped = groupByUser(grades);
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2>Grades</h2>
          <button 
            onClick={async () => {
              try {
                const res = await fetch(`/api/courses/${courseId}/grades/export`);
                if (res.ok) {
                  const blob = await res.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `grades-${courseId}.csv`;
                  a.click();
                  window.URL.revokeObjectURL(url);
                } else {
                  alert('Failed to export grades');
                }
              } catch (error) {
                console.error('Export failed:', error);
                alert('Failed to export grades');
              }
            }}
            className="px-4 py-2 bg-[#2493DF] text-white rounded hover:bg-[#1f7bc0] transition-colors"
          >
            Export Grades (CSV)
          </button>
        </div>
        {Object.entries(grouped).map(([userId, userGrades]) => (
          <div key={userId} className="mb-8">
            <div className="font-bold text-lg mb-2">
              {typeof userGrades[0].userId === 'object' && userGrades[0].userId.name
                ? userGrades[0].userId.name
                : '未知用户'}
              {" "}
              ({typeof userGrades[0].userId === 'object' && userGrades[0].userId.email
                ? userGrades[0].userId.email
                : ''})
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Due</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Submitted</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Score</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {userGrades.map((g, index) => (
                  <tr key={g.quizId} className={index % 2 === 0 ? 'bg-white/5' : ''}>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-[#2493DF] font-medium">
                          {quizTitles[g.quizId] || g.quizId}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {new Date(g.updatedAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {g.score} / {g.total}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm text-gray-300">Complete</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-white">{g.percent}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-gray-400 hover:text-white">
                        <FileText className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white">Grades</h2>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Due</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Submitted</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Score</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {grades.map((g, index) => (
              <tr key={g.quizId} className={index % 2 === 0 ? 'bg-white/5' : ''}>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-[#2493DF] font-medium">
                      {quizTitles[g.quizId] || g.quizId}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {new Date(g.updatedAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {g.score} / {g.total}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm text-gray-300">Complete</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="text-white">{g.percent}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="text-gray-400 hover:text-white">
                    <FileText className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 