'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { QuizList } from '@/app/components/courses/QuizList'

const mockQuizzes = [
  {
    id: 'm1',
    title: 'M1: Quiz',
    availableUntil: '2024-03-23T23:59:00',
    dueDate: '2024-01-14T23:59:00',
    points: 20,
    questionCount: 10,
    isAvailable: true
  },
  {
    id: 'm2',
    title: 'M2: Quiz',
    availableUntil: '2024-03-23T23:59:00',
    dueDate: '2024-01-23T23:59:00',
    points: 20,
    questionCount: 10,
    isAvailable: true
  },
  {
    id: 'm3',
    title: 'M3: Quiz',
    availableUntil: '2024-03-23T23:59:00',
    dueDate: '2024-01-31T23:59:00',
    points: 20,
    questionCount: 10,
    isAvailable: true
  },
  {
    id: 'm10',
    title: 'M10: Final Exam',
    availableUntil: '2024-03-17T17:53:00',
    dueDate: '2024-03-17T20:00:00',
    points: 350,
    questionCount: 70,
    isAvailable: false
  }
]

export default function QuizzesPage() {
  const params = useParams()
  const courseId = params.courseId as string
  const [quizzes, setQuizzes] = useState(mockQuizzes)

  useEffect(() => {
    // TODO: 从API获取测验列表
    // fetch(`/api/courses/${courseId}/quizzes`)
    //   .then(res => res.json())
    //   .then(data => setQuizzes(data))
  }, [courseId])

  return (
    <div className="space-y-6">
      <QuizList 
        quizzes={quizzes}
        courseId={courseId}
      />
    </div>
  )
} 