import { getModulesByCourseId } from '../../../lib/db'
import { Lock, CheckCircle, PlayCircle, FileText, BookOpen } from 'lucide-react'
import Link from 'next/link'

interface Module {
  id: number
  title: string
  description: string
  status: 'locked' | 'in-progress' | 'completed'
  progress: number
  content: {
    overview: {
      description: string
      readings: string[]
    }
    videos: {
      id: number
      title: string
      duration: string
      watched: boolean
    }[]
    quiz: {
      id: number
      title: string
      questions: number
      completed: boolean
      available: boolean
    }
    assignment: {
      id: number
      title: string
      dueDate: string
      completed: boolean
      available: boolean
    }
  }
}

export default async function ModulesPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  const modules: Module[] = await getModulesByCourseId(courseId)


  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white">Course Modules</h2>

      <div className="space-y-4">
        {modules.map((module) => (
          <div 
            key={module.id}
            className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden"
          >
            {/* 模块头部 */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">
                  Module {module.id}: {module.title}
                </h3>
                <div className="flex items-center gap-2">
                  {module.status === 'completed' && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {module.status === 'locked' && (
                    <Lock className="w-5 h-5 text-gray-500" />
                  )}
                  <span className="text-gray-400">{module.progress}% Complete</span>
                </div>
              </div>
              <p className="text-gray-400">{module.description}</p>
            </div>

            {/* 模块内容 */}
            <div className="divide-y divide-white/10">
              {/* Overview & Readings */}
              <div className="p-6">
                <div className="flex items-center gap-3 text-white mb-4">
                  <BookOpen className="w-5 h-5" />
                  <h4 className="font-medium">Overview & Readings</h4>
                </div>
                <div className="pl-8">
                  <p className="text-gray-400 mb-4">{module.content.overview.description}</p>
                  <div className="space-y-2">
                    {module.content.overview.readings.map((reading, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-300">
                        <div className="w-1.5 h-1.5 bg-[#2493DF] rounded-full"></div>
                        {reading}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Videos */}
              <div className="p-6">
                <div className="flex items-center gap-3 text-white mb-4">
                  <PlayCircle className="w-5 h-5" />
                  <h4 className="font-medium">Video Lectures</h4>
                </div>
                <div className="pl-8 space-y-3">
                  {module.content.videos.map((video) => (
                    <div 
                      key={video.id}
                      className="flex items-center justify-between bg-white/5 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-3">
                        {video.watched ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <PlayCircle className="w-5 h-5 text-gray-400" />
                        )}
                        <div>
                          <div className="text-white">{video.title}</div>
                          <div className="text-sm text-gray-400">{video.duration}</div>
                        </div>
                      </div>
                      <Link 
                        href={`/courses/${courseId}/videos/${video.id}`}
                        className="text-[#2493DF] hover:underline text-sm"
                      >
                        Watch Video
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quiz */}
              <div className="p-6">
                <div className="flex items-center gap-3 text-white mb-4">
                  <CheckCircle className="w-5 h-5" />
                  <h4 className="font-medium">Quiz</h4>
                </div>
                <div className="pl-8">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white">{module.content.quiz.title}</div>
                        <div className="text-sm text-gray-400">
                          {module.content.quiz.questions} questions
                        </div>
                      </div>
                      {module.content.quiz.available ? (
                        <Link 
                          href={`/courses/${courseId}/quizzes/${module.content.quiz.id}`}
                          className="text-[#2493DF] hover:underline text-sm"
                        >
                          {module.content.quiz.completed ? 'Review Quiz' : 'Start Quiz'}
                        </Link>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-400">
                          <Lock className="w-4 h-4" />
                          <span className="text-sm">Complete videos to unlock</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Assignment */}
              <div className="p-6">
                <div className="flex items-center gap-3 text-white mb-4">
                  <FileText className="w-5 h-5" />
                  <h4 className="font-medium">Assignment</h4>
                </div>
                <div className="pl-8">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white">{module.content.assignment.title}</div>
                        <div className="text-sm text-gray-400">
                          Due: {module.content.assignment.dueDate}
                        </div>
                      </div>
                      {module.content.assignment.available ? (
                        <Link 
                          href={`/courses/${courseId}/assignments/${module.content.assignment.id}`}
                          className="text-[#2493DF] hover:underline text-sm"
                        >
                          {module.content.assignment.completed ? 'View Submission' : 'Start Assignment'}
                        </Link>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-400">
                          <Lock className="w-4 h-4" />
                          <span className="text-sm">Complete videos to unlock</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}