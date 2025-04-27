"use client"

import { createContext, useContext } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

interface AuthContextType {
  user: any
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (email: string, password: string, name: string) => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()

  const login = async (email: string, password: string) => {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    if (result?.error) {
      throw new Error(result.error)
    }
  }

  const logout = () => {
    signOut()
  }

  const register = async (email: string, password: string, name: string) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || 'Registration failed')
    }
  }

  return (
    <AuthContext.Provider value={{
      user: session?.user,
      login,
      logout,
      register,
      isLoading: status === 'loading'
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}