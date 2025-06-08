'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import QuizForm from '@/app/components/QuizForm'

interface Question {
  _id: string;
  prompt: string;
  options: string[];
  type: 'single' | 'multiple';
}

interface Quiz {
  _id: string;
  title: string;
  questions: Question[];
}

export default function TakeQuizPage() {
  const params = useParams()
  console.log('params:', params)
  const courseId = params.courseId as string
  const quizId = params.quizId as string
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [result, setResult] = useState<{ score: number, total: number } | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!courseId || !quizId) return;
    async function fetchQuiz() {
      const res = await fetch(`/api/courses/${courseId}/quizzes/${quizId}`)
      const data = await res.json()
      setQuiz({
        ...data,
        _id: data._id || quizId,
        questions: (data.questions || []).map((q: any) => ({
          ...q,
          type: q.type || 'single',
        }))
      })
    }
    fetchQuiz()
  }, [courseId, quizId])

  if (!quiz) return <div>Loading...</div>

  function handleSelect(questionId: string, optionIdx: number) {
    setAnswers({ ...answers, [questionId]: optionIdx })
  }

  async function handleSubmit() {
    setSubmitting(true)
    console.log('提交测验:', { courseId, quizId, answers });
    const res = await fetch(`/api/courses/${courseId}/quizzes/${quizId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        answers,
        courseId,
        quizId
      })
    })
    setSubmitting(false)
    const data = await res.json()
    if (!res.ok) {
      alert(data.error || '提交失败，请重试。')
      return
    }
    setResult({ score: data.score, total: data.total })
  }

  return (
    <QuizForm
      quiz={quiz}
      quizId={quizId}
      courseId={courseId}
      questions={quiz.questions}
    />
  )
}
