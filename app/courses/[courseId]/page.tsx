"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function CoursePage() {
  const params = useParams()
  const courseId = params.courseId as string
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/courses/${courseId}`)
      .then(res => res.json())
      .then(data => setCourse(data))
      .finally(() => setLoading(false))
  }, [courseId])

  if (loading || !course) {
    return <div className="p-8 text-white">Loading course...</div>
  }

  return (
    <div className="space-y-6">
      {/* 课程概览 */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Course Overview</h2>
        <p className="text-gray-300">{course.description}</p>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">Course Details</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Duration: {course.duration}</li>
              <li>Level: {course.level}</li>
              <li>Start Date: {course.startDate}</li>
            </ul>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">Topics Covered</h3>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(course.topics) && course.topics.map((topic: string, index: number) => (
                <span 
                  key={index}
                  className="bg-[#2493DF]/10 text-[#2493DF] px-3 py-1 rounded-full text-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 添加讲师介绍部分 */}
        <div className="mt-4 bg-white/5 rounded-lg p-4">
          <h3 className="text-white font-medium mb-4">Course Instructor</h3>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-[#2493DF]/10 flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-[#2493DF]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
            </div>
            <div>
              <h4 className="text-white font-medium">{course.instructor}</h4>
              <p className="text-gray-400 text-sm mt-1">
                {getInstructorBio(course.instructor)}
              </p>
              <div className="flex gap-3 mt-3">
                <a 
                  href="#" 
                  className="text-[#2493DF] hover:text-[#2493DF]/80 text-sm"
                >
                  View Profile
                </a>
                <a 
                  href="#" 
                  className="text-[#2493DF] hover:text-[#2493DF]/80 text-sm"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 课程进度 */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Your Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-gray-400 mb-1">Videos Watched</h3>
            <p className="text-2xl font-semibold text-white">3/12</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-gray-400 mb-1">Assignments Completed</h3>
            <p className="text-2xl font-semibold text-white">2/6</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-gray-400 mb-1">Quiz Score</h3>
            <p className="text-2xl font-semibold text-white">85%</p>
          </div>
        </div>
      </div>

      {/* 即将到来的任务 */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Upcoming Tasks</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-white/5 rounded-lg p-4">
            <div>
              <h3 className="text-white">Week 3 Quiz</h3>
              <p className="text-gray-400">Due: Next Monday</p>
            </div>
            <Link 
              href={`/courses/${params.courseId}/quizzes/3`}
              className="text-[#2493DF] hover:underline"
            >
              Start Quiz
            </Link>
          </div>
          <div className="flex items-center justify-between bg-white/5 rounded-lg p-4">
            <div>
              <h3 className="text-white">Assignment 2</h3>
              <p className="text-gray-400">Due: Next Wednesday</p>
            </div>
            <Link 
              href={`/courses/${params.courseId}/assignments/2`}
              className="text-[#2493DF] hover:underline"
            >
              View Assignment
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// 添加讲师简介函数
function getInstructorBio(instructor: string): string {
  const bios: { [key: string]: string } = {
    'Dr. Sarah Chen': 'Expert in Linear Algebra and Machine Learning with over 10 years of teaching experience. Previously worked at Stanford University and Google Research.',
    'Dr. Michael Johnson': 'Data Science specialist with extensive experience in Python and statistical analysis. Lead Data Scientist at Amazon for 5 years.',
    'Prof. Emily Wang': 'Database expert with 15 years of industry experience. Previously worked as Senior Database Architect at Oracle.',
    'Dr. James Wilson': 'Machine Learning researcher and practitioner. Published numerous papers in top ML conferences and worked at DeepMind.',
    'Dr. Lisa Anderson': 'Deep Learning specialist focusing on neural networks and computer vision. Previously at NVIDIA Research.',
    'Dr. David Zhang': 'NLP expert with experience in both academia and industry. Led several large-scale NLP projects at Microsoft.',
    'Prof. Rachel Lee': 'Data Visualization expert with focus on business analytics. Consultant for Fortune 500 companies.'
  }
  
  return bios[instructor] || 'Experienced instructor in the field.'
}