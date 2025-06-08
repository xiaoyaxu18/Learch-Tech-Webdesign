import mongoose from 'mongoose'
import ModuleModel from '../models/moduel'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error('环境变量 MONGODB_URI:', process.env.MONGODB_URI)
  throw new Error('请在 .env.local 文件中添加 MONGODB_URI')
}

let cached = global as any
if (!cached._mongooseConnection) {
  cached._mongooseConnection = { conn: null, promise: null }
}

async function dbConnect() {
  try {
    if (cached._mongooseConnection.conn) {
      console.log('使用缓存的数据库连接')
      return cached._mongooseConnection.conn
    }

    if (!cached._mongooseConnection.promise) {
      console.log('创建新的数据库连接...')
      console.log('MongoDB URI:', (MONGODB_URI || '').replace(/\/\/.*@/, '//***:***@'))
      
      const opts = {
        bufferCommands: false,
      }

      cached._mongooseConnection.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
        console.log('MongoDB 连接成功')
        return mongoose.connection.db
      })
    }

    cached._mongooseConnection.conn = await cached._mongooseConnection.promise
    return cached._mongooseConnection.conn
  } catch (e) {
    console.error('MongoDB 连接错误:', e)
    cached._mongooseConnection.promise = null
    throw e
  }
}

import { Types } from 'mongoose'
import CourseModel from '../models/Course' // 请确保你有 course model，路径根据你实际情况调整

export async function getCourseById(courseId: string) {
  await dbConnect()
  if (!Types.ObjectId.isValid(courseId)) return null
  const course = await CourseModel.findById(courseId).lean()
  return course
}

export async function getModulesByCourseId(courseId: string) {
  await dbConnect()
  if (!Types.ObjectId.isValid(courseId)) return []
  const modules = await ModuleModel.find({ courseId }).sort({ order: 1 }).lean()
  return modules
}

export default dbConnect