'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Layers, 
  Video, 
  File, 
  ClipboardList,
  GraduationCap,
  MessageCircle,
  ScrollText,
  Medal
} from 'lucide-react'

const navigation = [
  {
    name: 'Overview',
    href: (courseId: string) => `/courses/${courseId}`,
    icon: LayoutDashboard
  },
  {
    name: 'Modules',
    href: (courseId: string) => `/courses/${courseId}/modules`,
    icon: Layers
  },
  {
    name: 'Video Lectures',
    href: (courseId: string) => `/courses/${courseId}/videos`,
    icon: Video
  },
  {
    name: 'Files',
    href: (courseId: string) => `/courses/${courseId}/files`,
    icon: File
  },
  {
    name: 'Assignments',
    href: (courseId: string) => `/courses/${courseId}/assignments`,
    icon: ClipboardList
  },
  {
    name: 'Quizzes',
    href: (courseId: string) => `/courses/${courseId}/quizzes`,
    icon: ScrollText
  },
  {
    name: 'Exams',
    href: (courseId: string) => `/courses/${courseId}/exams`,
    icon: GraduationCap
  },
  {
    name: 'Grades',
    href: (courseId: string) => `/courses/${courseId}/grades`,
    icon: Medal
  },
  {
    name: 'Discussion',
    href: (courseId: string) => `/courses/${courseId}/discussion`,
    icon: MessageCircle
  }
]

interface CourseNavigationProps {
  courseId: string
}

export function CourseNavigation({ courseId }: CourseNavigationProps) {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {navigation.map((item) => {
        const href = item.href(courseId)
        const isActive = pathname === href
        
        return (
          <Link
            key={item.name}
            href={href}
            className={`
              flex items-center px-4 py-2 text-sm font-medium rounded-lg
              ${isActive 
                ? 'bg-[#2493DF] text-white' 
                : 'text-gray-400 hover:text-white hover:bg-white/10'
              }
            `}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
} 