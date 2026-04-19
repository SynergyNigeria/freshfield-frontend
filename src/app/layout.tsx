import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import '../globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Freshfield - Investment App',
  description: 'Mini MVP investment app for crypto trading',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-slate-900 antialiased">
        <Navbar />
        <main className="min-h-screen pb-24 md:pb-0">
          {children}
        </main>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
