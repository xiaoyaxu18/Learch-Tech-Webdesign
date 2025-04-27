import { config } from 'dotenv'
import path from 'path'
import dbConnect from '../app/lib/db'
import User from '../app/models/User'

// 加载环境变量，指定完整路径
config({ path: path.resolve(process.cwd(), '.env.local') })

async function createAdmin() {
  try {
    await dbConnect()
    
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@svai.com',
      password: 'admin123456',  // 这个密码会被自动加密
      role: 'admin'
    })

    console.log('管理员创建成功:', {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    })
  } catch (error) {
    console.error('创建管理员失败:', error)
  }
}

// 确保数据库连接成功后再执行
createAdmin().catch(console.error) 