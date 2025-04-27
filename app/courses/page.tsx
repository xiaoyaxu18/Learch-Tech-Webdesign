import { AnimatedBackground } from '../components/AnimatedBackground'
import CourseModule from '../components/courses/CourseModule'

const courses = [
  // 基础课程 (Beginner)
  {
    _id: '65f2f1234567890abcdef123',
    id: 1,
    name: 'Linear Algebra',
    description: 'Master the fundamentals of linear algebra essential for machine learning and data science.',
    level: 'Beginner',
    duration: '8 weeks',
    topics: ['Vectors & Matrices', 'Linear Transformations', 'Eigenvalues'],
    progress: 0,
    instructor: 'Dr. Sarah Chen',
    startDate: '2024-02-01'
  },
  {
    _id: 'course-2',
    id: 2,
    name: 'Data Analysis with Python',
    description: 'Learn data analysis using Python, pandas, and numpy. A foundational course required for machine learning and deep learning studies.',
    level: 'Beginner',
    duration: '8 weeks',
    topics: ['Python Basics', 'Pandas', 'NumPy', 'Data Visualization', 'Statistical Analysis']
  },
  {
    _id: 'course-3',
    id: 3,
    name: 'Database with SQL',
    description: 'Master SQL and database management. Learn to design, query, and optimize relational databases.',
    level: 'Beginner',
    duration: '8 weeks',
    topics: ['SQL Fundamentals', 'Database Design', 'Complex Queries', 'Performance Optimization']
  },
  {
    _id: 'course-4',
    id: 4,
    name: 'Machine Learning with Python',
    description: 'Master machine learning algorithms and implementations. Build real-world ML models using scikit-learn and TensorFlow. Prerequisites: Linear Algebra, Data Analysis with Python.',
    level: 'Intermediate',
    duration: '8 weeks',
    topics: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Neural Networks']
  },
  {
    _id: 'course-5',
    id: 5,
    name: 'Deep Learning with Python',
    description: 'Deep dive into neural networks and deep learning. Implement CNNs, RNNs, and transformers using PyTorch. Prerequisites: Machine Learning with Python.',
    level: 'Advanced',
    duration: '8 weeks',
    topics: ['Neural Networks', 'CNN', 'RNN', 'Transformers', 'Deep Learning Projects']
  },
  {
    _id: 'course-6',
    id: 6,
    name: 'Natural Language Processing',
    description: 'Learn modern NLP techniques and build applications for text analysis, language understanding, and generation using transformers. Prerequisites: Deep Learning with Python.',
    level: 'Advanced',
    duration: '8 weeks',
    topics: ['Text Processing', 'Word Embeddings', 'Transformers', 'BERT & GPT', 'NLP Applications']
  },
  {
    _id: 'course-7',
    id: 7,
    name: 'Data Visualization with Tableau',
    description: 'Create impactful data visualizations using Tableau. Learn to build interactive dashboards and data stories.',
    level: 'Intermediate',
    duration: '8 weeks',
    topics: ['Tableau Basics', 'Chart Types', 'Interactive Dashboards', 'Data Storytelling']
  }
]

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C1D24] to-[#2C2D34] relative overflow-hidden">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-black/30 z-10" />
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Our Courses</h1>
          <p className="text-xl text-gray-300">Comprehensive courses taught by industry experts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseModule key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  )
}