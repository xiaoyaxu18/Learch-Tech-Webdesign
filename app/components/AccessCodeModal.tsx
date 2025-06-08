"use client"

import { useState } from 'react'

interface AccessCodeModalProps {
  isOpen: boolean
  onClose: () => void
  onVerify: (code: string) => void
}

export default function AccessCodeModal({ isOpen, onClose, onVerify }: AccessCodeModalProps) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/verify-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      })

      if (res.ok) {
        onVerify(code)
        onClose()
      } else {
        const data = await res.json()
        setError(data.error || 'Invalid access code')
      }
    } catch (error) {
      setError('Failed to verify access code')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1C1D24] rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-white mb-4">Enter Access Code</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Enter your access code"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#2493DF]"
              maxLength={8}
            />
            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !code}
              className="px-4 py-2 bg-[#2493DF] text-white rounded-lg hover:bg-[#1f7bc0] transition-colors disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 