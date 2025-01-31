import React from 'react'
import TestimonialCard from './TestimonialCard'

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "张三",
      role: "学生",
      content: "这个平台的课程质量非常高，老师们都很专业。",
      avatar: "/avatars/user1.jpg"
    },
    {
      name: "李四",
      role: "工程师",
      content: "通过这里的课程，我成功转行成为了一名前端工程师。",
      avatar: "/avatars/user2.jpg"
    },
    // 可以添加更多评价
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">学员评价</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
} 