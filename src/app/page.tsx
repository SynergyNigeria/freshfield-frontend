'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import ArrowRight from 'feather-icons-react/build/IconComponents/ArrowRight'
import Shield from 'feather-icons-react/build/IconComponents/Shield'
import Zap from 'feather-icons-react/build/IconComponents/Zap'
import TrendingUp from 'feather-icons-react/build/IconComponents/TrendingUp'
import CryptoTicker from '@/components/CryptoTicker'

export default function Page() {
  const { isAuthenticated } = useAuthStore()

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Live Crypto Price Ticker */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <CryptoTicker />
      </div>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-10">
        {/* Mesh background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none"
          style={{ backgroundImage: "url('/mesh-bg.webp')" }}
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 pointer-events-none" />
        {/* Accent glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[120px] pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 mb-6 animate-fade-up">
          <Image src="/logo.png" alt="Freshfield" width={250} height={250} className="mx-auto" priority />
        </div>

        {/* Badge */}
        <div className="relative z-10 mb-8 animate-fade-up delay-100">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-sm font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Trusted by thousands of investors
          </span>
        </div>

        {/* Heading */}
        <h1 className="relative z-10 text-center max-w-4xl">
          <span className="block text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-[1.1] animate-fade-up delay-200">
            Invest in Crypto
          </span>
          <span className="block text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-[1.1] text-accent mt-2 animate-fade-up delay-300">
            with Confidence
          </span>
        </h1>

        {/* Subtitle */}
        <p className="relative z-10 mt-6 text-center text-medium-gray text-lg sm:text-xl max-w-2xl leading-relaxed animate-fade-up delay-400">
          Freshfield is your gateway to smarter crypto investing. Secure, transparent, and built for investors who demand more.
        </p>

        {/* CTA */}
        <div className="relative z-10 mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up delay-500">
          <Link
            href="/auth/register"
            className="group flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-black hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] transition-all duration-300"
          >
            Get Started
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/auth/login"
            className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white hover:border-accent/50 hover:text-accent transition-all duration-300"
          >
            Sign In
          </Link>
        </div>

        {/* Stats row */}
        <div className="relative z-10 mt-20 flex flex-wrap justify-center gap-8 sm:gap-16 animate-fade-up delay-600">
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-bold text-accent">$2B+</p>
            <p className="text-sm text-medium-gray mt-1">Assets Managed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-bold text-accent">50K+</p>
            <p className="text-sm text-medium-gray mt-1">Active Users</p>
          </div>
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-bold text-accent">99.9%</p>
            <p className="text-sm text-medium-gray mt-1">Uptime</p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-medium-gray/50 animate-fade-in delay-1000">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-medium-gray/50 to-transparent" />
        </div>
      </section>

      {/* Features */}
      <section className="relative px-6 py-24 sm:py-32 overflow-hidden">
        {/* Subtle accent glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Image */}
            <div className="relative animate-fade-up">
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80"
                  alt="Cryptocurrency"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-accent text-sm font-semibold tracking-widest uppercase">Why Freshfield</p>
                  <h2 className="text-3xl sm:text-4xl font-bold mt-2">
                    Built for the modern investor
                  </h2>
                </div>
              </div>
              {/* Decorative accent border */}
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-accent/20 -z-10" />
            </div>

            {/* Right — Feature Cards */}
            <div className="space-y-5">
              <div className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-accent/30 hover:bg-accent/[0.03] transition-all duration-300 animate-scale-in delay-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Shield size={22} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Bank-Grade Security</h3>
                    <p className="text-medium-gray text-sm leading-relaxed">
                      Your assets are protected with industry-leading encryption and multi-layer security protocols.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-accent/30 hover:bg-accent/[0.03] transition-all duration-300 animate-scale-in delay-400">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Zap size={22} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Instant Transactions</h3>
                    <p className="text-medium-gray text-sm leading-relaxed">
                      Deposit, invest, and withdraw in seconds. No delays, no waiting periods.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-accent/30 hover:bg-accent/[0.03] transition-all duration-300 animate-scale-in delay-600">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <TrendingUp size={22} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Smart Returns</h3>
                    <p className="text-medium-gray text-sm leading-relaxed">
                      Earn competitive returns on your investments with our optimized portfolio strategies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ready to start <span className="text-accent">investing</span>?
          </h2>
          <p className="text-medium-gray mt-4 text-lg">
            Join thousands of investors already growing their wealth with Freshfield.
          </p>
          {!isAuthenticated && (
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center gap-2 mt-8 rounded-full bg-accent px-10 py-4 text-base font-semibold text-black hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] transition-all duration-300"
            >
              Create Free Account
              <ArrowRight size={18} />
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-medium-gray">&copy; 2026 Freshfield. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-medium-gray">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-white cursor-pointer transition-colors">Support</span>
          </div>
        </div>
      </footer>
    </div>
  )
}