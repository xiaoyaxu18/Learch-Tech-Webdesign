"use client"

import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import Link from 'next/link'
import { Button } from './ui/button'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1C1D24]/80 backdrop-blur-sm border-b border-gray-800">
      <div className="flex items-center justify-between px-12 py-6">
        <div className="flex items-center gap-4">
          <svg className="w-12 h-12 text-[#2493DF]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <Link href="/" className="text-white text-2xl font-semibold">
            Silicon Valley AI Institute
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-12 text-gray-300">
          <Link href="/" className="hover:text-[#2493DF] transition-colors duration-200 text-lg">
            Home
          </Link>
          <Link href="/courses" className="hover:text-[#2493DF] transition-colors duration-200 text-lg">
            Courses
          </Link>
          <Link href="/teams" className="hover:text-[#2493DF] transition-colors duration-200 text-lg">
            Teams
          </Link>
          <Link href="/testimony" className="hover:text-[#2493DF] transition-colors duration-200 text-lg">
            Testimony
          </Link>
          <Link href="/discuss" className="hover:text-[#2493DF] transition-colors duration-200 text-lg">
            Discuss
          </Link>
          <Link href="/pricing" className="hover:text-[#2493DF] transition-colors duration-200 text-lg">
            Pricing
          </Link>
          <Link href="/faq" className="hover:text-[#2493DF] transition-colors duration-200 text-lg">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-white">{user.name}</span>
              <Button 
                variant="ghost" 
                className="text-white hover:text-white/90"
                onClick={() => logout()}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-white hover:text-white/90 text-lg">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-[#2493DF] hover:bg-[#2493DF]/90 text-lg px-8">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
} 