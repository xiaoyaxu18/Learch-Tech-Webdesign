import mongoose from 'mongoose'

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Quiz title is required']
  },
  courseId: {
    type: String,
    required: [true, 'Course ID is required']
  },
  availableUntil: {
    type: Date,
    required: [true, 'Available until date is required']
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  },
  points: {
    type: Number,
    required: [true, 'Total points are required']
  },
  questionCount: {
    type: Number,
    required: [true, 'Number of questions is required']
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  questions: {
    type: [Object],
    required: [true, 'Questions are required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema)

export default Quiz 