import { config } from 'dotenv'
config({ path: '.env.local' })
console.log('🧪 Loaded MONGODB_URI:', process.env.MONGODB_URI)
import { ObjectId } from 'mongodb'
import clientPromise from '../app/lib/mongodb'


async function run() {
  const [courseName, instructor, videoFilename] = process.argv.slice(2)

  if (!courseName || !instructor || !videoFilename) {
    console.error('❌ 用法: tsx scripts/insertCourseWithVideo.ts "Course Name" "Instructor" "video.mp4"')
    process.exit(1)
  }

  const client = await clientPromise
  const db = client.db()

  const courseId = new ObjectId()

  // Insert course
  await db.collection('courses').insertOne({
    _id: courseId,
    name: courseName,
    description: 'This is a demo course inserted with an associated video.',
    instructor,
    level: 'Beginner',
    duration: '8 weeks',
    topics: ['Sample Topic 1', 'Sample Topic 2'],
    courseNumber: Math.floor(Math.random() * 10000).toString(),
    startDate: new Date(),
    createdAt: new Date()
  })

  // Insert video
  const s3Key = `course-videos/${Date.now()}-${videoFilename}`
  const s3Url = `https://your-s3-bucket.s3.amazonaws.com/${s3Key}`

  await db.collection('videos').insertOne({
    title: `${courseName} Intro`,
    courseId,
    url: s3Url,
    key: s3Key,
    duration: '00:00',
    watched: false,
    uploadedAt: new Date()
  })

  console.log(`✅ 成功插入课程 "${courseName}"，ID: ${courseId}`)
  console.log(`✅ 并附加视频 "${videoFilename}"，可在页面中查看`)
  process.exit(0)
}

run()
