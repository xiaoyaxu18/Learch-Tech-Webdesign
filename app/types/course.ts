export interface Course {
  id: number
  name: string
  description: string
  level: string
  duration: string
  topics: string[]
  progress: number
  instructor: string
  startDate: string
  content: {
    videos: Video[]
    quizzes: Quiz[]
    assignments: Assignment[]
  }
}

export type Video = {
  _id: string
  title: string
  url: string
  duration: string
  watched: boolean
  courseId: string
  key: string
  uploadedBy: string
  uploadedAt: Date
}

interface Quiz {
  id: number
  title: string
  questions: number
  completed: boolean
  dueDate: string
}

interface Assignment {
  id: number
  title: string
  dueDate: string
  submitted: boolean
  description: string
} 