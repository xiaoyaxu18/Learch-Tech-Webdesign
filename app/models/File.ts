import mongoose, { Schema, model, models } from 'mongoose';

const FileSchema = new Schema({
  courseId: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const File = models.File || model('File', FileSchema);
export default File;
