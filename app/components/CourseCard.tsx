import React from 'react'

interface CourseCardProps {
  title: string
  description: string
  image?: string
  price?: string
}

export default function CourseCard({ title, description, image, price }: CourseCardProps) {
  return (
    <div className="rounded-lg shadow-lg overflow-hidden">
      {image && (
        <div className="relative h-48">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
        {price && <p className="mt-4 font-bold">{price}</p>}
      </div>
    </div>
  )
} 