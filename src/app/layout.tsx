import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import '../globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Freshfield - Investment App',
  description: 'Number one investment app for real investors',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Freshfield - Investment App',
    description: 'Number one investment app for real investors',
    url: 'https://freshfield.pages.dev',
    siteName: 'Freshfield',
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'Freshfield',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Freshfield - Investment App',
    description: 'Number one investment app for real investors',
    images: ['/android-chrome-512x512.png'],
  },
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
        <AppShell>{children}</AppShell>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
