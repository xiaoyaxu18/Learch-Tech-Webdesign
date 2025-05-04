'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

type Quiz = {
  _id: string
  title: string
  description?: string
  points?: number
  questions?: any[]
}

export default function QuizzesPage() {
  const { courseId } = useParams()
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await fetch(`/api/courses/${courseId}/quizzes`)
      if (res.ok) {
        const data = await res.json()
        setQuizzes(data)
      }
      setLoading(false)
    }
    fetchQuizzes()
  }, [courseId])

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div className="p-6 space-y-6 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Quizzes</h1>
        <Link
          href={`/courses/${courseId}/quizzes/create`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Quiz
        </Link>
      </div>
      {quizzes.length === 0 ? (
        <p>No quizzes yet.</p>
      ) : (
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <Link
              key={quiz._id}
              href={`/courses/${courseId}/quizzes/${quiz._id}`}
              className="block border border-gray-700 rounded p-4 hover:bg-gray-800"
            >
              <h2 className="text-lg font-bold">{quiz.title}</h2>
              <p className="text-sm text-gray-300">{quiz.description}</p>
              <Link
                href={`/courses/${courseId}/quizzes/${quiz._id}/edit`}
                className="mt-2 inline-block text-blue-400 hover:underline text-sm"
              >
                Edit Quiz
              </Link>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}