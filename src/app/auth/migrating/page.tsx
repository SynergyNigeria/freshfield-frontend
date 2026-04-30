'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { authAPI } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'
import Eye from 'feather-icons-react/build/IconComponents/Eye'
import EyeOff from 'feather-icons-react/build/IconComponents/EyeOff'

type Step = 'email' | 'password'

export default function MigratingPage() {
  const router = useRouter()
  const { setToken, setUser } = useAuthStore()

  const [step, setStep] = useState<Step>('email')
  const [checking, setChecking] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const handleCheckEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setChecking(true)

    try {
      const response = await authAPI.migrationCheck({ email })
      if (response.data?.can_setup_password) {
        setStep('password')
        toast.success('Account found. Set your new password.')
      } else {
        toast.error('This account is not eligible for migration setup.')
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Unable to check account')
    } finally {
      setChecking(false)
    }
  }

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    setSubmitting(true)
    try {
      const response = await authAPI.migrationSetPassword({ email, password, password2 })
      setToken(response.data.token)
      setUser(response.data.user)
      toast.success('Migration complete! Welcome back.')
      router.push('/dashboard')
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Could not set password')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <style>{`
              .node { fill: #FFD700; opacity: 0.4; }
              .line { stroke: #FFD700; stroke-width: 1; opacity: 0.15; }
            `}</style>
          </defs>
          <rect width="1200" height="400" fill="#000000" />
          <line x1="50" y1="80" x2="200" y2="120" className="line"/>
          <line x1="200" y1="120" x2="350" y2="80" className="line"/>
          <line x1="350" y1="80" x2="450" y2="180" className="line"/>
          <line x1="450" y1="180" x2="600" y2="100" className="line"/>
          <line x1="600" y1="100" x2="750" y2="150" className="line"/>
          <line x1="750" y1="150" x2="900" y2="80" className="line"/>
          <line x1="900" y1="80" x2="1050" y2="180" className="line"/>
          <circle cx="50" cy="80" r="4" className="node"/>
          <circle cx="200" cy="120" r="4" className="node"/>
          <circle cx="350" cy="80" r="4" className="node"/>
          <circle cx="450" cy="180" r="4" className="node"/>
          <circle cx="600" cy="100" r="4" className="node"/>
          <circle cx="750" cy="150" r="4" className="node"/>
          <circle cx="900" cy="80" r="4" className="node"/>
          <circle cx="1050" cy="180" r="4" className="node"/>
        </svg>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="rounded-[20px] bg-black/40 p-8 space-y-6">
          <div className="text-center mb-4">
            <Image
              src="/logo.png"
              alt="Freshfield Logo"
              width={250}
              height={50}
              className="mx-auto"
              priority
            />
            <p className="text-slate-400 text-sm mt-3">Migrated account setup</p>
          </div>

          {step === 'email' ? (
            <form onSubmit={handleCheckEmail} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your old account email"
                  className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={checking}
                className="w-full bg-accent hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg transition-all disabled:opacity-50"
              >
                {checking ? 'Checking...' : 'Continue'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSetPassword} className="space-y-4">
              <div className="rounded-lg border border-accent/30 bg-accent/10 p-3 text-xs text-accent">
                Email: {email}
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-accent transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showPassword2 ? 'text' : 'password'}
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    required
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword2(!showPassword2)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-accent transition-colors"
                  >
                    {showPassword2 ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-accent hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg transition-all disabled:opacity-50"
              >
                {submitting ? 'Saving...' : 'Set Password & Sign In'}
              </button>
            </form>
          )}

          <Link
            href="/auth/login"
            className="w-full bg-transparent text-accent border border-accent/40 rounded-lg px-6 py-3 font-semibold text-center transition-all hover:bg-accent/10 hover:border-accent block"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}
