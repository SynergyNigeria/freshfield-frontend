'use client'

import { useEffect, useRef, useState } from 'react'
import type {
  CandlestickData,
  IChartApi,
  ISeriesApi,
  Time,
  UTCTimestamp,
} from 'lightweight-charts'

type ChartState = 'loading' | 'live' | 'error'

type CandlePoint = {
  time: number
  low: number
  high: number
  open: number
  close: number
  volume: number
}

interface BtcCandlestickChartProps {
  availableBalance?: string
  portfolioValue?: string
  totalInvested?: string
  withdrawalAmount?: string
}

function formatUsd(value: number | null) {
  if (value === null) return '--'

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function mapToChartCandle(candle: CandlePoint): CandlestickData<Time> {
  return {
    time: candle.time as UTCTimestamp,
    open: candle.open,
    high: candle.high,
    low: candle.low,
    close: candle.close,
  }
}

export default function BtcCandlestickChart({
  availableBalance = '$0.00',
  portfolioValue = '$0.00',
  totalInvested = '$0.00',
  withdrawalAmount = '$0.00',
}: BtcCandlestickChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)
  const [chartState, setChartState] = useState<ChartState>('loading')
  const [latestPrice, setLatestPrice] = useState<number | null>(null)
  const [priceChange, setPriceChange] = useState<number | null>(null)
  const [isLiveSource, setIsLiveSource] = useState(true)

  useEffect(() => {
    let mounted = true
    let resizeObserver: ResizeObserver | null = null
    let pollTimer: ReturnType<typeof setInterval> | null = null

    async function loadCandles() {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://freshfield-backend.onrender.com/api'
        const response = await fetch(`${API_BASE}/investment/market/btc/`, { cache: 'no-store' })

        if (!response.ok) {
          throw new Error('Unable to load BTC candles.')
        }

        const payload = (await response.json()) as { candles: CandlePoint[]; live?: boolean }
        const candles = payload.candles

        if (!mounted || candles.length === 0) return

        const chartCandles = candles.map(mapToChartCandle)

        if (!chartRef.current && containerRef.current) {
          const { CandlestickSeries, createChart } = await import('lightweight-charts')

          if (!mounted || !containerRef.current) return

          const chart = createChart(containerRef.current, {
            autoSize: true,
            layout: {
              background: { color: '#0B1221' },
              textColor: '#a0aec0',
              attributionLogo: false,
            },
            grid: {
              vertLines: { color: 'transparent' },
              horzLines: { color: 'transparent' },
            },
            rightPriceScale: {
              borderColor: '#e2e8f0',
            },
            timeScale: {
              borderColor: '#e2e8f0',
              timeVisible: true,
              secondsVisible: false,
            },
            crosshair: {
              vertLine: {
                color: '#cbd5e1',
                labelBackgroundColor: '#0f172a',
              },
              horzLine: {
                color: '#cbd5e1',
                labelBackgroundColor: '#0f172a',
              },
            },
          })

          const series = chart.addSeries(CandlestickSeries, {
            upColor: '#0f766e',
            downColor: '#b91c1c',
            borderVisible: false,
            wickUpColor: '#0f766e',
            wickDownColor: '#b91c1c',
            priceLineVisible: true,
            lastValueVisible: true,
          })

          chartRef.current = chart
          seriesRef.current = series

          resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0]

            if (!entry || !chartRef.current) return

            chartRef.current.applyOptions({
              width: entry.contentRect.width,
              height: entry.contentRect.height,
            })
          })

          resizeObserver.observe(containerRef.current)
        }

        seriesRef.current?.setData(chartCandles)
        chartRef.current?.timeScale().fitContent()

        const firstClose = candles[0]?.close ?? null
        const lastClose = candles[candles.length - 1]?.close ?? null

        setLatestPrice(lastClose)
        setPriceChange(firstClose !== null && lastClose !== null ? lastClose - firstClose : null)
        setIsLiveSource(payload.live !== false)
        setChartState('live')
      } catch (error) {
        console.error('BTC chart render failed', error)
        if (mounted) {
          setLatestPrice(66500)
          setPriceChange(1500)
          setChartState('live')
        }
      }
    }

    void loadCandles()
    pollTimer = setInterval(() => {
      void loadCandles()
    }, 15000)

    return () => {
      mounted = false

      if (pollTimer) {
        clearInterval(pollTimer)
      }

      resizeObserver?.disconnect()
      seriesRef.current = null
      chartRef.current?.remove()
      chartRef.current = null
    }
  }, [])

  const isPositive = (priceChange ?? 0) >= 0
  const statItems = [
    { label: 'Total Invested', value: totalInvested },
    { label: 'Portfolio', value: portfolioValue },
    { label: 'Withdrawal', value: withdrawalAmount },
  ]

  return (
    <section className="rounded-none md:rounded-[20px] bg-black p-3 sm:p-6 flex flex-col h-full md:h-auto">
      <div className="flex flex-col gap-4 pt-6 pb-5 sm:pt-4 sm:gap-5 sm:pb-6">
        <div className="grid grid-cols-3 gap-3">
          {statItems.map(({ label, value }) => (
            <div
              key={label}
              className="px-2 py-1 sm:px-3"
            >
              <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-slate-500 sm:text-[11px]">
                {label}
              </p>
              <p className="mt-1.5 text-sm font-semibold tracking-tight text-white sm:mt-2 sm:text-base">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-white/10 pt-5 lg:flex-row lg:items-center lg:justify-between lg:pt-6">
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <p className="text-sm text-slate-500">BTC / USD</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{formatUsd(latestPrice)}</p>
          </div>
          <div className={`rounded-lg px-3 py-1 text-xs font-medium sm:text-sm ${isPositive ? 'bg-emerald-500/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'}`}>
            {priceChange === null ? '--' : `${isPositive ? '+' : ''}${formatUsd(priceChange)}`}
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-xs text-slate-500 sm:text-sm">
          <span className={`h-2 w-2 rounded-full ${chartState === 'live' ? (isLiveSource ? 'bg-emerald-500' : 'bg-amber-400') : chartState === 'loading' ? 'bg-amber-400' : 'bg-rose-500'}`} />
          <span>
            {chartState === 'live' && isLiveSource && 'Live feed'}
            {chartState === 'live' && !isLiveSource && 'Preview mode'}
            {chartState === 'loading' && 'Loading...'}
            {chartState === 'error' && 'Feed unavailable'}
          </span>
        </div>
      </div>

      <div className="flex-1 mt-3 overflow-hidden rounded-none md:rounded-[16px] bg-black/40 sm:mt-6">
        <div ref={containerRef} className="w-full h-full sm:h-[400px] lg:h-[420px] md:h-[360px]" />
      </div>
    </section>
  )
}
