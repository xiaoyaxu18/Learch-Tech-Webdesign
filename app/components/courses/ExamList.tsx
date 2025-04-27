'use client'

import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { useAuth } from '@/app/contexts/AuthContext'
import { Calendar, Clock, Award, HelpCircle, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

interface Exam {
  id: string
  title: string
  availableUntil: string
  dueDate: string
  points: number
  questionCount: number
  duration: number
  isAvailable: boolean
}

interface ExamListProps {
  exams: Exam[]
  courseId: string
}

export function ExamList({ exams, courseId }: ExamListProps) {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Exams</h2>
        {isAdmin && (
          <Button className="bg-[#2493DF]">
            Create Exam
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className={`bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors
              ${selectedExam?.id === exam.id ? 'ring-2 ring-[#2493DF]' : ''}`}
            onClick={() => setSelectedExam(exam)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-white">{exam.title}</h3>
                <div className="mt-2 space-y-1 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Available until {formatDate(exam.availableUntil)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Due {formatDate(exam.dueDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>{exam.points} pts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    <span>{exam.questionCount} Questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Duration: {exam.duration} minutes</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                {!exam.isAvailable && (
                  <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Not yet available</span>
                  </div>
                )}
                <Link href={`/courses/${courseId}/exams/${exam.id}`}>
                  <Button
                    variant="outline"
                    className={!exam.isAvailable ? 'text-gray-500' : ''}
                    disabled={!exam.isAvailable}
                  >
                    {exam.isAvailable ? 'Start Exam' : 'Locked'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 