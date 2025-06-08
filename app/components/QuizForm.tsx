'use client';
import { useState } from 'react'
import { useParams } from 'next/navigation';

interface Question {
  _id: string
  prompt: string
  options: string[]
  type: 'single' | 'multiple'
}

interface Quiz {
  _id: string
  title: string
  description?: string
}

interface QuizFormProps {
  quiz: Quiz
  quizId: string
  courseId: string
  questions: Question[]
}

export default function QuizForm({ quiz, quizId, courseId, questions }: QuizFormProps) {
  const [answers, setAnswers] = useState<{ [key: string]: number | number[] }>({})

  const handleChange = (questionId: string, value: number | number[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      console.log('courseId:', courseId, 'quizId:', quizId);
      const res = await fetch(`/api/courses/${courseId}/quizzes/${quizId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quizId, answers: Object.fromEntries(Object.entries(answers)) }),
      })

      if (!res.ok) {
        const errText = await res.text();
        console.error('Server returned an error response with status:', res.status);
        console.error('Raw response text:', errText);
        alert('Submission failed. Please try again.');
        return;
      }

      let result;
      try {
        result = await res.json();
      } catch (jsonError) {
        console.error('Failed to parse JSON:', jsonError);
        alert('Submission failed due to a server error.');
        return;
      }
      console.log('Grading result:', result);
      alert(`Score: ${result.score} / ${result.total} (${result.percentage}%)`);
      result.results.forEach((r: any, idx: number) => {
        console.log(`Q${idx + 1}: ${r.correct ? '✅ Correct' : '❌ Incorrect'} - Your answer: ${r.userAnswer}`);
      });
    } catch (error) {
      console.error('Error submitting answers:', error)
      alert('Submission failed. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {Array.isArray(questions) && questions.map((q, idx) => (
        <div key={q._id} className="p-4 border rounded bg-slate-800 text-white">
          <p className="mb-2 font-semibold">{idx + 1}. {q.prompt}</p>
          <div className="space-y-1">
            {q.options.map((opt, i) => (
              <label key={`${q._id}-${i}`} htmlFor={`question-${q._id}-option-${i}`} className="block">
                <input
                  id={`question-${q._id}-option-${i}`}
                  type={q.type === 'multiple' ? 'checkbox' : 'radio'}
                  name={`question-${q._id}`}
                  value={i}
                  checked={
                    q.type === 'multiple'
                      ? Array.isArray(answers[q._id]) && (answers[q._id] as number[]).includes(i)
                      : answers[q._id] === i
                  }
                  onChange={(e) => {
                    if (q.type === 'multiple') {
                      const prev = Array.isArray(answers[q._id]) ? (answers[q._id] as number[]) : []
                      const next = e.target.checked
                        ? [...prev, i]
                        : prev.filter(item => item !== i)
                      handleChange(q._id, next)
                    } else {
                      handleChange(q._id, i)
                    }
                  }}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Submit Answers
      </button>
    </form>
  )
}