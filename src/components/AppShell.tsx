'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isPublicPage = pathname === '/' || pathname?.startsWith('/auth')

  return (
    <>
      {!isPublicPage ? <Navbar /> : null}
      <main className={`min-h-screen ${isPublicPage ? '' : 'pb-24 pt-14 lg:pt-0 lg:pb-0 lg:pl-72'}`}>
        {children}
      </main>
    </>
  )
}
