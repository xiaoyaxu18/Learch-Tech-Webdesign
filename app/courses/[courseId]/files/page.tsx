"use client"

import React from 'react'
import { useEffect, useState } from 'react'
import { courses } from '@/app/data/courses'
import { FileText, Download, Trash2, FolderOpen } from 'lucide-react'
import { useAuth } from '@/app/contexts/AuthContext'

interface CourseFile {
  id: number
  name: string
  type: string
  size: string
  uploadedBy: string
  uploadDate: string
  downloadUrl: string
}

export default function FilesPage({ params }: { params: { courseId: string } }) {
  const [courseId, setCourseId] = useState('')
  useEffect(() => { setCourseId(params.courseId) }, [params.courseId])
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'
  
  const [files, setFiles] = useState<any[]>([])

  useEffect(() => {
    const fetchFiles = async () => {
      const res = await fetch(`/api/courses/${courseId}/files`)
      const data = await res.json()
      setFiles(data)
    }

    fetchFiles()
  }, [courseId])

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />
      case 'powerpoint':
        return <FileText className="w-5 h-5 text-orange-500" />
      case 'zip':
        return <FolderOpen className="w-5 h-5 text-blue-500" />
      default:
        return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  if (typeof user === 'undefined') {
    return <div className="text-white p-6">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {(isAdmin) && (
        <div className="bg-white/10 border border-white/20 rounded-lg p-4">
          <h3 className="text-white text-sm font-semibold mb-2">Upload a File</h3>
          <div className="flex items-center gap-4">
            <input
              type="file"
              id="file-upload-visible"
              className="text-white text-sm"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file) return
 
                const formData = new FormData()
                formData.append('file', file)
 
                const res = await fetch(`/api/courses/${courseId}/files`, {
                  method: 'POST',
                  body: formData
                })
 
                if (res.ok) {
                  const uploaded = await res.json()
                  setFiles((prev) => [
                    {
                      _id: uploaded.id,
                      fileName: file.name,
                      url: uploaded.url,
                      uploadedAt: new Date().toISOString(),
                      uploadedBy: user?.email || 'unknown',
                      size: `${(file.size / 1024).toFixed(2)} KB`,
                      type: file.type,
                    },
                    ...prev
                  ])
                } else {
                  const err = await res.text()
                  console.error('Upload failed:', err)
                  alert('Upload failed.')
                }
              }}
            />
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Course Files</h2>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Size</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Uploaded By</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Upload Date</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {files.map((file) => (
              <tr key={file._id} className="hover:bg-white/5">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.fileName?.split('.').pop() || '')}
                    <div>
                      <div className="text-white font-medium">{file.fileName}</div>
                      <div className="text-sm text-gray-400">{file.fileName?.split('.').pop()?.toUpperCase()}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-300">{file.size || '—'}</td>
                <td className="px-6 py-4 text-gray-300">{file.uploadedBy || '—'}</td>
                <td className="px-6 py-4 text-gray-300">{new Date(file.uploadedAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={async () => {
                        try {
                          const response = await fetch(file.url)
                          const blob = await response.blob()
                          const url = window.URL.createObjectURL(blob)
                          const a = document.createElement('a')
                          a.href = url
                          a.download = file.fileName || 'download'
                          document.body.appendChild(a)
                          a.click()
                          document.body.removeChild(a)
                          window.URL.revokeObjectURL(url)
                        } catch (err) {
                          console.error('Download failed', err)
                          alert('Failed to download file.')
                        }
                      }}
                      className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    {true && (
                      <button
                        onClick={async () => {
                          console.log('Attempting to delete file:', file)
                          const confirmDelete = confirm(`Are you sure you want to delete ${file.fileName}?`)
                          if (!confirmDelete) return
                        
                        try {
                          const res = await fetch(`/api/courses/${courseId}/files/${file._id}`, {
                                method: 'DELETE',
                              })
                            if (res.ok) {
                              setFiles((prev) => prev.filter((f) => f._id !== file._id))
                            } else {
                              const errText = await res.text()
                              console.error('Response:', res)
                              console.error('Failed to delete file:', errText)
                              alert('Delete failed.')
                            }
                          } catch (err) {
                            console.error('Delete failed:', err)
                            alert('Delete failed.')
                          }
                        }}
                        className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}