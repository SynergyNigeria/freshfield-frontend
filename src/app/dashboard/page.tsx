'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useWalletStore } from '@/store/walletStore'
import { useInvestmentStore } from '@/store/investmentStore'
import { walletAPI, investmentAPI } from '@/lib/api'
import BtcCandlestickChart from '@/components/BtcCandlestickChart'

function fmt(value: string | number | undefined) {
  const n = parseFloat(String(value ?? 0))
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function DashboardPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { wallet, setWallet } = useWalletStore()
  const { portfolio, setPortfolio } = useInvestmentStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }
    walletAPI.getWallet().then(r => setWallet(r.data)).catch(() => {})
    investmentAPI.getPortfolio().then(r => setPortfolio(r.data)).catch(() => {})
  }, [isAuthenticated, router])

  if (!mounted || !isAuthenticated) return null

  return (
    <div className="bg-black text-white h-screen md:min-h-screen overflow-hidden md:overflow-auto">
      <div className="h-full md:h-auto mx-auto max-w-7xl px-0 py-0 md:px-6 md:py-6 lg:px-8 lg:py-6 flex flex-col md:block">
        <BtcCandlestickChart
          availableBalance={fmt(wallet?.balance)}
          portfolioValue={fmt(portfolio?.portfolio_amount)}
          totalInvested={fmt(portfolio?.total_invested)}
        />
      </div>
    </div>
  )
}
