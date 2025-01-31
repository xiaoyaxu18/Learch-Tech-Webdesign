"use client"

import { useState } from 'react'
import { useAuth } from '@/app/contexts/AuthContext'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
    } catch (err: any) {
      setError(err.message || 'Login failed, please check your email and password')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Sign In</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2493DF]"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2493DF]"
            required
          />
        </div>
        <Button className="w-full bg-[#2493DF]" type="submit">
          Sign In
        </Button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Don't have an account?{' '}
        <Link href="/register" className="text-[#2493DF] hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  )
} 