'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import LoginForm from '../components/auth/LoginForm'
import { AnimatedBackground } from '../components/AnimatedBackground'

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/')
    }
  }, [status])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C1D24] to-[#2C2D34] relative overflow-hidden">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-black/30 z-10" />
      <div className="relative z-20 min-h-screen flex items-center justify-center px-4">
        <LoginForm />
      </div>
    </div>
  )
}