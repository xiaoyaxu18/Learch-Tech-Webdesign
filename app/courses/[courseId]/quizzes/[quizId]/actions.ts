'use server';

import getDb from '../../../../lib/db';
// import { revalidatePath } from 'next/cache'; // 如果需要页面刷新可以用

export async function addQuestion(formData: FormData) {
  const db = await getDb();
  const quizId = formData.get('quizId') as string;
  const question = formData.get('question') as string;
  const options = formData.getAll('options'); // 假设你用多个 input name="options"
  const answer = formData.get('answer') as string;

  // 这里假设你有 quizzes 集合，每个 quiz 里有 questions 数组
  await db.collection('quizzes').updateOne(
    { _id: quizId },
    {
      $push: {
        questions: {
          question,
          options,
          answer,
        },
      },
    }
  );

  // 如果需要页面刷新，可以加上
  // revalidatePath(`/courses/${courseId}/quizzes/${quizId}`);

  return { success: true };
}
