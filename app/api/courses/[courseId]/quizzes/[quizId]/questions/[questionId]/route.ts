import { NextResponse } from 'next/server'
import { getDb } from '../../../../../../../lib/mongodb'
import { ObjectId } from 'mongodb'

// Edit a single question
export async function PATCH(
  req: Request,
  context: { params: { courseId: string, quizId: string, questionId: string } }
) {
  const params = await context.params;
  const db = await getDb();
  const body = await req.json();
  const { prompt, options, answer } = body;

  // Only update fields that are provided
  const updateFields: any = {};
  if (prompt !== undefined) updateFields["questions.$.prompt"] = prompt;
  if (options !== undefined) {
    if (!Array.isArray(options)) {
      return NextResponse.json({ error: 'Options must be an array' }, { status: 400 });
    }
    updateFields["questions.$.options"] = options;
  }
  if (answer !== undefined) updateFields["questions.$.answer"] = answer;

  console.log('PATCH filter:', {
    _id: new ObjectId(params.quizId),
    courseId: params.courseId,
    "questions._id": new ObjectId(params.questionId)
  });
  console.log('PATCH updateFields:', updateFields);

  const result = await db.collection('quizzes').updateOne(
    {
      _id: new ObjectId(params.quizId),
      courseId: params.courseId,
      "questions._id": new ObjectId(params.questionId)
    },
    { $set: updateFields }
  );

  if (result.modifiedCount === 0) {
    return NextResponse.json({ error: 'Update failed or no changes made' }, { status: 400 });
  }

  // Find and return the updated question
  const quiz = await db.collection('quizzes').findOne(
    { _id: new ObjectId(params.quizId), courseId: params.courseId },
    { projection: { questions: 1 } }
  );
  if (!quiz) {
    return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
  }
  const updatedQuestion = (quiz.questions as any[]).find(q => q._id.toString() === params.questionId);
  if (!updatedQuestion) {
    return NextResponse.json({ error: 'Question not found' }, { status: 404 });
  }
  return NextResponse.json(updatedQuestion);
}

// Delete a single question
export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string, quizId: string, questionId: string } }
) {
  const db = await getDb()

  const result = await db.collection('quizzes').updateOne(
    {
      _id: new ObjectId(params.quizId),
      courseId: params.courseId,
    },
    {
      $pull: {
        questions: { _id: new ObjectId(params.questionId) }
      }
    }
  )

  if (result.modifiedCount === 0) {
    return NextResponse.json({ error: 'Delete failed or question not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
