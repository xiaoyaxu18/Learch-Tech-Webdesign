'use server';

import { getDb } from '../lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';

export async function addQuestion(formData: FormData) {
  const db = await getDb();

  const quizId = formData.get('quizId') as string;
  const prompt = formData.get('prompt') as string;
  const options = [0, 1, 2, 3].map(i => formData.get(`option-${i}`) as string);
  const correctIndex = parseInt(formData.get('correctIndex') as string, 10);

  const question = {
    _id: new ObjectId(),
    prompt,
    options,
    correctIndex
  };

  await db.collection('quizzes').updateOne(
    { _id: new ObjectId(quizId) },
    { $push: { questions: question } }
  );

  revalidatePath(`/courses/[courseId]/quizzes/${quizId}`);
}
