import { CourseSidebar } from '@/app/components/courses/CourseSidebar'
import { CourseHeader } from '@/app/components/courses/CourseHeader'

export default function CourseLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { courseId: string }
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C1D24] to-[#2C2D34]">
      <div className="flex">
        <CourseSidebar courseId={params.courseId} />
        <main className="flex-1 ml-64">
          <CourseHeader courseId={params.courseId} />
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 