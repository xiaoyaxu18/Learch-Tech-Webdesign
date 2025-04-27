"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  BookOpen, 
  Video, 
  FileText, 
  CheckSquare, 
  Award,
  MessageSquare,
  GraduationCap,
  FolderOpen,
  Layers
} from 'lucide-react'

interface NavItem {
  name: string
  href: string
  icon: any
}

export function CourseSidebar({ courseId }: { courseId: string }) {
  const pathname = usePathname()
  
  const navigation: NavItem[] = [
    {
      name: 'Overview',
      href: `/courses/${courseId}`,
      icon: BookOpen
    },
    {
      name: 'Modules',
      href: `/courses/${courseId}/modules`,
      icon: Layers
    },
    {
      name: 'Video Lectures',
      href: `/courses/${courseId}/videos`,
      icon: Video
    },
    {
      name: 'Files',
      href: `/courses/${courseId}/files`,
      icon: FolderOpen
    },
    {
      name: 'Assignments',
      href: `/courses/${courseId}/assignments`,
      icon: FileText
    },
    {
      name: 'Quizzes',
      href: `/courses/${courseId}/quizzes`,
      icon: CheckSquare
    },
    {
      name: 'Exams',
      href: `/courses/${courseId}/exams`,
      icon: Award
    },
    {
      name: 'Grades',
      href: `/courses/${courseId}/grades`,
      icon: GraduationCap
    },
    {
      name: 'Discussion',
      href: `/courses/${courseId}/discussion`,
      icon: MessageSquare
    }
  ]

  return (
    <div className="fixed w-64 h-screen bg-[#1C1D24]/50 backdrop-blur-sm border-r border-gray-800">
      <nav className="mt-16 px-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-colors
                ${isActive 
                  ? 'bg-[#2493DF] text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
} 