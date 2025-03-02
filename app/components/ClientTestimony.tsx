"use client"

import { AnimatedBackground } from './AnimatedBackground'

export function ClientTestimony({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C1D24] to-[#2C2D34] relative overflow-hidden">
      <AnimatedBackground />
      {children}
    </div>
  )
} 