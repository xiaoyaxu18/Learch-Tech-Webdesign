import mongoose from 'mongoose'

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '测验标题是必需的']
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
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema)

export default Quiz 