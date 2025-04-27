import { config } from 'dotenv'
import dbConnect from '../app/lib/db'
import User from '../app/models/User'
import Course from '../app/models/Course'

config({ path: '.env.local' })

async function queryData() {
  try {
    await dbConnect()
    
    // 查询所有管理员
    const admins = await User.find({ role: 'admin' })
    console.log('\n管理员列表:')
    admins.forEach(admin => {
      console.log({
        id: admin._id,
        name: admin.name,
        email: admin.email
      })
    })

    // 查询所有课程
    const courses = await Course.find()
    console.log('\n课程列表:')
    courses.forEach(course => {
      console.log({
        id: course._id,
        title: course.title
      })
    })
  } catch (error) {
    console.error('查询失败:', error)
  }
}

queryData() 