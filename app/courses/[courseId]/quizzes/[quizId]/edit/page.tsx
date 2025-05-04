
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditQuizPage() {
  const router = useRouter();
  const { courseId, quizId } = useParams();
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    dueDate: '',
    timeLimit: '',
    totalPoints: '',
    submissionType: '',
  });

  useEffect(() => {
    async function fetchQuiz() {
      const res = await fetch(`/api/courses/${courseId}/quizzes/${quizId}`);
      const data = await res.json();
      setQuizData({
        title: data.title || '',
        description: data.description || '',
        dueDate: data.dueDate || '',
        timeLimit: data.timeLimit || '',
        totalPoints: data.totalPoints || '',
        submissionType: data.submissionType || '',
      });
    }
    fetchQuiz();
  }, [courseId, quizId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/courses/${courseId}/quizzes/${quizId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quizData),
    });

    if (res.ok) {
      router.push(`/courses/${courseId}/quizzes`);
    } else {
      alert('Failed to update quiz');
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-4">Edit Quiz</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={quizData.title}
          onChange={e => setQuizData({ ...quizData, title: e.target.value })}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <textarea
          placeholder="Description"
          value={quizData.description}
          onChange={e => setQuizData({ ...quizData, description: e.target.value })}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <input
          type="datetime-local"
          value={quizData.dueDate}
          onChange={e => setQuizData({ ...quizData, dueDate: e.target.value })}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <input
          type="number"
          placeholder="Time Limit (minutes)"
          value={quizData.timeLimit}
          onChange={e => setQuizData({ ...quizData, timeLimit: e.target.value })}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <input
          type="number"
          placeholder="Total Points"
          value={quizData.totalPoints}
          onChange={e => setQuizData({ ...quizData, totalPoints: e.target.value })}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <select
          value={quizData.submissionType}
          onChange={e => setQuizData({ ...quizData, submissionType: e.target.value })}
          className="w-full p-2 rounded bg-gray-800 text-white"
        >
          <option value="">Select Submission Type</option>
          <option value="online">Online</option>
          <option value="upload">Upload</option>
          <option value="paper">Paper</option>
        </select>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}