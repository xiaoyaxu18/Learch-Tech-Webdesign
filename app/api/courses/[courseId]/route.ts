import { NextRequest, NextResponse } from 'next/server'
import { getCourseById } from '@/app/lib/db'

export async function GET(req: NextRequest, { params }: { params: { courseId: string } }) {
  const { courseId } = params
  const course = await getCourseById(courseId)
  if (!course) {
    return NextResponse.json({ message: 'Course not found' }, { status: 404 })
  }
  return NextResponse.json(course)
}
