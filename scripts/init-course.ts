import { config } from 'dotenv'
import path from 'path'
import dbConnect from '../app/lib/db'
import Course from '../app/models/Course'

// 加载环境变量
config({ path: path.resolve(process.cwd(), '.env.local') })

async function createCourse() {
  try {
    await dbConnect()
    
    const course = await Course.create({
      title: 'Linear Algebra',
      description: 'Introduction to Linear Algebra',
      instructor: 'Prof. Smith',
      duration: '12 weeks',
      level: 'Intermediate',
      topics: ['Vectors', 'Matrices', 'Linear Transformations']
    })

    console.log('课程创建成功:', {
      id: course._id,
      title: course.title
    })
  } catch (error) {
    console.error('创建课程失败:', error)
  }
}

createCourse() 