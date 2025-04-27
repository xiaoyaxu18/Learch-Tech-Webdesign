import { config } from 'dotenv'
import path from 'path'

// 首先加载环境变量
const envPath = path.resolve(process.cwd(), '.env.local')
console.log('加载环境变量文件:', envPath)
config({ path: envPath })

// 然后导入其他依赖
import dbConnect from '../app/lib/db'
import Video from '../app/models/Video'

async function createTestVideo() {
  try {
    console.log('连接数据库...')
    await dbConnect()
    
    console.log('创建测试视频记录...')
    const video = await Video.create({
      title: '测试视频',
      courseId: '65f2f1234567890abcdef123', // 使用一个测试课程ID
      url: 'https://svai-course-videos.s3.us-east-1.amazonaws.com/test-video.mp4',
      key: 'course-videos/test-video.mp4',
      duration: '10:00',
      uploadedBy: '65f2f1234567890abcdef456' // 使用一个测试用户ID
    })

    console.log('测试视频创建成功:', {
      id: video._id,
      title: video.title,
      url: video.url
    })
  } catch (error) {
    console.error('创建测试视频失败:', error)
    if (error instanceof Error) {
      console.error('错误详情:', error.message)
      console.error('错误堆栈:', error.stack)
    }
  }
}

createTestVideo().catch(error => {
  console.error('未捕获的错误:', error)
  process.exit(1)
}) 