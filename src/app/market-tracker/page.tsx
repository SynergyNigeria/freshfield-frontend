'use client'

import { useEffect, useState } from 'react'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useAuthStore } from '@/store/authStore'
import BtcCandlestickChart from '@/components/BtcCandlestickChart'

const API = process.env.NEXT_PUBLIC_API_URL

const ALL_SYMBOLS = ['BTC','ETH','SOL','XRP','ADA','DOGE','DOT','AVAX','LINK','LTC']

interface Coin {
  symbol: string
  name: string
  price: number
  change_24h: number
  market_cap: number
}

function MarketTrackerContent() {
  const { token } = useAuthStore()
  const [allCoins, setAllCoins] = useState<Coin[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set(ALL_SYMBOLS))
  const [live, setLive] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchCoins = async () => {
    try {
      const res = await fetch(`${API}/investment/market/tracker/`, { headers: { Authorization: `Token ${token}` } })
      if (res.ok) { const d = await res.json(); setAllCoins(d.coins); setLive(d.live) }
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchCoins(); const t = setInterval(fetchCoins, 60000); return () => clearInterval(t) }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleCoin = (symbol: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(symbol)) {
        if (next.size <= 1) return prev // keep at least 1
        next.delete(symbol)
      } else {
        if (next.size >= 10) return prev // max 10
        next.add(symbol)
      }
      return next
    })
  }

  const coins = allCoins.filter(c => selected.has(c.symbol))

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Market Tracker</h1>
          <p className="mt-1 text-medium-gray text-sm">Live prices refresh every 60 seconds</p>
        </div>
        <span className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${live ? 'border-green-400/30 bg-green-400/10 text-green-400' : 'border-yellow-400/30 bg-yellow-400/10 text-yellow-400'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${live ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`} />
          {live ? 'Live' : 'Cached'}
        </span>
      </div>

      {/* Coin picker */}
      <div className="mb-6">
        <p className="text-xs text-medium-gray mb-3">Select up to 10 coins to track ({selected.size}/10 selected)</p>
        <div className="flex flex-wrap gap-2">
          {ALL_SYMBOLS.map(sym => (
            <button key={sym} onClick={() => toggleCoin(sym)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
                selected.has(sym)
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-white/10 text-medium-gray hover:border-white/30'
              }`}>
              {sym}
            </button>
          ))}
        </div>
      </div>

      {/* Price table */}
      <div className="rounded-2xl border border-white/10 overflow-hidden mb-10">
        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] border-b border-white/10">
              <tr>
                <th className="text-left px-4 py-3 text-medium-gray font-medium">Coin</th>
                <th className="text-right px-4 py-3 text-medium-gray font-medium">Price</th>
                <th className="text-right px-4 py-3 text-medium-gray font-medium">24h</th>
                <th className="text-right px-4 py-3 text-medium-gray font-medium hidden sm:table-cell">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin, i) => (
                <tr key={coin.symbol} className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors ${i === coins.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <span className="text-accent text-xs font-bold">{coin.symbol.slice(0,2)}</span>
                      </div>
                      <div>
                        <p className="font-semibold">{coin.symbol}</p>
                        <p className="text-xs text-medium-gray">{coin.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-right px-4 py-4 font-medium">
                    ${coin.price < 1 ? coin.price.toFixed(4) : coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className={`text-right px-4 py-4 font-semibold ${coin.change_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {coin.change_24h >= 0 ? '+' : ''}{coin.change_24h?.toFixed(2)}%
                  </td>
                  <td className="text-right px-4 py-4 text-medium-gray hidden sm:table-cell">
                    {coin.market_cap ? `$${(coin.market_cap / 1e9).toFixed(1)}B` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* BTC Chart */}
      <div>
        <h2 className="text-xl font-bold mb-4">BTC / USD Chart</h2>
        <BtcCandlestickChart availableBalance="" portfolioValue="" totalInvested="" />
      </div>
    </div>
  )
}

export default function MarketTrackerPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 lg:px-8">
        <MarketTrackerContent />
      </div>
    </ProtectedRoute>
  )
}
