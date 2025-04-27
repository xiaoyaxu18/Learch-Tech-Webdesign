"use client"

import { use } from 'react'
import { courses } from '@/app/data/courses'
import { FileText, CheckCircle } from 'lucide-react'

interface GradeItem {
  name: string
  category: string
  dueDate: string
  submittedDate?: string
  score: number
  totalPoints: number
  status: 'submitted' | 'pending' | 'late'
}

export default function GradesPage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = use(params)
  const course = courses.find(c => c.id === parseInt(resolvedParams.courseId))
  
  if (!course) return null

  // 模拟成绩数据
  const grades: GradeItem[] = [
    {
      name: 'Quiz 1',
      category: 'Assignments',
      dueDate: 'Jan 15 by 8am',
      submittedDate: 'Jan 12 at 8:26pm',
      score: 3,
      totalPoints: 3,
      status: 'submitted'
    },
    {
      name: 'Quiz 2',
      category: 'Assignments',
      dueDate: 'Jan 16 by 9:10pm',
      submittedDate: 'Jan 16 at 9:10pm',
      score: 4,
      totalPoints: 4,
      status: 'submitted'
    },
    {
      name: 'Workshop 1',
      category: 'Assignments',
      dueDate: 'Jan 22 by 9pm',
      score: 5,
      totalPoints: 5,
      status: 'submitted'
    },
    {
      name: 'Debate 1',
      category: 'Assignments',
      dueDate: 'Jan 29 by 9:10pm',
      submittedDate: 'Jan 29 at 8:59pm',
      score: 4,
      totalPoints: 4,
      status: 'submitted'
    },
    {
      name: 'Workshop 2',
      category: 'Assignments',
      dueDate: 'Feb 5 by 9:10pm',
      submittedDate: 'Feb 5 at 9:10pm',
      score: 4,
      totalPoints: 4,
      status: 'submitted'
    },
    {
      name: 'First paper - Assignment 1',
      category: 'Assignments',
      dueDate: 'Feb 7 by 11:59pm',
      submittedDate: 'Feb 7 at 9:36pm',
      score: 23,
      totalPoints: 25,
      status: 'submitted'
    }
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white">Grades</h2>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Due</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Submitted</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Score</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {grades.map((grade, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white/5' : ''}>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-[#2493DF] font-medium">{grade.name}</div>
                    <div className="text-sm text-gray-400">{grade.category}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {grade.dueDate}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {grade.submittedDate || '-'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm text-gray-300">Complete</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="text-white">{grade.score} / {grade.totalPoints}</span>
                    <div className="w-2 h-2 rounded-full bg-[#2493DF] ml-3"></div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="text-gray-400 hover:text-white">
                    <FileText className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 