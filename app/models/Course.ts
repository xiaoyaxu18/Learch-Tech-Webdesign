import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '课程标题是必需的']
  },
  description: {
    type: String,
    required: [true, '课程描述是必需的']
  },
  instructor: {
    type: String,
    required: [true, '讲师姓名是必需的']
  },
  duration: String,
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Intermediate'
  },
  topics: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema)

export default Course 