import { config } from 'dotenv'
import path from 'path'

// 加载环境变量
const envPath = path.resolve(process.cwd(), '.env.local')
config({ path: envPath })

// 验证环境变量
console.log('环境变量检查:', {
  MONGODB_URI: process.env.MONGODB_URI ? '已设置' : '未设置',
  AWS_REGION: process.env.AWS_REGION,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET
})

import dbConnect from '../app/lib/db'
import Video from '../app/models/Video'

async function saveS3VideoMeta({
  title,
  courseId,
  uploaderId,
  s3Key,
  duration = '00:00'
}: {
  title: string
  courseId: string
  uploaderId: string
  s3Key: string
  duration?: string
}) {
  try {
    // 自动生成 S3 URL
    const s3Url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`
    
    await dbConnect()
    const video = await Video.create({
      title,
      courseId,
      url: s3Url,
      key: s3Key,
      duration,
      uploadedBy: uploaderId
    })
    console.log('视频元数据写入成功:', video)
    return video
  } catch (error) {
    console.error('写入失败:', error)
    throw error
  }
}

// ====== 使用示例 ======
saveS3VideoMeta({
  title: 'Video 1.1 Connect to Data_tableau',
  courseId: '65f2f1234567890abcdef123',   // 你的课程ID
  uploaderId: '65f2f1234567890abcdef456', // 管理员ID
  s3Key: 'course-videos/Video 1.1 Connect to Data_tableau.mp4' // S3 key
}).then(video => {
  console.log('写入成功，视频ID:', video._id)
  process.exit(0)
}).catch(error => {
  console.error('写入失败:', error)
  process.exit(1)
}) 