"use client"

import { AnimatedBackground } from '../components/AnimatedBackground'
import { Github, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'

const founder = {
  name: 'Tao Li',
  title: 'Founding President of SVAI',
  bio: `Professor Tao Li is the director of the MS Program in Business Analytics and Co-Lead of 
  Prometheus Lab for AI and Business at Santa Clara University. With expertise in Machine Learning, 
  Data Analytics, and Business Intelligence, he brings a unique blend of academic excellence and 
  practical industry experience. He has collaborated with leading tech companies including Amazon Web Services, 
  Adobe, and Intuitive Surgical, bridging the gap between theoretical knowledge and real-world applications. 
  His vision is to transform business analytics education through hands-on, industry-relevant learning.`,
  image: '/images/taoli.jpg',
  social: {
    linkedin: 'https://www.linkedin.com/in/tao-li-2a0b8b24/',
    website: 'https://prof-taoli.github.io/Homepage/'
  }
}

const instructors = [
  {
    id: 1,
    name: 'Yasin Ceran',
    title: 'Machine Learning Instructor',
    affiliation: 'Korea Advanced Institute of Science',
    expertise: 'Machine Learning & Deep Learning',
    image: '/images/instructors/yasin.jpg',
    courses: ['Machine Learning with Python', 'Deep Learning with Python']
  },
  {
    id: 2,
    name: 'Siobhan McNamara',
    title: 'Data Science Instructor',
    affiliation: 'Data Scientist at Agari',
    expertise: 'Data Analysis & Visualization',
    image: '/images/instructors/siobhan.jpg',
    courses: ['Data Analysis with Python', 'Data Visualization with Tableau']
  },
  {
    id: 3,
    name: 'Tyler Suard',
    title: 'AI Engineer',
    affiliation: 'AI Engineer at Facebook',
    expertise: 'Database Systems & SQL',
    image: '/images/instructors/tyler.jpg',
    courses: ['Database with SQL']
  }
]

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C1D24] to-[#2C2D34] relative overflow-hidden">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-black/30 z-10" />
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 py-12">
        {/* Founder Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">Our Vision</h1>
            <p className="text-xl text-gray-300">Building the future of AI education</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <div className="flex flex-col md:flex-row gap-12 items-start">
              {/* Founder Image */}
              <div className="w-full md:w-1/3">
                <div className="relative w-64 h-64 mx-auto">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#2493DF]/20 to-purple-500/20 rounded-xl blur"></div>
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="rounded-xl object-cover relative"
                  />
                </div>
                <div className="text-center mt-6">
                  <h2 className="text-2xl font-bold text-gray-800">{founder.name}</h2>
                  <p className="text-[#2493DF] font-medium mt-1">{founder.title}</p>
                  
                  <div className="flex justify-center gap-4 mt-4">
                    {Object.entries(founder.social).map(([platform, link]) => (
                      <a 
                        key={platform}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-[#2493DF] transition-colors p-2 hover:bg-gray-100 rounded-full"
                      >
                        {platform === 'linkedin' && <Linkedin size={20} />}
                        {platform === 'website' && (
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="w-5 h-5"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                          </svg>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Founder Bio */}
              <div className="w-full md:w-2/3 space-y-6">
                <div className="bg-gradient-to-r from-[#2493DF]/10 to-purple-500/10 rounded-lg p-6 border border-[#2493DF]/10">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">About Professor Li</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Professor Tao Li is the director of the MS Program in Business Analytics and Co-Lead of 
                    Prometheus Lab for AI and Business at Santa Clara University.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50/80 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Expertise</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-gray-600">
                        <span className="w-2 h-2 bg-[#2493DF] rounded-full"></span>
                        Machine Learning
                      </li>
                      <li className="flex items-center gap-2 text-gray-600">
                        <span className="w-2 h-2 bg-[#2493DF] rounded-full"></span>
                        Data Analytics
                      </li>
                      <li className="flex items-center gap-2 text-gray-600">
                        <span className="w-2 h-2 bg-[#2493DF] rounded-full"></span>
                        Business Intelligence
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50/80 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Industry Collaboration</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-gray-600">
                        <span className="w-2 h-2 bg-[#2493DF] rounded-full"></span>
                        Amazon Web Services
                      </li>
                      <li className="flex items-center gap-2 text-gray-600">
                        <span className="w-2 h-2 bg-[#2493DF] rounded-full"></span>
                        Teladoc Health
                      </li>
                      <li className="flex items-center gap-2 text-gray-600">
                        <span className="w-2 h-2 bg-[#2493DF] rounded-full"></span>
                        Robolox
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50/80 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Vision</h4>
                  <p className="text-gray-600">
                    His vision is to transform business analytics education through hands-on, 
                    industry-relevant learning, bridging the gap between theoretical knowledge 
                    and real-world applications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructors Section */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our Expert Instructors</h2>
            <p className="text-xl text-gray-300">Learn from industry professionals and academic experts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <div 
                key={instructor.id}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-center mb-6">
                  <div className="w-32 h-32 mx-auto mb-4 relative">
                    <Image
                      src={instructor.image}
                      alt={instructor.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{instructor.name}</h3>
                  <p className="text-[#2493DF] font-medium">{instructor.title}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Courses</h4>
                  <div className="space-y-2">
                    {instructor.courses.map((course) => (
                      <div 
                        key={course}
                        className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                      >
                        {course}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 