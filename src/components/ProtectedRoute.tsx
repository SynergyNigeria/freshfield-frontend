'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { isAuthenticated, isHydrated } = useAuthStore()
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
