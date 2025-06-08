'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Question {
  id: string;
  prompt: string;
  options: string[];
  answer?: number;
}

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
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editModal, setEditModal] = useState<{ open: boolean; question: Question | null }>({ open: false, question: null });

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
      setQuestions(
        (data.questions || []).map((q: any) => ({
          id: q._id || q.id,
          prompt: q.prompt,
          options: q.options || [],
          answer: q.answer,
        }))
      );
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

  async function handleDeleteQuestion(questionId: string) {
    const confirmed = window.confirm('Are you sure you want to delete this question?');
    if (!confirmed) return;

    const res = await fetch(`/api/courses/${courseId}/quizzes/${quizId}/questions/${questionId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setQuestions(prev => prev.filter(q => q.id !== questionId));
    } else {
      alert('Failed to delete question');
    }
  }

  async function handleEditQuestion(questionId: string, updatedPrompt: string, updatedOptions: string[]) {
    const res = await fetch(`/api/courses/${courseId}/quizzes/${quizId}/questions/${questionId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: updatedPrompt, options: updatedOptions }),
    });

    if (res.ok) {
      const updated = await res.json();
      setQuestions(prev =>
        prev.map(q => (q.id === questionId ? { ...q, prompt: updated.prompt, options: updated.options } : q))
      );
    } else {
      alert('Failed to update question');
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
      <h2 className="text-xl font-semibold text-white mt-8">Questions</h2>
      <ul className="space-y-4 mt-2">
        {questions.map(q => (
          <li key={q.id} className="bg-gray-800 p-4 rounded text-white">
            <p>Prompt: {q.prompt}</p>
            <ul className="ml-4">
              {q.options.map((opt, idx) => (
                <li key={idx}>Option {idx + 1}: {opt}</li>
              ))}
            </ul>
            <button
              onClick={() => setEditModal({ open: true, question: { ...q } })}
              className="mr-2 text-blue-400 underline"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteQuestion(q.id)}
              className="text-red-400 underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {/* 编辑题目弹窗 */}
      {editModal.open && editModal.question && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-2 text-black">edit question</h3>
            <input
              className="w-full border p-2 mb-2 text-black"
              value={editModal.question.prompt}
              onChange={e =>
                setEditModal(modal => ({
                  ...modal,
                  question: { ...modal.question!, prompt: e.target.value }
                }))
              }
            />
            {editModal.question.options.map((opt, idx) => (
              <input
                key={idx}
                className="w-full border p-2 mb-2 text-black"
                value={opt}
                onChange={e => {
                  const newOptions = [...editModal.question!.options];
                  newOptions[idx] = e.target.value;
                  setEditModal(modal => ({
                    ...modal,
                    question: { ...modal.question!, options: newOptions }
                  }));
                }}
                placeholder={`Option ${idx + 1}`}
              />
            ))}
            <div className="flex justify-end gap-2 mt-2">
              <button
                className="px-3 py-1 bg-gray-300 rounded"
                onClick={() => setEditModal({ open: false, question: null })}
              >
                cancel
              </button>
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded"
                onClick={async () => {
                  await handleEditQuestion(
                    editModal.question!.id,
                    editModal.question!.prompt,
                    editModal.question!.options
                  );
                  setEditModal({ open: false, question: null });
                }}
              >
                save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}