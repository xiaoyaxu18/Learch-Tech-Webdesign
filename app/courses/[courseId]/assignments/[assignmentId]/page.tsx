'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/app/components/ui/button'
import { Calendar, Clock, ArrowLeft, Pencil, Save } from 'lucide-react'
import Link from 'next/link'

export default function AssignmentPage({ 
  params 
}: { 
  params: { courseId: string; assignmentId: string } 
}) {
  const [assignment, setAssignment] = useState<{
    title: string;
    description: string;
    dueDate: string;
    points: number;
    attachmentUrls?: string[];
  } | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const [formState, setFormState] = useState({
    title: '',
    description: '',
    dueDate: '',
    points: 0,
  })

  useEffect(() => {
    async function fetchAssignment() {
      const res = await fetch(`/api/courses/${params.courseId}/assignments/${params.assignmentId}`)
      const data = await res.json()
      setAssignment(data)
      setFormState({
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        points: data.points,
      })
    }
    fetchAssignment()
  }, [params.courseId, params.assignmentId])

  if (!assignment) {
    return <div className="text-white">Loading...</div>
  }

  async function handleSave() {
    console.log('handleSave called')

    const res = await fetch(`/api/courses/${params.courseId}/assignments/${params.assignmentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formState),
    })

    if (!res.ok) {
      alert('Failed to save changes.')
      return
    }

    const result = await res.json()

    if (result.modifiedCount === 1) {
      const refreshed = await fetch(`/api/courses/${params.courseId}/assignments/${params.assignmentId}`)
      const data = await refreshed.json()
      setAssignment(data)
      setFormState({
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        points: data.points,
      })
      setIsEditing(false)
      alert('Saved successfully.')
    } else {
      alert('No changes detected.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link 
            href={`/courses/${params.courseId}/assignments`}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          {isEditing ? (
            <input 
              className="text-2xl font-semibold text-white bg-transparent border-b border-gray-400 focus:outline-none"
              value={formState.title}
              onChange={(e) => setFormState({ ...formState, title: e.target.value })}
            />
          ) : (
            <h1 className="text-2xl font-semibold text-white">{assignment.title}</h1>
          )}
        </div>

        <Button size={"icon"} onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? <Save className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
        </Button>
      </div>

      <div className="bg-white/5 rounded-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              {isEditing ? (
                <input 
                  type="datetime-local"
                  className="bg-transparent border-b border-gray-400 focus:outline-none"
                  value={formState.dueDate.slice(0, 16)}
                  onChange={(e) => setFormState({ ...formState, dueDate: e.target.value })}
                />
              ) : (
                <span>Due {new Date(assignment.dueDate).toLocaleString()}</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-4 h-4" />
              {isEditing ? (
                <input 
                  type="number"
                  className="bg-transparent border-b border-gray-400 w-20 focus:outline-none"
                  value={formState.points}
                  onChange={(e) => setFormState({ ...formState, points: Number(e.target.value) })}
                />
              ) : (
                <span>{assignment.points} points</span>
              )}
            </div>
          </div>
          {!isEditing && (
            <Button className="bg-[#2493DF]">
              Submit Assignment
            </Button>
          )}
        </div>

        <div className="prose prose-invert">
          <h2>Description</h2>
          {isEditing ? (
            <textarea
              className="w-full bg-transparent border-b border-gray-400 focus:outline-none"
              value={formState.description}
              onChange={(e) => setFormState({ ...formState, description: e.target.value })}
            />
          ) : (
            <p>{assignment.description}</p>
          )}
        </div>

        {isEditing && (
          <div className="flex justify-end mt-4">
            <Button className="bg-green-600" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-white mb-2">Assignment Requirement Document</h2>

        {assignment.attachmentUrls && assignment.attachmentUrls.length > 0 ? (
          <>
            {assignment.attachmentUrls.map((url, index) => (
              <div key={index} className="mb-2">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  View Uploaded Document {index + 1}
                </a>
                {/* Download and Delete buttons */}
                <div className="flex items-center gap-4 mt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const link = document.createElement('a')
                      link.href = url
                      link.download = url.split('/').pop() || `document-${index + 1}.pdf`
                      document.body.appendChild(link)
                      link.click()
                      document.body.removeChild(link)
                    }}
                  >
                    Download
                  </Button>
                  {isEditing && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={async () => {
                        const confirmed = confirm('Are you sure you want to delete this document?')
                        if (!confirmed) return

                        const res = await fetch(`/api/courses/${params.courseId}/assignments/${params.assignmentId}/upload`, {
                          method: 'DELETE',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ url }),
                        })

                        if (res.ok) {
                          const result = await res.json()
                          setAssignment({
                            ...assignment,
                            attachmentUrls: result.attachmentUrls
                          })
                          alert('Document deleted.')
                        } else {
                          alert('Failed to delete document.')
                        }
                      }}
                    >
                      Delete Document
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="text-gray-400">No document uploaded yet.</p>
        )}

        {isEditing && (
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              const files = (e.target as any).file.files
              if (!files || files.length === 0) {
                alert('Please select at least one file to upload.')
                return
              }
              const formData = new FormData()
              for (let i = 0; i < files.length; i++) {
                formData.append('file', files[i])
              }

              const res = await fetch(`/api/courses/${params.courseId}/assignments/${params.assignmentId}/upload`, {
                method: 'POST',
                body: formData,
              })

              if (res.ok) {
                const data = await res.json()
                setAssignment({ 
                  ...assignment, 
                  attachmentUrls: [...(assignment.attachmentUrls || []), ...data.urls] 
                })
                alert('File(s) uploaded successfully.')
              } else {
                alert('Upload failed.')
              }
            }}
            className="mt-4"
          >
            <input name="file" type="file" accept=".pdf,.doc,.docx" multiple className="text-white" />
            <Button className="ml-4" type="submit">Upload</Button>
          </form>
        )}
      </div>
    </div>
  )
}