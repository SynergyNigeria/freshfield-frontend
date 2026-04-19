'use client'

import { useEffect, useState } from 'react'

interface CoinPrice {
  id: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
}

const COINS = 'bitcoin,ethereum,solana,ripple,cardano,dogecoin,polkadot,avalanche-2,chainlink,litecoin'

export default function CryptoTicker() {
  const [prices, setPrices] = useState<CoinPrice[]>([])

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COINS}&order=market_cap_desc&sparkline=false&price_change_percentage=24h`
        )
        if (res.ok) {
          const data = await res.json()
          setPrices(data)
        }
      } catch {
        // silent fail — ticker just won't show
      }
    }

    fetchPrices()
    const interval = setInterval(fetchPrices, 60000)
    return () => clearInterval(interval)
  }, [])

  if (prices.length === 0) return null

  // Duplicate for seamless loop
  const items = [...prices, ...prices]

  return (
    <div className="w-full bg-black/80 border-b border-white/10 overflow-hidden backdrop-blur-sm">
      <div className="animate-ticker flex whitespace-nowrap py-2.5">
        {items.map((coin, i) => (
          <span key={`${coin.id}-${i}`} className="inline-flex items-center gap-2 mx-6 text-sm">
            <span className="text-white/60 uppercase font-semibold">{coin.symbol}</span>
            <span className="text-white font-medium">
              ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span
              className={`text-xs font-medium ${
                coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {coin.price_change_percentage_24h >= 0 ? '+' : ''}
              {coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
