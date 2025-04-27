'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/app/components/ui/button'
import { Calendar, Clock, Send, HelpCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function QuizPage() {
  const params = useParams()
  const courseId = params.courseId as string
  const quizId = params.quizId as string

  const [quiz] = useState({
    title: 'M1: Quiz',
    availableUntil: '2024-03-23T23:59:00',
    dueDate: '2024-01-14T23:59:00',
    points: 20,
    questionCount: 10
  })

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
      <div className="flex items-center gap-4">
        <Link 
          href={`/courses/${courseId}/quizzes`}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-semibold text-white">{quiz.title}</h1>
      </div>

      <div className="bg-white/5 rounded-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>Available until {formatDate(quiz.availableUntil)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Due {formatDate(quiz.dueDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Send className="w-4 h-4" />
              <span>{quiz.points} points</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <HelpCircle className="w-4 h-4" />
              <span>{quiz.questionCount} Questions</span>
            </div>
          </div>
          <Button className="bg-[#2493DF]">
            Begin Quiz
          </Button>
        </div>

        <div className="prose prose-invert">
          <h2>Instructions</h2>
          <ul>
            <li>This is a timed quiz</li>
            <li>You have one attempt to complete the quiz</li>
            <li>All questions must be answered</li>
            <li>You cannot go back to previous questions</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 