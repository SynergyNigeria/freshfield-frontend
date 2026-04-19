'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { Home, LogOut, Settings } from 'feather-icons-react'
import WithdrawalTicker from '@/components/WithdrawalTicker'

const navLinks = [
  { href: '/dashboard', label: 'Overview', icon: Home },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }

    return pathname?.startsWith(href)
  }

  // Hide navbar on public pages
  const hideNavbar = pathname === '/' || pathname?.startsWith('/auth')
  
  if (hideNavbar) {
    return null
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Freshfield Logo"
              width={150}
              height={50}
              className="rounded-lg"
            />
          </Link>

          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 shadow-[0_12px_32px_rgba(0,0,0,0.24)]">
                {navLinks.map(({ href, label, icon: Icon }) => {
                  const active = isActive(href)

                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        active
                          ? 'bg-accent text-black'
                          : 'text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{label}</span>
                    </Link>
                  )
                })}
              </div>
              <div className="flex items-center gap-3 md:hidden">
                {/* Account section removed */}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent transition-colors hover:border-accent hover:bg-accent/20"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-yellow-400"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>

      <WithdrawalTicker />

      {isAuthenticated ? (
        <div className="fixed inset-x-0 bottom-0 z-50 bg-black/90 px-2 py-3 backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-md justify-center gap-1 rounded-[24px] bg-white/8 p-1.5 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = isActive(href)

              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex flex-col items-center justify-center rounded-[16px] px-1 py-2 text-[9px] font-medium transition-colors ${
                    active
                      ? 'bg-accent text-black'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  <span className="mt-0.5">{label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      ) : null}
    </>
  )
}
