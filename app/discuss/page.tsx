import { AnimatedBackground } from '../components/AnimatedBackground'
import CourseDiscussionCard from '../components/discuss/CourseDiscussionCard'
import { Button } from '../components/ui/button'

const courses = [
  {
    id: 1,
    name: 'Data Analysis with Python',
    description: 'Learn data analysis using Python, pandas, and numpy',
    discordLink: 'https://discord.gg/dataanalysis',
    topics: ['Pandas', 'Numpy', 'Data Cleaning'],
    activeUsers: 245,
    totalPosts: 1320
  },
  {
    id: 2,
    name: 'Machine Learning with Python',
    description: 'Master machine learning algorithms and implementations',
    discordLink: 'https://discord.gg/machinelearning',
    topics: ['Scikit-learn', 'Supervised Learning', 'Model Evaluation'],
    activeUsers: 234,
    totalPosts: 1205
  },
  {
    id: 3,
    name: 'Deep Learning with Python',
    description: 'Deep learning concepts and practical applications',
    discordLink: 'https://discord.gg/deeplearning',
    topics: ['Neural Networks', 'PyTorch', 'TensorFlow'],
    activeUsers: 189,
    totalPosts: 892
  },
  {
    id: 4,
    name: 'Data Visualization with Tableau',
    description: 'Create impactful visualizations with Tableau',
    discordLink: 'https://discord.gg/tableau',
    topics: ['Dashboard', 'Data Stories', 'Visual Analytics'],
    activeUsers: 156,
    totalPosts: 645
  },
  {
    id: 5,
    name: 'Database with SQL',
    description: 'Master SQL and database management',
    discordLink: 'https://discord.gg/sql',
    topics: ['SQL Queries', 'Database Design', 'PostgreSQL'],
    activeUsers: 178,
    totalPosts: 734
  }
]

export default function DiscussPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C1D24] to-[#2C2D34] relative overflow-hidden">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-black/30 z-10" />
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Course Discussions</h1>
          <p className="text-gray-300 mb-8">Join our course-specific communities and Discord channels</p>
          
          <a 
            href="https://discord.gg/learntech-main" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button className="bg-[#5865F2] hover:bg-[#4752C4] transition-colors">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Join Main Community
            </Button>
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseDiscussionCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  )
} 