'use client'

import { SessionProvider } from 'next-auth/react'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <div className="min-h-screen bg-[#1C1D24]">
          <Header />
          <main className="pt-24">
            {children}
          </main>
        </div>
      </AuthProvider>
    </SessionProvider>
  )
} 