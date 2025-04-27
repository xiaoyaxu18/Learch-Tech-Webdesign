import mongoose from 'mongoose'

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '作业标题是必需的']
  },
  courseId: {
    type: String,
    required: [true, '课程ID是必需的']
  },
  description: {
    type: String,
    required: [true, '作业描述是必需的']
  },
  dueDate: {
    type: Date,
    required: [true, '截止日期是必需的']
  },
  points: {
    type: Number,
    required: [true, '分数是必需的'],
    default: 20
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Assignment = mongoose.models.Assignment || mongoose.model('Assignment', assignmentSchema)

export default Assignment 