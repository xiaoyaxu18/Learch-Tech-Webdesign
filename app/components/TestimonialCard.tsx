import React from 'react'

interface TestimonialCardProps {
  name: string
  role: string
  content: string
  avatar?: string
}

export default function TestimonialCard({ name, role, content, avatar }: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <p className="text-gray-600 mb-4">{content}</p>
      <div className="flex items-center">
        {avatar && (
          <img 
            src={avatar} 
            alt={name} 
            className="w-12 h-12 rounded-full mr-4"
          />
        )}
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </div>
    </div>
  )
} 