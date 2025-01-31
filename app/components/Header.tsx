import React from 'react'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">Logo</div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-primary">首页</a>
            <a href="#" className="hover:text-primary">课程</a>
            <a href="#" className="hover:text-primary">关于我们</a>
            <a href="#" className="hover:text-primary">联系我们</a>
          </div>
        </div>
      </nav>
    </header>
  )
} 