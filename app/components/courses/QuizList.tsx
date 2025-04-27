'use client'

import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { useAuth } from '@/app/contexts/AuthContext'
import { Send, Calendar, Clock, HelpCircle } from 'lucide-react'
import Link from 'next/link'

interface Quiz {
  id: string
  title: string
  availableUntil: string
  dueDate: string
  points: number
  questionCount: number
  isAvailable: boolean
}

interface QuizListProps {
  quizzes: Quiz[]
  courseId: string
}

export function QuizList({ quizzes, courseId }: QuizListProps) {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)

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
        <h2 className="text-2xl font-semibold text-white">Quizzes</h2>
        {isAdmin && (
          <Button className="bg-[#2493DF]">
            Create Quiz
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className={`bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors
              ${selectedQuiz?.id === quiz.id ? 'ring-2 ring-[#2493DF]' : ''}`}
            onClick={() => setSelectedQuiz(quiz)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-white">{quiz.title}</h3>
                <div className="mt-2 space-y-1 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Available until {formatDate(quiz.availableUntil)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Due {formatDate(quiz.dueDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    <span>{quiz.points} pts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    <span>{quiz.questionCount} Questions</span>
                  </div>
                </div>
              </div>
              <Link href={`/courses/${courseId}/quizzes/${quiz.id}`}>
                <Button
                  variant="outline"
                  className={!quiz.isAvailable ? 'text-gray-500' : ''}
                  disabled={!quiz.isAvailable}
                >
                  {quiz.isAvailable ? 'Start' : 'Not Available'}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 