import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDb } from '../../../../lib/mongodb'

export async function GET(request: Request, { params }: { params: { courseId: string } }) {
  try {
    const db = await getDb()

    let courseId: ObjectId

    // Check if the courseId in the URL is a valid ObjectId
    if (ObjectId.isValid(params.courseId)) {
      courseId = new ObjectId(params.courseId)
    } else {
      // If not a valid ObjectId, treat it as a courseNumber and look up the actual ObjectId
      const course = await db.collection('courses').findOne({ courseNumber: params.courseId })
      if (!course) {
        return new NextResponse('Course not found', { status: 404 })
      }
      courseId = course._id
    }

    const videos = await db.collection('videos')
      .find({ courseId })
      .toArray()

    return NextResponse.json(videos)
  } catch (error) {
    console.error('Error fetching videos:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { courseId: string } }) {
  try {
    const db = await getDb();
    const body = await request.json();

    // 检查必需字段
    const { title, url, key, uploadedBy } = body;
    if (!title || !url || !key || !uploadedBy) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const video = {
      title,
      url,
      key,
      uploadedBy,
      courseId: new ObjectId(params.courseId),
      createdAt: new Date()
    };

    await db.collection('videos').insertOne(video);

    return NextResponse.json({ success: true, video });
  } catch (error) {
    console.error('Error inserting video:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}