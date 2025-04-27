import { config } from 'dotenv'
import path from 'path'

// 首先加载环境变量
const envPath = path.resolve(process.cwd(), '.env.local')
console.log('加载环境变量文件:', envPath)
config({ path: envPath })

// 验证环境变量
console.log('环境变量检查:', {
  MONGODB_URI: process.env.MONGODB_URI ? '已设置' : '未设置',
})

// 然后导入其他依赖
import dbConnect from '../app/lib/db'
import Video from '../app/models/Video'

async function listVideos() {
  try {
    console.log('连接数据库...')
    await dbConnect()
    
    console.log('查询视频列表...')
    const videos = await Video.find().sort({ createdAt: -1 })
    
    if (videos.length === 0) {
      console.log('\n暂无视频记录')
      return
    }
    
    console.log('\n视频列表:')
    videos.forEach(video => {
      console.log('\n-------------------')
      console.log({
        id: video._id,
        title: video.title,
        courseId: video.courseId,
        url: video.url,
        key: video.key,
        uploadedBy: video.uploadedBy,
        uploadedAt: video.createdAt
      })
    })
  } catch (error) {
    console.error('查询视频失败:', error)
    if (error instanceof Error) {
      console.error('错误详情:', error.message)
      console.error('错误堆栈:', error.stack)
    }
  }
}

// 添加错误处理
listVideos().catch(error => {
  console.error('未捕获的错误:', error)
  process.exit(1)
}) 