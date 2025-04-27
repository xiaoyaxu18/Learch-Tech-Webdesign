'use client'

import { useEffect, useState } from 'react'
import { AssignmentList } from '@/app/components/courses/AssignmentList'

export default function AssignmentsPage({ params }: { params: { courseId: string } }) {
  const [assignments, setAssignments] = useState<any[]>([])

  useEffect(() => {
    async function fetchAssignments() {
      const res = await fetch(`/api/courses/${params.courseId}/assignments`)
      const data = await res.json()
      setAssignments(data)
    }
    fetchAssignments()
  }, [params.courseId])

  async function handleCreateAssignment() {
    const newAssignment = {
      title: `HW${assignments.length + 1}`,
      dueDate: new Date().toISOString(),
      points: 20,
    }

    await fetch(`/api/courses/${params.courseId}/assignments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAssignment),
    })

    // 创建成功后，刷新作业列表
    const res = await fetch(`/api/courses/${params.courseId}/assignments`)
    const data = await res.json()
    setAssignments(data)
  }

  async function handleDeleteAssignment(assignmentId: string) {
    await fetch(`/api/courses/${params.courseId}/assignments/${assignmentId}`, {
      method: 'DELETE',
    })

    // 删除成功后刷新作业列表
    const res = await fetch(`/api/courses/${params.courseId}/assignments`)
    const data = await res.json()
    setAssignments(data)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleCreateAssignment}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Assignment
        </button>
      </div>

      <AssignmentList 
        assignments={assignments}
        courseId={params.courseId}
        onDeleteAssignment={handleDeleteAssignment}
      />
    </div>
  )
}