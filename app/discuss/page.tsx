import { AnimatedBackground } from '../components/AnimatedBackground'
import Link from 'next/link'
import { SocialButtons } from '../components/discuss/SocialButtons'

const courses = [
  {
    id: 1,
    name: 'Linear Algebra',
    description: 'Discuss linear algebra concepts, matrix operations, and their applications in machine learning.',
    topics: ['Vectors & Matrices', 'Linear Transformations', 'Eigenvalues', 'Matrix Operations', 'Applications in ML'],
    activeUsers: 328,
    totalPosts: 1240,
    discordLink: 'https://discord.gg/linear-algebra'
  },
  {
    id: 2,
    name: 'Data Analysis with Python',
    description: 'Share experiences with pandas, numpy, and data visualization techniques.',
    topics: ['Python Basics', 'Pandas', 'NumPy', 'Data Visualization', 'Statistical Analysis'],
    activeUsers: 452,
    totalPosts: 1856,
    discordLink: 'https://discord.gg/data-analysis-with-python'
  },
  {
    id: 3,
    name: 'Database with SQL',
    description: 'Exchange knowledge about database design, complex queries, and optimization techniques.',
    topics: ['SQL Fundamentals', 'Database Design', 'Complex Queries', 'Performance Optimization'],
    activeUsers: 275,
    totalPosts: 986,
    discordLink: 'https://discord.gg/database-with-sql'
  },
  {
    id: 4,
    name: 'Machine Learning with Python',
    description: 'Discuss ML algorithms, model implementations, and real-world applications.',
    topics: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Neural Networks'],
    activeUsers: 523,
    totalPosts: 2150,
    discordLink: 'https://discord.gg/machine-learning-with-python'
  },
  {
    id: 5,
    name: 'Deep Learning with Python',
    description: 'Share insights about neural networks, deep learning frameworks, and advanced architectures.',
    topics: ['Neural Networks', 'CNN', 'RNN', 'Transformers', 'Deep Learning Projects'],
    activeUsers: 412,
    totalPosts: 1680,
    discordLink: 'https://discord.gg/deep-learning-with-python'
  },
  {
    id: 6,
    name: 'Natural Language Processing',
    description: 'Explore NLP techniques, transformer models, and text processing challenges.',
    topics: ['Text Processing', 'Word Embeddings', 'Transformers', 'BERT & GPT', 'NLP Applications'],
    activeUsers: 368,
    totalPosts: 1420,
    discordLink: 'https://discord.gg/natural-language-processing'
  },
  {
    id: 7,
    name: 'Data Visualization with Tableau',
    description: 'Share visualization techniques, dashboard designs, and data storytelling approaches.',
    topics: ['Tableau Basics', 'Chart Types', 'Interactive Dashboards', 'Data Storytelling'],
    activeUsers: 246,
    totalPosts: 890,
    discordLink: 'https://discord.gg/data-visualization-with-tableau'
  }
]

export default function DiscussPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C1D24] to-[#2C2D34] relative overflow-hidden">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-black/30 z-10" />
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2493DF] to-purple-500 mb-4">
            Course Discussions
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Join our vibrant community of learners and share your journey
          </p>
          
          <SocialButtons />
        </div>

        {/* Course Grid - 添加更多视觉效果 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div 
              key={course.id}
              className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-6 
                border border-white/10 hover:border-[#2493DF]/30
                transition-all duration-300 hover:shadow-lg hover:shadow-[#2493DF]/5"
            >
              {/* 添加背景装饰 */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#2493DF]/10 to-purple-500/10 
                rounded-tr-xl rounded-bl-full -z-10 group-hover:opacity-100 opacity-0 transition-opacity" />
              
              <Link 
                href={`/discuss/${course.id}`}
                className="block mb-4"
              >
                <h3 className="text-xl font-semibold text-white group-hover:text-[#2493DF] transition-colors mb-2">
                  {course.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {course.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.topics.map((topic, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full
                        group-hover:bg-[#2493DF]/10 transition-colors"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    {course.activeUsers} active
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    {course.totalPosts} posts
                  </span>
                </div>
              </Link>

              {/* Discord Button */}
              <a 
                href={course.discordLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-[#5865F2]/10 hover:bg-[#5865F2] 
                  text-[#5865F2] hover:text-white px-4 py-2 rounded-lg transition-all duration-300 
                  border border-[#5865F2]/20 hover:border-[#5865F2]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Join Discord Channel
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 