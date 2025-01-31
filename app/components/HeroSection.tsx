import React from 'react'
import { AnimatedBackground } from './AnimatedBackground'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      <AnimatedBackground />
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-6">欢迎来到我们的平台</h1>
          <p className="text-xl mb-8">发现优质的在线课程，开启你的学习之旅</p>
          <button className="bg-primary text-white px-8 py-3 rounded-lg">
            立即开始
          </button>
        </div>
      </div>
    </section>
  )
} 