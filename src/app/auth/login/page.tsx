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

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { setToken, setUser } = useAuthStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await authAPI.login(formData)
      setToken(response.data.token)
      setUser(response.data.user)
      toast.success('Login successful! 🎉')
      router.push('/dashboard')
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Login failed')
    } finally {
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
        {/* Card */}
        <div className="rounded-[20px] bg-black/40 p-8 space-y-6">
          {/* Logo Header */}
          <div className="text-center mb-4">
            <Image
              src="/logo.png"
              alt="Freshfield Logo"
              width={250}
              height={50}
              className="mx-auto"
              priority
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
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
              <Link
                href="/auth/forgot-password"
                className="text-xs text-accent hover:text-yellow-400 transition-colors mt-2 inline-block"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-6"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <Link
              href="/auth/migrating"
              className="w-full bg-transparent text-accent border border-accent/40 rounded-lg px-6 py-3 font-semibold text-center transition-all hover:bg-accent/10 hover:border-accent block"
            >
              Migrating?
            </Link>


          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black/40 text-slate-400">New here?</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <Link
            href="/auth/register"
            className="w-full bg-transparent text-accent border border-accent/40 rounded-lg px-6 py-3 font-semibold text-center transition-all hover:bg-accent/10 hover:border-accent"
          >
            Create Account
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-center text-slate-500 text-xs mt-6">
          Use your registered credentials to log in
        </p>
      </div>
    </div>
  )
}
