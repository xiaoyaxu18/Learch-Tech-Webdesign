'use client';

import { useState } from 'react';

interface Question {
  _id: string;
  prompt: string;
  options: string[];
  correctOptionIndex: number | number[]; // support single and multiple
}

interface QuizGraderProps {
  questions: Question[];
  quizId: string;
}

export default function QuizGrader({ questions, quizId }: QuizGraderProps) {
  const [userAnswers, setUserAnswers] = useState<Record<string, number | number[]>>({});
  const [score, setScore] = useState<number | null>(null);

  const handleChange = (questionId: string, value: number | number[], isMultiple: boolean) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: isMultiple ? [...(value as number[])] : value,
    }));
  };

  const handleCheckboxChange = (questionId: string, optionIndex: number) => {
    const prevAnswers = (userAnswers[questionId] as number[]) || [];
    const updated = prevAnswers.includes(optionIndex)
      ? prevAnswers.filter((v) => v !== optionIndex)
      : [...prevAnswers, optionIndex];
    handleChange(questionId, updated, true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/submit-answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: userAnswers, quizId }),
      });
      const data = await res.json();
      setScore(data.score);
    } catch (error) {
      console.error('Submission failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {questions.map((q, index) => {
        const isMultiple = Array.isArray(q.correctOptionIndex);
        return (
          <div key={q._id} className="p-4 border rounded bg-gray-800 text-white">
            <p className="font-semibold mb-2">{index + 1}. {q.prompt}</p>
            <div className="space-y-1">
              {q.options.map((opt, idx) => (
                <label key={idx} className="block">
                  <input
                    type={isMultiple ? 'checkbox' : 'radio'}
                    name={q._id}
                    value={idx}
                    checked={
                      isMultiple
                        ? (userAnswers[q._id] as number[])?.includes(idx)
                        : userAnswers[q._id] === idx
                    }
                    onChange={() =>
                      isMultiple
                        ? handleCheckboxChange(q._id, idx)
                        : handleChange(q._id, idx, false)
                    }
                    className="mr-2"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        );
      })}
      <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
        Submit Answers
      </button>
      {score !== null && (
        <p className="text-white font-semibold mt-4">Your score: {score} / {questions.length}</p>
      )}
    </form>
  );
}