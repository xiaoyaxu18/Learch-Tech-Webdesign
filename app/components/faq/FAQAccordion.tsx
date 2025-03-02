"use client"

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItemProps {
  question: string
  answer: string
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-800">
      <button
        className="w-full py-6 flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-white">{question}</h3>
        <ChevronDown 
          className={`w-5 h-5 text-[#2493DF] transition-transform duration-200 
            ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-200 
          ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}
      >
        <p className="text-gray-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  )
} 