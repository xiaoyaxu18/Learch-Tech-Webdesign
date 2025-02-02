"use client"

import { useState } from 'react'
import { Button } from '../ui/button'

export default function DiscussionList() {
  const [discussions] = useState([
    {
      id: 1,
      title: 'How to implement a neural network from scratch?',
      author: 'John Doe',
      date: '2 hours ago',
      replies: 12,
      views: 234,
      tags: ['Neural Networks', 'Python', 'Tutorial']
    },
    {
      id: 2,
      title: 'Best practices for data preprocessing in machine learning',
      author: 'Jane Smith',
      date: '5 hours ago',
      replies: 8,
      views: 156,
      tags: ['Data Preprocessing', 'Machine Learning', 'Best Practices']
    },
    // 添加更多讨论...
  ])

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div className="space-x-2">
          <Button className="bg-[#2493DF]">Latest</Button>
          <Button variant="ghost" className="text-white">Popular</Button>
          <Button variant="ghost" className="text-white">Unanswered</Button>
        </div>
        <Button className="bg-[#2493DF]">Start Discussion</Button>
      </div>

      {discussions.map((discussion) => (
        <div
          key={discussion.id}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold mb-2 hover:text-[#2493DF] cursor-pointer">
                {discussion.title}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>by {discussion.author}</span>
                <span>{discussion.date}</span>
                <span>{discussion.replies} replies</span>
                <span>{discussion.views} views</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {discussion.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
} 