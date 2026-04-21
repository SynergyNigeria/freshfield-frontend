'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'

const API = process.env.NEXT_PUBLIC_API_URL

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { isAuthenticated, isHydrated, token, setUser } = useAuthStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Only redirect if store has hydrated and user is not authenticated
    if (mounted && isHydrated && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, isHydrated, mounted, router])

  // Refresh user profile to ensure is_staff and other fields are up-to-date
  useEffect(() => {
    if (mounted && isHydrated && isAuthenticated && token) {
      fetch(`${API}/auth/profile/`, {
        headers: { Authorization: `Token ${token}` },
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => { if (data) setUser(data) })
        .catch(() => {})
    }
  }, [mounted, isHydrated, isAuthenticated, token, setUser])

  // Don't render anything until store is hydrated
  if (!mounted || !isHydrated) {
    return null
  }

  // If not authenticated, show nothing (will redirect in useEffect above)
  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
