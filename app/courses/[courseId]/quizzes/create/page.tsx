'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function CreateQuizPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [points, setPoints] = useState(0)

  const router = useRouter()
  const { courseId } = useParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`/api/courses/${courseId}/quizzes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, points }),
    })
    if (res.ok) {
      router.push(`/courses/${courseId}/quizzes`)
    } else {
      alert('Failed to create quiz')
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto text-white">
      <h1 className="text-2xl font-semibold mb-4">Create Quiz</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
          />
        </div>
        <div>
          <label className="block mb-1">Points</label>
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            min={0}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Create
        </button>
      </form>
    </div>
  )
}