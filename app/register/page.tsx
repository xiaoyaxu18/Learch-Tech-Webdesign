import RegisterForm from '../components/auth/RegisterForm'
import { AnimatedBackground } from '../components/AnimatedBackground'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C1D24] to-[#2C2D34] relative overflow-hidden">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-black/30 z-10" />
      <div className="relative z-20 min-h-screen flex items-center justify-center px-4">
        <RegisterForm />
      </div>
    </div>
  )
} 