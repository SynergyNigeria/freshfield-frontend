'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Mail } from 'feather-icons-react'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: Connect to your password reset API endpoint
      // const response = await authAPI.forgotPassword({ email })
      
      // For now, simulate success
      setTimeout(() => {
        toast.success('Check your email for password reset instructions!')
        setSubmitted(true)
        setLoading(false)
      }, 1000)
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to send reset email')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background SVG */}
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
          <line x1="1050" y1="180" x2="1150" y2="120" className="line"/>
          
          <line x1="50" y1="80" x2="100" y2="220" className="line"/>
          <line x1="100" y1="220" x2="200" y2="280" className="line"/>
          <line x1="200" y1="280" x2="350" y2="250" className="line"/>
          <line x1="350" y1="250" x2="500" y2="320" className="line"/>
          <line x1="500" y1="320" x2="650" y2="280" className="line"/>
          <line x1="650" y1="280" x2="800" y2="350" className="line"/>
          <line x1="800" y1="350" x2="950" y2="300" className="line"/>
          <line x1="950" y1="300" x2="1100" y2="350" className="line"/>
          
          <line x1="200" y1="120" x2="100" y2="220" className="line"/>
          <line x1="350" y1="80" x2="350" y2="250" className="line"/>
          <line x1="450" y1="180" x2="500" y2="320" className="line"/>
          <line x1="600" y1="100" x2="650" y2="280" className="line"/>
          <line x1="750" y1="150" x2="800" y2="350" className="line"/>
          <line x1="900" y1="80" x2="950" y2="300" className="line"/>
          
          <circle cx="50" cy="80" r="4" className="node"/>
          <circle cx="200" cy="120" r="4" className="node"/>
          <circle cx="350" cy="80" r="4" className="node"/>
          <circle cx="450" cy="180" r="4" className="node"/>
          <circle cx="600" cy="100" r="4" className="node"/>
          <circle cx="750" cy="150" r="4" className="node"/>
          <circle cx="900" cy="80" r="4" className="node"/>
          <circle cx="1050" cy="180" r="4" className="node"/>
          <circle cx="1150" cy="120" r="4" className="node"/>
          
          <circle cx="100" cy="220" r="4" className="node"/>
          <circle cx="200" cy="280" r="4" className="node"/>
          <circle cx="350" cy="250" r="4" className="node"/>
          <circle cx="500" cy="320" r="4" className="node"/>
          <circle cx="650" cy="280" r="4" className="node"/>
          <circle cx="800" cy="350" r="4" className="node"/>
          <circle cx="950" cy="300" r="4" className="node"/>
          <circle cx="1100" cy="350" r="4" className="node"/>
        </svg>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Back Link */}
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 text-accent hover:text-yellow-400 transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Login</span>
        </Link>

        {/* Card */}
        <div className="rounded-[20px] bg-black/40 p-8 space-y-6">
          {!submitted ? (
            <>
              {/* Logo Header */}
              <div className="text-center mb-4">
                <Image
                  src="/logo.png"
                  alt="Freshfield Logo"
                  width={40}
                  height={40}
                  className="mx-auto"
                  priority
                />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-6"
                >
                  {loading ? 'Sending...' : (
                    <>
                      <span>Send Reset Link</span>
                      <Mail size={18} />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black/40 text-slate-400">Or</span>
                </div>
              </div>

              {/* Sign Up Link */}
              <Link
                href="/auth/register"
                className="w-full bg-transparent text-accent border border-accent/40 rounded-lg px-6 py-3 font-semibold text-center transition-all hover:bg-accent/10 hover:border-accent"
              >
                Create New Account
              </Link>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center space-y-4">
                <Image
                  src="/logo.png"
                  alt="Freshfield Logo"
                  width={40}
                  height={40}
                  className="mx-auto"
                  priority
                />
                <h2 className="text-2xl font-bold text-white mt-4">Check Your Email</h2>
                <p className="text-slate-400">
                  We've sent a password reset link to <span className="text-accent font-semibold">{email}</span>
                </p>
                <p className="text-sm text-slate-500 mt-4">
                  Didn't receive the email? Check your spam folder or try again.
                </p>

                <button
                  onClick={() => {
                    setEmail('')
                    setSubmitted(false)
                  }}
                  className="w-full bg-transparent text-accent border border-accent/40 rounded-lg px-6 py-3 font-semibold transition-all hover:bg-accent/10 hover:border-accent mt-6"
                >
                  Try Another Email
                </button>

                <Link
                  href="/auth/login"
                  className="w-full bg-accent hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg transition-all flex items-center justify-center"
                >
                  Back to Login
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Footer Note */}
        <p className="text-center text-slate-500 text-xs mt-6">
          A password reset link will be sent to your email address.
        </p>
      </div>
    </div>
  )
}
