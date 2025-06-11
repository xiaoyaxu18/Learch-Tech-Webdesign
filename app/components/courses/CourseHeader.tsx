"use client"

import { useEffect, useState } from 'react'

interface CourseInfo {
  name: string
  instructor: string
  progress: number
}

export function CourseHeader({ courseId }: { courseId: string }) {
  const [courseInfo, setCourseInfo] = useState<CourseInfo>({
    name: 'Loading...',
    instructor: '',
    progress: 0
  })

  // 在实际应用中，这里会从API获取课程信息
  useEffect(() => {
    // 直接写成你想要的内容
    setCourseInfo({
      name: 'Dashboards with Tableau',
      instructor: 'Dr. TaoLi',
      progress: 35
    })
  }, [courseId])

  return (
    <div className="bg-[#1C1D24]/50 backdrop-blur-sm border-b border-gray-800 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{courseInfo.name}</h1>
          <p className="text-gray-400">Instructor: {courseInfo.instructor}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-400">Course Progress</p>
            <p className="text-lg font-semibold text-white">{courseInfo.progress}%</p>
          </div>
          <div className="w-32 h-2 bg-gray-700 rounded-full">
            <div 
              className="h-full bg-[#2493DF] rounded-full"
              style={{ width: `${courseInfo.progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 