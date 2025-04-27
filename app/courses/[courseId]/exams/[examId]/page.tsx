'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/app/components/ui/button'
import { Calendar, Clock, Award, HelpCircle, ArrowLeft, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function ExamPage() {
  const params = useParams()
  const courseId = params.courseId as string
  const examId = params.examId as string
  
  const [exam] = useState({
    title: 'Final Exam',
    availableUntil: '2024-03-17T17:53:00',
    dueDate: '2024-03-17T20:00:00',
    points: 350,
    questionCount: 70,
    duration: 180,
    isAvailable: false
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
          href={`/courses/${params.courseId}/exams`}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-semibold text-white">{exam.title}</h1>
      </div>

      <div className="bg-white/5 rounded-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>Available until {formatDate(exam.availableUntil)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Due {formatDate(exam.dueDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Award className="w-4 h-4" />
              <span>{exam.points} points</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <HelpCircle className="w-4 h-4" />
              <span>{exam.questionCount} Questions</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Duration: {exam.duration} minutes</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            {!exam.isAvailable && (
              <div className="flex items-center gap-1 text-yellow-500 text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Not yet available</span>
              </div>
            )}
            <Button 
              className="bg-[#2493DF]"
              disabled={!exam.isAvailable}
            >
              Begin Exam
            </Button>
          </div>
        </div>

        <div className="prose prose-invert">
          <h2>Important Instructions</h2>
          <ul>
            <li>This is a timed exam. Once you begin, the timer cannot be paused.</li>
            <li>You have only one attempt to complete this exam.</li>
            <li>All questions must be answered before submission.</li>
            <li>You cannot return to previous questions once answered.</li>
            <li>Ensure you have a stable internet connection before starting.</li>
            <li>Any form of academic dishonesty will result in a zero grade.</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 