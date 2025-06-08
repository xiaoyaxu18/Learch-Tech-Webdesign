import React from 'react'
import { getDb } from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../api/auth/[...nextauth]/route';
import QuizForm from '../../../../components/QuizForm';
import { addQuestion } from '../../../../actions/addQuestion';
import Link from 'next/link'

type ExtendedSession = {
  user?: {
    role?: string;
  }
}

async function getQuiz(quizId: string) {
  const db = await getDb();
  const quiz = await db.collection('quizzes').findOne({ _id: new ObjectId(quizId) });

  if (!quiz) return null;

  return {
    ...quiz,
    _id: quiz._id.toString(),
    courseId: quiz.courseId?.toString?.() ?? quiz.courseId,
    createdAt: quiz.createdAt?.toString?.() ?? quiz.createdAt,
  };
}

export default async function QuizEditPage({ params }: { params: { quizId: string } }) {
  const quiz = await getQuiz(params.quizId);

  if (!quiz) {
    return <div className="p-4">Quiz not found.</div>;
  }

  const rawSession = await getServerSession(authOptions).catch((err) => {
    console.error('Failed to get session:', err);
    return null;
  });
  const session = rawSession as ExtendedSession;
  console.log('Session:', session); // Add this
  const isAdmin = session?.user?.role === 'admin';
  console.log('isAdmin:', isAdmin); // Add this

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-white">{quiz.title}</h1>
      <p className="text-white mb-6">{quiz.description}</p>
      <div className="mb-6 space-y-2 text-white">
        {quiz.dueDate && (
          <p><strong>Due Date:</strong> {new Date(quiz.dueDate).toLocaleString()}</p>
        )}
        {quiz.duration && (
          <p><strong>Time Limit:</strong> {quiz.duration} minutes</p>
        )}
        {quiz.points && (
          <p><strong>Total Points:</strong> {quiz.points}</p>
        )}
        {quiz.submissionType && (
          <p><strong>Submission Type:</strong> {quiz.submissionType}</p>
        )}
      </div>

      <div className="border p-4 rounded bg-gray-800">
        <h2 className="text-xl font-semibold mb-2 text-white">Questions</h2>
        {isAdmin && (
          quiz.questions?.length ? (
            <ul className="mb-4 text-white">
              {quiz.questions.map((q: any, idx: number) => (
                <div key={idx}>
                  <strong>{q.prompt}</strong>
                  <ul className="pl-4 list-disc">
                    {(Array.isArray(q.options) ? q.options : []).map((opt: string, i: number) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </ul>
          ) : (
            <p className="text-white mb-4">No questions added yet.</p>
          )
        )}

        {isAdmin && (
          <form action={addQuestion} className="space-y-4 mt-4">
            <input type="hidden" name="quizId" value={params.quizId} />

            <div className="border border-gray-700 p-4 rounded">
              <label className="block text-sm font-medium mb-1 text-white">Question Prompt</label>
              <input
                type="text"
                name="prompt"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
                placeholder="Enter your question here"
              />
            </div>

            <div className="border border-gray-700 p-4 rounded">
              <label className="block text-sm font-medium mb-1 text-white">Options</label>
              {[0, 1, 2, 3].map(i => (
                <input
                  key={i}
                  type="text"
                  name={`option-${i}`}
                  className="w-full px-3 py-2 mb-2 bg-gray-900 border border-gray-700 rounded text-white"
                  placeholder={`Option ${i + 1}`}
                />
              ))}
            </div>

            <div className="border border-gray-700 p-4 rounded">
              <label className="block text-sm font-medium mb-1 text-white">Correct Option Index</label>
              <input
                type="number"
                name="correctIndex"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
                placeholder="0"
                min={0}
                max={3}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Question
            </button>
          </form>
        )}

        {!isAdmin && quiz.questions && (
          <Link
            href={`/courses/${quiz.courseId}/quizzes/${quiz._id}/take`}
            className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4"
          >
            Take Quiz
          </Link>
        )}
      </div>
    </div>
  );
}