import { Course } from '../types/course'

// 创建一个课程模板生成函数
function createCourseTemplate(
  id: number,
  name: string,
  description: string,
  level: string,
  topics: string[],
  instructor: string
): Course {
  return {
    id,
    name,
    description,
    level,
    duration: '8 weeks',
    topics,
    progress: 0,
    instructor,
    startDate: '2024-02-01',
    content: {
      videos: [
        {
          id: 1,
          title: `Introduction to ${name}`,
          duration: '45:00',
          watched: false
        },
        {
          id: 2,
          title: 'Basic Concepts',
          duration: '50:00',
          watched: false
        },
        {
          id: 3,
          title: 'Advanced Topics',
          duration: '55:00',
          watched: false
        }
      ],
      quizzes: [
        {
          id: 1,
          title: 'Week 1 Quiz',
          questions: 10,
          completed: false,
          dueDate: '2024-02-08'
        },
        {
          id: 2,
          title: 'Week 2 Quiz',
          questions: 15,
          completed: false,
          dueDate: '2024-02-15'
        },
        {
          id: 3,
          title: 'Final Quiz',
          questions: 20,
          completed: false,
          dueDate: '2024-03-01'
        }
      ],
      assignments: [
        {
          id: 1,
          title: 'Basic Practice',
          dueDate: '2024-02-15',
          submitted: false,
          description: `Complete the ${name} basics worksheet`
        },
        {
          id: 2,
          title: 'Advanced Implementation',
          dueDate: '2024-02-22',
          submitted: false,
          description: 'Implement advanced concepts'
        },
        {
          id: 3,
          title: 'Final Project',
          dueDate: '2024-03-01',
          submitted: false,
          description: 'Complete the final course project'
        }
      ]
    }
  }
}

// 使用模板创建所有课程
export const courses: Course[] = [
  createCourseTemplate(
    1,
    'Linear Algebra',
    'Master the fundamentals of linear algebra essential for machine learning and data science.',
    'Beginner',
    ['Vectors & Matrices', 'Linear Transformations', 'Eigenvalues'],
    'Dr. Sarah Chen'
  ),
  createCourseTemplate(
    2,
    'Data Analysis with Python',
    'Learn data analysis using Python, pandas, and numpy. A foundational course required for machine learning and deep learning studies.',
    'Beginner',
    ['Python Basics', 'Pandas', 'NumPy', 'Data Visualization', 'Statistical Analysis'],
    'Dr. Michael Johnson'
  ),
  createCourseTemplate(
    3,
    'Database with SQL',
    'Master SQL and database management. Learn to design, query, and optimize relational databases.',
    'Beginner',
    ['SQL Fundamentals', 'Database Design', 'Complex Queries', 'Performance Optimization'],
    'Prof. Emily Wang'
  ),
  createCourseTemplate(
    4,
    'Machine Learning with Python',
    'Master machine learning algorithms and implementations. Build real-world ML models using scikit-learn and TensorFlow.',
    'Intermediate',
    ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Neural Networks'],
    'Dr. James Wilson'
  ),
  createCourseTemplate(
    5,
    'Deep Learning with Python',
    'Deep dive into neural networks and deep learning. Implement CNNs, RNNs, and transformers using PyTorch.',
    'Advanced',
    ['Neural Networks', 'CNN', 'RNN', 'Transformers', 'Deep Learning Projects'],
    'Dr. Lisa Anderson'
  ),
  createCourseTemplate(
    6,
    'Natural Language Processing',
    'Learn modern NLP techniques and build applications for text analysis, language understanding, and generation using transformers.',
    'Advanced',
    ['Text Processing', 'Word Embeddings', 'Transformers', 'BERT & GPT', 'NLP Applications'],
    'Dr. David Zhang'
  ),
  createCourseTemplate(
    7,
    'Data Visualization with Tableau',
    'Create impactful data visualizations using Tableau. Learn to build interactive dashboards and data stories.',
    'Intermediate',
    ['Tableau Basics', 'Chart Types', 'Interactive Dashboards', 'Data Storytelling'],
    'Prof. Rachel Lee'
  )
] 