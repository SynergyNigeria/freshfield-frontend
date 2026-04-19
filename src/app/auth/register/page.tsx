'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { authAPI } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from 'feather-icons-react'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPasswords, setShowPasswords] = useState({ password: false, password2: false })
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
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

    if (formData.password !== formData.password2) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const response = await authAPI.register(formData)
      setToken(response.data.token)
      setUser(response.data.user)
      toast.success('Registration successful! 🎉')
      router.push('/dashboard')
    } catch (error: any) {
      const data = error.response?.data
      if (data && typeof data === 'object') {
        const firstError = Object.values(data).flat()[0]
        toast.error(String(firstError) || 'Registration failed')
      } else {
        toast.error('Registration failed')
      }
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
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="First name"
                  className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.password ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({ ...showPasswords, password: !showPasswords.password })
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-accent transition-colors"
                >
                  {showPasswords.password ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.password2 ? 'text' : 'password'}
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({ ...showPasswords, password2: !showPasswords.password2 })
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-accent transition-colors"
                >
                  {showPasswords.password2 ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg transition-all disabled:opacity-50 mt-6 flex items-center justify-center gap-2"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black/40 text-slate-400">Already have an account?</span>
            </div>
          </div>

          {/* Sign In Link */}
          <Link
            href="/auth/login"
            className="w-full bg-transparent text-accent border border-accent/40 rounded-lg px-6 py-3 font-semibold text-center transition-all hover:bg-accent/10 hover:border-accent"
          >
            Sign In
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-center text-slate-500 text-xs mt-6">
          By registering, you agree to our Terms of Service
        </p>
      </div>
    </div>
  )
}
