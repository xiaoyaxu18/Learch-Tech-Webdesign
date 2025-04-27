'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { ExamList } from '@/app/components/courses/ExamList'

const mockExams = [
  {
    id: 'midterm',
    title: 'Midterm Exam',
    availableUntil: '2024-03-17T17:53:00',
    dueDate: '2024-03-17T20:00:00',
    points: 100,
    questionCount: 30,
    duration: 120,
    isAvailable: true
  },
  {
    id: 'final',
    title: 'Final Exam',
    availableUntil: '2024-03-17T17:53:00',
    dueDate: '2024-03-17T20:00:00',
    points: 350,
    questionCount: 70,
    duration: 180,
    isAvailable: false
  }
]

export default function ExamsPage() {
  const params = useParams()
  const courseId = params.courseId as string
  const [exams, setExams] = useState(mockExams)

  useEffect(() => {
    // TODO: 从API获取考试列表
    // fetch(`/api/courses/${courseId}/exams`)
    //   .then(res => res.json())
    //   .then(data => setExams(data))
  }, [courseId])

  return (
    <div className="space-y-6">
      <ExamList 
        exams={exams}
        courseId={courseId}
      />
    </div>
  )
} 