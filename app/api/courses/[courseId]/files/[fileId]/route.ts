import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'

const connectToDB = async () => {
  if (mongoose.connection.readyState >= 1) return
  await mongoose.connect(process.env.MONGODB_URI as string)
}

// 内嵌定义 File 模型
const fileSchema = new mongoose.Schema({
  courseId: String,
  fileName: String,
  url: String,
  uploadedAt: Date
})

const File = mongoose.models.File || mongoose.model('File', fileSchema)

export async function DELETE(req: NextRequest, { params }: { params: { courseId: string, fileId: string } }) {
  const { fileId } = params

  try {
    await connectToDB()
    const deleted = await File.deleteOne({ _id: fileId })

    if (deleted.deletedCount === 0) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DELETE error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}