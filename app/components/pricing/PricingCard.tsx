"use client"

import { Check } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

interface PricingCardProps {
  plan: {
    id: string
    name: string
    price: number
    description: string
    features: string[]
    recommended?: boolean
    courses: string[]
  }
}

export function PricingCard({ plan }: PricingCardProps) {
  const router = useRouter()

  return (
    <div className={`
      relative bg-white/5 backdrop-blur-sm rounded-xl p-8 
      border transition-all duration-300
      ${plan.recommended 
        ? 'border-[#2493DF] shadow-lg shadow-[#2493DF]/10' 
        : 'border-white/10 hover:border-[#2493DF]/30'}
    `}>
      {plan.recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-[#2493DF] text-white px-4 py-1 rounded-full text-sm">
            Recommended
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
        <p className="text-gray-400 mb-4">{plan.description}</p>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-4xl font-bold text-white">${plan.price}</span>
          <span className="text-gray-400">/course</span>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3 text-gray-300">
            <Check className="w-5 h-5 text-[#2493DF]" />
            {feature}
          </div>
        ))}
      </div>

      <div className="space-y-3 mb-8">
        <div className="text-sm text-gray-400 mb-2">Included Courses:</div>
        {plan.courses.map((course, index) => (
          <div 
            key={index}
            className="bg-white/5 text-gray-300 px-3 py-2 rounded-lg text-sm"
          >
            {course}
          </div>
        ))}
      </div>

      <Button 
        className="w-full bg-[#2493DF] hover:bg-[#2493DF]/90"
        onClick={() => router.push('/register')}
      >
        Start Learning
      </Button>
    </div>
  )
} 