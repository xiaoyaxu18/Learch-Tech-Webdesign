'use client'

import { useState } from 'react'
import { Calendar, Clock } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { useAuth } from '@/app/contexts/AuthContext'

interface Assignment {
  _id: string
  title: string
  description: string
  dueDate: string
  points: number
  submitted?: boolean
  createdAt?: string
}

interface AssignmentListProps {
  assignments: Assignment[]
  courseId: string
  onDeleteAssignment: (assignmentId: string) => Promise<void>
}

export function AssignmentList({ assignments, courseId, onDeleteAssignment }: AssignmentListProps) {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)

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
        <h2 className="text-2xl font-semibold text-white">Assignments</h2>
      </div>

      <div className="grid gap-4">
        {assignments.map((assignment) => (
          <div
            key={assignment._id}
            className={`bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors 
            ${selectedAssignment?._id === assignment._id ? 'ring-2 ring-[#2493DF]' : ''}`}
            onClick={() => {
              window.location.href = `/courses/${courseId}/assignments/${assignment._id}`
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-white">{assignment.title}</h3>
                <div className="mt-2 space-y-1 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Due {formatDate(assignment.dueDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{assignment.points} points</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  className={assignment.submitted ? 'text-green-500' : ''}
                  onClick={(e) => {
                    e.stopPropagation()
                    window.location.href = `/courses/${courseId}/assignments/${assignment._id}`
                  }}
                >
                  {assignment.submitted ? 'Submitted' : 'Start'}
                </Button>

                {isAdmin && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteAssignment(assignment._id)
                    }}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}