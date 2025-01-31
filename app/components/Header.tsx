import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import Link from 'next/link'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">Logo</div>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-primary">首页</Link>
            <Link href="/courses" className="hover:text-primary">课程</Link>
            <Link href="/about" className="hover:text-primary">关于我们</Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {user.name}</span>
                <button
                  onClick={logout}
                  className="hover:text-primary"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="hover:text-primary">Sign In</Link>
                <Link href="/register" className="hover:text-primary">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
} 