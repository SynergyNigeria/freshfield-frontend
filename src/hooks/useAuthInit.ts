import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'

/**
 * Hook to handle auth initialization on page load
 * Waits for store hydration before checking authentication
 * Redirects to login if not authenticated
 */
export function useAuthInit(shouldRedirect = true) {
  const router = useRouter()
  const { isAuthenticated, isHydrated } = useAuthStore()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Wait for store to hydrate from localStorage
    if (isHydrated) {
      setIsReady(true)
      
      // Redirect to login if not authenticated and redirects are enabled
      if (shouldRedirect && !isAuthenticated) {
        router.push('/auth/login')
      }
    }
  }, [isHydrated, isAuthenticated, router, shouldRedirect])

  return {
    isReady,
    isAuthenticated,
    isHydrated,
  }
}
