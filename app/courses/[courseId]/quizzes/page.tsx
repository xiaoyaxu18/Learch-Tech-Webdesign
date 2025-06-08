"use client"

import { useSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

type Quiz = {
  _id: string
  title: string
  description?: string
  points?: number
  questions?: any[]
}

export default function QuizzesPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const { data: session, status } = useSession()
  const [quizzes, setQuizzes] = useState<Quiz[]>([])

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch(`/api/courses/${courseId}/quizzes`)
        if (res.ok) {
          setQuizzes(await res.json())
        } else {
          console.error('Failed to fetch quizzes:', res.statusText)
        }
      } catch (err) {
        console.error('Error:', err)
      }
    }
    fetchQuizzes()
  }, [courseId])

  if (status === 'loading') return <p className="text-white p-6">Loading...</p>
  if (!session) return <p className="text-red-500 p-6">Failed to retrieve session. Please log in again.</p>

  const isAdmin = session?.user?.role === 'admin'

  return (
    <div className="p-6 space-y-6 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Quizzes</h1>
        {isAdmin && (
          <Link
            href={`/courses/${courseId}/quizzes/create`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create Quiz
          </Link>
        )}
      </div>

      {quizzes.length === 0 ? (
        <p>No quizzes yet.</p>
      ) : (
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="border border-gray-700 rounded p-4 hover:bg-gray-800">
              <Link
                href={`/courses/${courseId}/quizzes/${quiz._id}`}
                className="block"
              >
                <h2 className="text-lg font-bold">{quiz.title}</h2>
                <p className="text-sm text-gray-300">{quiz.description}</p>
              </Link>
              {isAdmin && (
                <div className="mt-2 flex justify-between items-center">
                  <Link
                    href={`/courses/${courseId}/quizzes/${quiz._id}/edit`}
                    className="text-blue-400 hover:underline text-sm"
                  >
                    Edit Quiz
                  </Link>
                  <button
                    onClick={async (e) => {
                      e.preventDefault()
                      if (confirm('Are you sure you want to delete this quiz?')) {
                        const res = await fetch(`/api/courses/${courseId}/quizzes/${quiz._id}`, {
                          method: 'DELETE',
                        })
                        if (res.ok) {
                          setQuizzes((prev) => prev.filter((q) => q._id !== quiz._id))
                        } else {
                          console.error('Failed to delete quiz:', await res.text())
                        }
                      }
                    }}
                    className="text-red-400 hover:underline text-sm"
                  >
                    Delete Quiz
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}