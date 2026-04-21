'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import Home from 'feather-icons-react/build/IconComponents/Home'
import Download from 'feather-icons-react/build/IconComponents/Download'
import CheckCircle from 'feather-icons-react/build/IconComponents/CheckCircle'
import Bell from 'feather-icons-react/build/IconComponents/Bell'
import Clock from 'feather-icons-react/build/IconComponents/Clock'
import TrendingUp from 'feather-icons-react/build/IconComponents/TrendingUp'
import Settings from 'feather-icons-react/build/IconComponents/Settings'
import HelpCircle from 'feather-icons-react/build/IconComponents/HelpCircle'
import LogOut from 'feather-icons-react/build/IconComponents/LogOut'
import Menu from 'feather-icons-react/build/IconComponents/Menu'
import X from 'feather-icons-react/build/IconComponents/X'
import WithdrawalTicker from '@/components/WithdrawalTicker'
import { useUnreadSupport } from '@/hooks/useUnreadSupport'

const allLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/withdraw', label: 'Withdraw Funds', icon: Download },
  { href: '/kyc-verification', label: 'KYC Verification', icon: CheckCircle },
  { href: '/notifications', label: 'Notifications', icon: Bell },
  { href: '/transaction-history', label: 'Transaction History', icon: Clock },
  { href: '/market-tracker', label: 'Market Tracker', icon: TrendingUp },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/support', label: 'Support', icon: HelpCircle },
]

const mainMobileLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/withdraw', label: 'Withdraw', icon: Download },
  { href: '/market-tracker', label: 'Market', icon: TrendingUp },
  { href: '/transaction-history', label: 'History', icon: Clock },
]

const mobileDrawerLinks = [
  { href: '/kyc-verification', label: 'KYC Verification', icon: CheckCircle },
  { href: '/notifications', label: 'Notifications', icon: Bell },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/support', label: 'Support', icon: HelpCircle },
]

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, user, logout } = useAuthStore()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const unreadSupport = useUnreadSupport()

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + '/')
  }

  const handleLogout = () => {
    logout()
    setIsDrawerOpen(false)
    router.push('/auth/login')
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-72 border-r border-white/10 bg-black/95 px-5 py-6 backdrop-blur lg:flex lg:flex-col">
        <Link href="/dashboard" className="mb-8 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-3">
          <Image src="/logo.png" alt="Freshfield Logo" width={190} height={60} className="h-auto" priority />
        </Link>

        <nav className="flex-1 space-y-2">
          {allLinks.map(({ href, label, icon: Icon }) => {
            const active = isActive(href)
            const isSupport = href === '/support'
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-accent text-black'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span className="flex-1">{label}</span>
                {isSupport && unreadSupport > 0 && (
                  <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                    {unreadSupport > 99 ? '99+' : unreadSupport}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="truncate text-xs text-slate-400">{user?.email || 'Signed in user'}</p>
          <button
            onClick={handleLogout}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-black transition-colors hover:bg-yellow-400"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      <div className="fixed left-4 top-4 z-50 lg:hidden">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white backdrop-blur"
          aria-label="Open menu"
        >
          <Menu size={20} />
          {unreadSupport > 0 && (
            <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-black" />
          )}
        </button>
      </div>

      {isDrawerOpen ? (
        <>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 z-50 bg-black/60"
            aria-label="Close menu overlay"
          />
          <aside className="fixed left-0 top-0 z-[60] h-screen w-72 border-r border-white/10 bg-black px-5 py-6">
            <div className="mb-8 flex items-center justify-between">
              <Image src="/logo.png" alt="Freshfield Logo" width={150} height={46} className="h-auto" />
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="space-y-2">
              {mobileDrawerLinks.map(({ href, label, icon: Icon }) => {
                const active = isActive(href)
                const isSupport = href === '/support'
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsDrawerOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-accent text-black'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="flex-1">{label}</span>
                    {isSupport && unreadSupport > 0 && (
                      <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                        {unreadSupport > 99 ? '99+' : unreadSupport}
                      </span>
                    )}
                  </Link>
                )
              })}
            </nav>

            <button
              onClick={handleLogout}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-3 py-3 text-sm font-semibold text-black transition-colors hover:bg-yellow-400"
            >
              <LogOut size={16} />
              Logout
            </button>
          </aside>
        </>
      ) : null}

      <WithdrawalTicker />

      <div className="fixed inset-x-0 bottom-0 z-50 bg-black/90 px-2 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-md justify-center gap-1 rounded-[24px] bg-white/8 p-1.5 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
          {mainMobileLinks.map(({ href, label, icon: Icon }) => {
            const active = isActive(href)

            return (
              <Link
                key={href}
                href={href}
                className={`flex min-w-0 flex-col items-center justify-center rounded-[16px] px-2 py-2 text-[10px] font-medium transition-colors ${
                  active
                    ? 'bg-accent text-black'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={16} />
                <span className="mt-0.5 truncate">{label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
