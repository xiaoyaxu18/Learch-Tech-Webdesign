import mongoose from 'mongoose'

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '考试标题是必需的']
  },
  courseId: {
    type: String,
    required: [true, '课程ID是必需的']
  },
  availableUntil: {
    type: Date,
    required: [true, '截止日期是必需的']
  },
  dueDate: {
    type: Date,
    required: [true, '提交期限是必需的']
  },
  points: {
    type: Number,
    required: [true, '分数是必需的']
  },
  questionCount: {
    type: Number,
    required: [true, '题目数量是必需的']
  },
  duration: {
    type: Number,
    required: [true, '考试时长是必需的（分钟）']
  },
  isAvailable: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Exam = mongoose.models.Exam || mongoose.model('Exam', examSchema)

export default Exam 