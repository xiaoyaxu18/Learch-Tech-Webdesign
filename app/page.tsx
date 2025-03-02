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
      <div className="absolute inset-0 bg-black/30 z-10" />
      
      <div className="relative z-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center text-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-6xl font-bold text-white mb-6 whitespace-nowrap">
                Learn AI & Machine Learning
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Master the skills of tomorrow with hands-on projects and expert guidance
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/courses">
                  <Button className="bg-[#2493DF] hover:bg-[#2493DF]/90 text-lg px-8">
                    Explore Courses
                  </Button>
                </Link>
                <Button variant="outline" className="text-white border-white/20 text-lg px-8">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Modern Design Section - 使用更亮的背景 */}
        <div className="relative bg-gradient-to-b from-[#1C1D24] via-[#f5f7fa] to-[#f5f7fa] z-20">
          {/* 调整网格线的颜色 */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:14px_24px]" />
          
          {/* Featured Courses Section */}
          <section className="py-20 relative z-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2493DF] to-purple-500 mb-4">
                  Choose a course for you
                </h2>
                <p className="text-xl text-gray-400">Explore our comprehensive curriculum</p>
              </div>

              <div className="relative px-4">
                <button 
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 
                    bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-lg 
                    hover:shadow-xl transition-all duration-300 group"
                  onClick={() => {/* 滑动逻辑 */}}
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-[#2493DF] transition-colors" />
                </button>

                <div className="overflow-x-auto hide-scrollbar">
                  <div className="flex gap-8 p-4">
                    {/* Linear Algebra */}
                    <div className="flex-shrink-0 w-80 bg-white/90 backdrop-blur-sm rounded-2xl p-8 
                      shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 
                      hover:border-[#2493DF]/30 group">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                        rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 
                        transition-transform duration-300">
                        <span className="text-3xl text-blue-600">∑</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-[#2493DF] 
                        transition-colors">Linear Algebra</h3>
                      <p className="text-gray-600 leading-relaxed">Master the fundamentals of linear algebra 
                        essential for machine learning</p>
                    </div>

                    {/* Data Analysis */}
                    <div className="flex-shrink-0 w-80 bg-white/90 backdrop-blur-sm rounded-2xl p-8 
                      shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 
                      hover:border-[#2493DF]/30 group">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500/10 to-red-500/10 
                        rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 
                        transition-transform duration-300">
                        <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M21 21H4.6c-.6 0-1.1-.5-1.1-1.1V3" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M7 14l3-3 4 4 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-[#2493DF] 
                        transition-colors">Data Analysis with Python</h3>
                      <p className="text-gray-600 leading-relaxed">Learn data analysis using Python, pandas, 
                        and numpy</p>
                    </div>

                    {/* Machine Learning */}
                    <div className="flex-shrink-0 w-80 bg-white/90 backdrop-blur-sm rounded-2xl p-8 
                      shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 
                      hover:border-[#2493DF]/30 group">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500/10 to-pink-500/10 
                        rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 
                        transition-transform duration-300">
                        <svg className="w-8 h-8 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" 
                            strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-[#2493DF] 
                        transition-colors">Machine Learning with Python</h3>
                      <p className="text-gray-600 leading-relaxed">Master machine learning algorithms and 
                        implementations</p>
                    </div>

                    {/* Deep Learning */}
                    <div className="flex-shrink-0 w-80 bg-white/90 backdrop-blur-sm rounded-2xl p-8 
                      shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 
                      hover:border-[#2493DF]/30 group">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-pink-500/10 
                        rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 
                        transition-transform duration-300">
                        <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-[#2493DF] 
                        transition-colors">Deep Learning with Python</h3>
                      <p className="text-gray-600 leading-relaxed">Deep dive into neural networks and deep learning</p>
                    </div>

                    {/* NLP */}
                    <div className="flex-shrink-0 w-80 bg-white/90 backdrop-blur-sm rounded-2xl p-8 
                      shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 
                      hover:border-[#2493DF]/30 group">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-teal-500/10 
                        rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 
                        transition-transform duration-300">
                        <svg className="w-8 h-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-[#2493DF] 
                        transition-colors">Natural Language Processing</h3>
                      <p className="text-gray-600 leading-relaxed">Learn modern NLP techniques and transformers</p>
                    </div>

                    {/* Data Visualization */}
                    <div className="flex-shrink-0 w-80 bg-white/90 backdrop-blur-sm rounded-2xl p-8 
                      shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 
                      hover:border-[#2493DF]/30 group">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-teal-500/10 
                        rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 
                        transition-transform duration-300">
                        <svg className="w-8 h-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2"/>
                          <path d="M7 14l3-3 4 4 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-[#2493DF] 
                        transition-colors">Data Visualization with Tableau</h3>
                      <p className="text-gray-600 leading-relaxed">Create impactful data visualizations</p>
                    </div>
                  </div>
                </div>

                <button 
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 
                    bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-lg 
                    hover:shadow-xl transition-all duration-300 group"
                  onClick={() => {/* 滑动逻辑 */}}
                >
                  <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-[#2493DF] transition-colors" />
                </button>
              </div>
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
    </div>
  )
}

