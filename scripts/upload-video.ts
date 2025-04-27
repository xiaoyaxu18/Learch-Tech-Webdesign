import { config } from 'dotenv'
import path from 'path'
import AWS from 'aws-sdk'

// 首先加载环境变量
const envPath = path.resolve(process.cwd(), '.env.local')
console.log('加载环境变量文件:', envPath)
config({ path: envPath })

// 验证环境变量
console.log('环境变量检查:', {
  MONGODB_URI: process.env.MONGODB_URI ? '已设置' : '未设置',
  AWS_REGION: process.env.AWS_REGION,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ? '已设置' : '未设置',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ? '已设置' : '未设置'
})

// 然后导入其他依赖
import fs from 'fs'
import dbConnect from '../app/lib/db'
import Video from '../app/models/Video'

// 初始化 S3 客户端
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

async function uploadVideo(
  filePath: string,
  title: string,
  courseId: string,
  uploaderId: string
) {
  try {
    console.log('开始上传视频...')
    console.log('参数:', { filePath, title, courseId, uploaderId })
    
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      throw new Error(`文件不存在: ${filePath}`)
    }

    // 读取视频文件
    const fileContent = fs.readFileSync(filePath)
    const fileName = path.basename(filePath)
    const fileKey = `course-videos/${Date.now()}-${fileName}`

    console.log('正在上传到 S3...')
    console.log('Bucket:', process.env.AWS_S3_BUCKET)
    console.log('Region:', process.env.AWS_REGION)
    
    // 上传到 S3
    const params = {
      Bucket: process.env.AWS_S3_BUCKET as string,
      Key: fileKey,
      Body: fileContent,
      ContentType: 'video/mp4',
    }

    const data = await s3.upload(params).promise()
    console.log(`File uploaded successfully. ${data.Location}`)

    // 修改 URL 生成方式
    const videoUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`
    console.log('S3 上传成功')

    console.log('连接数据库...')
    await dbConnect()

    console.log('创建视频记录...')
    console.log('视频数据:', {
      title,
      courseId,
      url: videoUrl,
      key: fileKey,
      uploadedBy: uploaderId
    })

    const video = await Video.create({
      title,
      courseId,
      url: videoUrl,
      key: fileKey,
      duration: '00:00',
      uploadedBy: uploaderId
    })

    console.log('视频记录创建成功:', video)

    // 验证视频记录是否真的创建成功
    const savedVideo = await Video.findById(video._id)
    if (!savedVideo) {
      throw new Error('视频记录创建后无法查询到')
    }

    console.log('视频上传完全成功')
    return video

  } catch (error) {
    console.error('上传失败:', error)
    if (error instanceof Error) {
      console.error('错误详情:', error.message)
      console.error('错误堆栈:', error.stack)
      if ('$metadata' in error) {
        console.error('S3 错误元数据:', (error as any).$metadata)
      }
    }
    throw error // 重新抛出错误以便外部捕获
  }
}

// 使用示例
uploadVideo(
  '/Users/xiaoya/Documents/Projects/test.mp4',
  'Linear Algebra Lecture 1',
  '65f2f1234567890abcdef123',  // 从数据库中获取的课程ID
  '65f2f1234567890abcdef456'   // 从数据库中获取的管理员ID
).then(video => {
  console.log('上传成功，视频ID:', video._id)
  process.exit(0)
}).catch(error => {
  console.error('上传失败:', error)
  process.exit(1)
}) 