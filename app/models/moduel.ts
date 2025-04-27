import mongoose, { Schema, model, models } from 'mongoose'

const moduleSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  videoUrl: String,
  materialUrl: String,
  order: Number,
  content: {
    overview: {
      description: String,
      readings: [String]
    },
    videos: [
      {
        id: Number,
        title: String,
        duration: String,
        watched: Boolean
      }
    ],
    quiz: {
      id: Number,
      title: String,
      questions: Number,
      completed: Boolean,
      available: Boolean
    },
    assignment: {
      id: Number,
      title: String,
      dueDate: String,
      completed: Boolean,
      available: Boolean
    }
  }
})

const ModuleModel = models.Module || model('Module', moduleSchema)
export default ModuleModel