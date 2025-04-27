import { config } from 'dotenv'
import path from 'path'
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import dbConnect from '../app/lib/db'
import Video from '../app/models/Video'

// 加载环境变量
config({ path: path.resolve(process.cwd(), '.env.local') })

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
})

async function syncVideos() {
  try {
    console.log('连接数据库...')
    await dbConnect()

    console.log('获取 S3 视频列表...')
    const s3Response = await s3Client.send(new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET!,
      Prefix: 'course-videos/'
    }))

    if (!s3Response.Contents) {
      console.log('S3 中没有视频文件')
      return
    }

    console.log(`找到 ${s3Response.Contents.length} 个 S3 文件`)

    for (const object of s3Response.Contents) {
      const key = object.Key!
      const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
      
      // 检查数据库中是否已有该视频记录
      const existingVideo = await Video.findOne({ key })
      
      if (!existingVideo) {
        console.log(`为 S3 文件创建新的数据库记录: ${key}`)
        await Video.create({
          title: `未命名视频 (${path.basename(key)})`,
          courseId: '65f2f1234567890abcdef123', // 默认课程ID
          url,
          key,
          duration: '00:00',
          uploadedBy: '65f2f1234567890abcdef456' // 默认上传者ID
        })
      } else {
        console.log(`数据库中已存在记录: ${key}`)
      }
    }

    console.log('同步完成')
  } catch (error) {
    console.error('同步失败:', error)
  }
}

syncVideos().catch(console.error) 