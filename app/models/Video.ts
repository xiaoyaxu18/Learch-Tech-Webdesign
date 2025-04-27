import mongoose from 'mongoose'

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '视频标题是必需的']
  },
  courseId: {
    type: String,
    required: [true, '课程ID是必需的']
  },
  url: {
    type: String,
    required: [true, '视频URL是必需的']
  },
  key: {
    type: String,
    required: [true, '视频在S3中的key是必需的']
  },
  duration: {
    type: String,
    default: '00:00'
  },
  uploadedBy: {
    type: String,
    required: [true, '上传者ID是必需的']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Video = mongoose.models.Video || mongoose.model('Video', videoSchema)

export default Video 