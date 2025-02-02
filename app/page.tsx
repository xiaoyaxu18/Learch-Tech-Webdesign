"use client"

import Image from "next/image"
import { Button } from "./components/ui/button"
import { StarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatedBackground } from "./components/AnimatedBackground"
import Link from 'next/link'
import { useAuth } from './contexts/AuthContext'

export default function Page() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C1D24] to-[#2C2D34] relative overflow-hidden">
      <AnimatedBackground />
      {/* Add a semi-transparent overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Header - 恢复原始样式 */}
      <header className="relative flex items-center justify-between px-12 py-8 z-20">
        <div className="flex items-center gap-4">
          <svg className="w-12 h-12 text-[#2493DF]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-white text-2xl font-semibold">LearnTech</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-12 text-gray-300">
          <Link href="/courses" className="hover:text-[#2493DF] transition-colors duration-200 text-lg">
            Courses
          </Link>
          <Link href="/teams" className="hover:text-[#2493DF] transition-colors duration-200 text-lg">
            Teams
          </Link>
          <Link href="#testimony" className="hover:text-[#2493DF] transition-colors duration-200 text-lg">
            Testimony
          </Link>
          <Link href="/discuss" className="hover:text-[#2493DF] transition-colors duration-200 text-lg">
            Discuss
          </Link>
          <Link href="#pricing" className="hover:text-[#2493DF] transition-colors duration-200 text-lg">
            Pricing
          </Link>
          <Link href="#faq" className="hover:text-[#2493DF] transition-colors duration-200 text-lg">
            FAQ
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-white">{user.name}</span>
              <Button 
                variant="ghost" 
                className="text-white hover:text-white/90"
                onClick={() => logout()}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-white hover:text-white/90 text-lg">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-[#2493DF] hover:bg-[#2493DF]/90 text-lg px-8">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-[calc(100vh-96px)] text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Learn AI & Machine Learning
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl">
          Master the future of technology with our comprehensive courses and hands-on projects
        </p>
        <Link href="/courses">
          <Button className="bg-[#2493DF] hover:bg-[#2493DF]/90 text-lg px-8 py-6">
            Start Learning Now
          </Button>
        </Link>
      </div>

      {/* Modern Design Section - 使用更亮的背景 */}
      <div className="relative bg-gradient-to-b from-[#1C1D24] via-[#f5f7fa] to-[#f5f7fa] z-20">
        {/* 调整网格线的颜色 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:14px_24px]" />
        
        {/* Course Selection */}
        <section className="relative max-w-6xl mx-auto px-12 py-32">
          <div className="relative mb-24 text-center">
            <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
              from-[#2493DF] to-purple-500 mb-4 drop-shadow-lg">
              Choose a course for you
            </h2>
            <p className="text-xl text-gray-600 font-medium mb-6">
              Explore our comprehensive curriculum
            </p>
            <div className="w-32 h-2 bg-gradient-to-r from-[#2493DF] to-purple-500 mx-auto rounded-full 
              shadow-lg shadow-blue-500/30" />
          </div>
          
          <div className="relative">
            {/* 左箭头 - 更清晰的样式 */}
            <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 
              bg-[#2493DF] backdrop-blur-sm rounded-full p-3 shadow-xl z-10 
              hover:bg-[#2493DF]/90 transition-all duration-300 
              border-2 border-white/50 group"
            >
              <ChevronLeft className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-200" />
            </button>

            <div className="flex gap-8 overflow-x-auto pb-12 px-4 snap-x snap-mandatory">
              {[
                {
                  title: "Data Analysis with Python",
                  color: "from-yellow-500 to-orange-500",
                  icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                },
                {
                  title: "Machine Learning with Python",
                  color: "from-purple-500 to-pink-500",
                  icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
                },
                {
                  title: "Deep Learning with Python",
                  color: "from-blue-500 to-indigo-500",
                  icon: "M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.871-8c0-2.874-.673-5.59-1.871-8M9 9h1.246a1 1 0 01.961.725l1.586 5.55a1 1 0 00.961.725H15m1-7h-.08a2 2 0 00-1.519.698L9.6 15.302A2 2 0 018.08 16H8",
                },
                {
                  title: "Data Visualization with Tableau",
                  color: "from-green-500 to-teal-500",
                  icon: "M8 13v-1m4 1v-3m4 3V8M12 21l9-9-9-9-9 9 9 9z",
                },
                {
                  title: "Database with SQL",
                  color: "from-red-500 to-pink-500",
                  icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
                },
              ].map((course, index) => (
                <div
                  key={index}
                  className="flex-none w-64 bg-white/80 backdrop-blur-sm rounded-xl p-6 
                    shadow-lg hover:shadow-xl transition-all duration-300 snap-start 
                    border border-gray-100 hover:border-[#2493DF]/50 group"
                >
                  <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${course.color} 
                    rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 
                    transition-transform duration-300`}>
                    <svg className="w-10 h-10 text-gray-800 drop-shadow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={course.icon} />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-center text-gray-800 text-lg leading-tight 
                    group-hover:text-[#2493DF] transition-colors">
                    {course.title}
                  </h3>
                </div>
              ))}
            </div>

            {/* 右箭头 - 更清晰的样式 */}
            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 
              bg-[#2493DF] backdrop-blur-sm rounded-full p-3 shadow-xl z-10 
              hover:bg-[#2493DF]/90 transition-all duration-300 
              border-2 border-white/50 group"
            >
              <ChevronRight className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="relative max-w-6xl mx-auto px-12 py-32">
          <div className="relative mb-24 text-center">
            <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
              from-[#2493DF] to-purple-500 mb-4 drop-shadow-lg">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-700 font-medium mb-6">
              Excellence in Tech Education
            </p>
            <div className="w-32 h-2 bg-gradient-to-r from-[#2493DF] to-purple-500 mx-auto rounded-full 
              shadow-lg shadow-blue-500/30" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* 左侧：主要特点 */}
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg 
                border border-gray-100 hover:border-[#2493DF]/50 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2493DF] to-blue-600 
                    rounded-lg flex items-center justify-center shadow-lg 
                    group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 group-hover:text-[#2493DF] transition-colors">
                    Expert Instruction
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Learn from experienced professors at Santa Clara University, gaining insights directly from industry experts.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg 
                border border-gray-100 hover:border-[#2493DF]/50 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2493DF] to-blue-600 
                    rounded-lg flex items-center justify-center shadow-lg 
                    group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 group-hover:text-[#2493DF] transition-colors">
                    Comprehensive Curriculum
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Three elective courses with 8 sessions each, including assignments, quizzes, and dedicated office hours.
                </p>
              </div>
            </div>

            {/* 右侧：详细信息 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg 
              border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Program Highlights</h3>
              <div className="space-y-6">
                <div className="flex gap-4 group">
                  <div className="w-8 h-8 bg-[#2493DF]/10 rounded-full flex items-center 
                    justify-center flex-shrink-0 group-hover:bg-[#2493DF]/20 transition-colors">
                    <span className="text-[#2493DF] font-semibold">1</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Complete three courses in three months with flexible weekend sessions
                  </p>
                </div>
                <div className="flex gap-4 group">
                  <div className="w-8 h-8 bg-[#2493DF]/10 rounded-full flex items-center 
                    justify-center flex-shrink-0 group-hover:bg-[#2493DF]/20 transition-colors">
                    <span className="text-[#2493DF] font-semibold">2</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    48 total hours of instruction with hands-on projects and practical assignments
                  </p>
                </div>
                <div className="flex gap-4 group">
                  <div className="w-8 h-8 bg-[#2493DF]/10 rounded-full flex items-center 
                    justify-center flex-shrink-0 group-hover:bg-[#2493DF]/20 transition-colors">
                    <span className="text-[#2493DF] font-semibold">3</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Earn certificates and potential recommendation letters from professors
                  </p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-[#2493DF]/5 to-purple-500/5 
                rounded-lg border border-[#2493DF]/20"
              >
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Ready to Start?</h4>
                <p className="text-gray-600 mb-4">
                  Join our specialized learning program and kickstart your tech career.
                </p>
                <Button className="bg-[#2493DF] hover:bg-[#2493DF]/90 text-white w-full">
                  Enroll Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative max-w-4xl mx-auto px-12 py-32">
          <div className="relative mb-24 text-center">
            <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
              from-[#2493DF] to-purple-500 mb-4 drop-shadow-lg">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-700 font-medium mb-6">
              Real stories from real learners
            </p>
            <div className="w-32 h-2 bg-gradient-to-r from-[#2493DF] to-purple-500 mx-auto rounded-full 
              shadow-lg shadow-blue-500/30" />
          </div>

          <div className="space-y-12">
            {[
              {
                name: "David Zhang",
                content:
                  "The hands-on approach to machine learning concepts was incredible. I went from understanding basic Python to implementing real ML models. The practical projects helped me understand complex algorithms intuitively.",
              },
              {
                name: "Lisa Anderson",
                content:
                  "The step-by-step tutorials on neural networks and deep learning were perfect for my learning style. I especially loved how we could experiment with different models right in the browser.",
              },
              {
                name: "Marcus Johnson",
                content:
                  "After completing the course and getting certified, I landed a role as an ML Engineer. The curriculum covered everything from basic statistics to advanced deep learning frameworks. Truly comprehensive!",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-8 
                  transition-all duration-300 ease-in-out hover:bg-white/90 
                  border border-gray-100 hover:border-[#2493DF]/50 
                  relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#2493DF]/10 to-purple-500/10 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute top-0 right-0 w-16 h-16">
                  <div className="absolute transform rotate-45 translate-x-8 -translate-y-8 w-16 h-16 
                    bg-gradient-to-r from-[#2493DF]/20 to-purple-500/20" />
                </div>
                
                <div className="relative flex items-start gap-4">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Student avatar"
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-gray-700 shadow-md"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-bold text-xl text-gray-800">{testimonial.name}</h3>
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} className="w-5 h-5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg">{testimonial.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

