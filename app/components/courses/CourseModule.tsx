import { Clock, BookOpen, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'

interface CourseModuleProps {
  course: {
    id: number
    name: string
    description: string
    level: string
    duration: string
    topics: string[]
  }
}

export default function CourseModule({ course }: CourseModuleProps) {
  // 分离描述和先修课程信息
  const prerequisiteMatch = course.description.match(/Prerequisites?: (.+?)\./)
  const mainDescription = course.description.replace(/Prerequisites?: .+?\./, '').trim()
  const prerequisite = prerequisiteMatch ? prerequisiteMatch[1] : null

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-blue-100 text-blue-800'
      case 'advanced':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
          <span className={`px-3 py-1 rounded-full text-sm ${getLevelColor(course.level)}`}>
            {course.level}
          </span>
        </div>
      </div>

      <p className="text-gray-600 mb-4">{mainDescription}</p>
      {prerequisite && (
        <p className="text-gray-600 mb-4 italic">
          Prerequisites: {prerequisite}
        </p>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
        <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>{course.duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <BookOpen size={16} />
          <span>8 modules</span>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        {course.topics.slice(0, 3).map((topic, index) => (
          <div key={index} className="flex items-center gap-2 text-gray-600">
            <span className="w-1.5 h-1.5 bg-[#2493DF] rounded-full"></span>
            {topic}
          </div>
        ))}
        {course.topics.length > 3 && (
          <div className="text-sm text-gray-500">
            +{course.topics.length - 3} more topics
          </div>
        )}
      </div>

      <Link href={`/courses/${course.id}`}>
        <Button className="w-full bg-[#2493DF] hover:bg-[#2493DF]/90 group">
          View Course
          <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </div>
  )
} 