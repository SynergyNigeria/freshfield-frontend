'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { ArrowRight } from 'feather-icons-react'

export default function Page() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Network Background */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 animate-network">
          <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
            <defs>
              <style>{`
                .node { fill: #ffffff; opacity: 0.4; }
                .line { stroke: #ffffff; stroke-width: 1; opacity: 0.15; }
              `}</style>
            </defs>
            <rect width="1200" height="600" fill="#000000" />
            
            {/* Network Lines */}
            <line x1="50" y1="100" x2="200" y2="150" className="line" />
            <line x1="200" y1="150" x2="400" y2="100" className="line" />
            <line x1="400" y1="100" x2="600" y2="200" className="line" />
            <line x1="600" y1="200" x2="800" y2="120" className="line" />
            <line x1="800" y1="120" x2="1000" y2="220" className="line" />
            <line x1="1000" y1="220" x2="1150" y2="150" className="line" />
            
            <line x1="50" y1="100" x2="100" y2="300" className="line" />
            <line x1="100" y1="300" x2="250" y2="400" className="line" />
            <line x1="250" y1="400" x2="450" y2="350" className="line" />
            <line x1="450" y1="350" x2="650" y2="450" className="line" />
            <line x1="650" y1="450" x2="850" y2="400" className="line" />
            <line x1="850" y1="400" x2="1050" y2="480" className="line" />
            
            <line x1="200" y1="150" x2="100" y2="300" className="line" />
            <line x1="400" y1="100" x2="450" y2="350" className="line" />
            <line x1="600" y1="200" x2="650" y2="450" className="line" />
            <line x1="800" y1="120" x2="850" y2="400" className="line" />
            
            {/* Nodes */}
            <circle cx="50" cy="100" r="4" className="node" />
            <circle cx="200" cy="150" r="4" className="node" />
            <circle cx="400" cy="100" r="4" className="node" />
            <circle cx="600" cy="200" r="4" className="node" />
            <circle cx="800" cy="120" r="4" className="node" />
            <circle cx="1000" cy="220" r="4" className="node" />
            <circle cx="1150" cy="150" r="4" className="node" />
            
            <circle cx="100" cy="300" r="4" className="node" />
            <circle cx="250" cy="400" r="4" className="node" />
            <circle cx="450" cy="350" r="4" className="node" />
            <circle cx="650" cy="450" r="4" className="node" />
            <circle cx="850" cy="400" r="4" className="node" />
            <circle cx="1050" cy="480" r="4" className="node" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-center">
              {/* Right Side - Dashboard Preview (appears on left on desktop) */}
              <div className="flex justify-center items-center lg:order-first">
                <div className="relative w-full max-w-sm">
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-accent/20">
                    <Image
                      src="/dashboard-preview.png"
                      alt="Dashboard Preview"
                      width={320}
                      height={640}
                      className="w-full h-auto"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Left Side - Text (appears on right on desktop) */}
              <div className="space-y-6 sm:space-y-8 lg:order-last">
                <div className="space-y-3 sm:space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl heading-xl text-white font-bold leading-tight">
                    Invest in Crypto with
                    <span className="block text-accent">Confidence</span>
                  </h1>
                  <p className="text-base sm:text-lg text-medium-gray leading-relaxed">
                    Simple, secure, and transparent cryptocurrency investment platform. Start your journey with zero complications.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-[16px] bg-black/40 p-4">
                    <p className="text-accent font-bold text-2xl">24/7</p>
                    <p className="text-sm text-white">Trading</p>
                  </div>
                  <div className="rounded-[16px] bg-black/40 p-4">
                    <p className="text-accent font-bold text-2xl">100%</p>
                    <p className="text-sm text-white">Secure</p>
                  </div>
                  <div className="rounded-[16px] bg-black/40 p-4">
                    <p className="text-accent font-bold text-2xl">0%</p>
                    <p className="text-sm text-white">Fees*</p>
                  </div>
                </div>

                {/* CTA Buttons */}
                {!isAuthenticated ? (
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link
                      href="/auth/register"
                      className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-black hover:bg-yellow-400 transition-all text-center flex items-center justify-center gap-2"
                    >
                      <span>Get Started</span>
                      <ArrowRight size={20} />
                    </Link>
                    <Link
                      href="/auth/login"
                      className="rounded-lg border border-accent/40 bg-accent/10 px-6 py-3 text-sm font-semibold text-accent hover:border-accent hover:bg-accent/20 transition-all text-center flex items-center justify-center gap-2"
                    >
                      <span>Sign In</span>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link
                      href="/dashboard"
                      className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-black hover:bg-yellow-400 transition-all text-center flex items-center justify-center gap-2"
                    >
                      <span>Go to Dashboard</span>
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Accent Element */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full filter blur-3xl -z-0" />
      </div>
    </div>
  )
}