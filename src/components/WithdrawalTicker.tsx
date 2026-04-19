'use client'

import { useEffect, useRef, useState } from 'react'

const FIRST_NAMES = [
  'James', 'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William', 'Sophia',
  'Benjamin', 'Isabella', 'Lucas', 'Mia', 'Henry', 'Charlotte', 'Alexander',
  'Amelia', 'Mason', 'Harper', 'Ethan', 'Evelyn', 'Michael', 'Abigail',
  'Daniel', 'Emily', 'Matthew', 'Elizabeth', 'Logan', 'Sofia', 'Jackson',
  'Avery', 'Sebastian', 'Ella', 'Aiden', 'Scarlett', 'Owen', 'Victoria',
  'Samuel', 'Madison', 'Caleb', 'Grace', 'Ryan', 'Chloe', 'Nathan', 'Penelope',
  'Adrian', 'Layla', 'Elijah', 'Riley', 'David', 'Zoe',
]

const LAST_INITIALS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'V', 'W']

const AMOUNTS = [
  5000, 7500, 8000, 10000, 12000, 15000, 18000, 20000, 22000, 25000,
  28000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 75000, 80000,
  90000, 100000, 120000, 150000,
]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function makeMessage() {
  return {
    name: `${pick(FIRST_NAMES)} ${pick(LAST_INITIALS)}.`,
    amount: '$' + pick(AMOUNTS).toLocaleString('en-US'),
  }
}

export default function WithdrawalTicker() {
  const [msg, setMsg] = useState<{ name: string; amount: string } | null>(null)
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    function schedule() {
      // 60 seconds + 0-29 random extra seconds
      const delay = 60_000 + Math.floor(Math.random() * 30_000)
      timerRef.current = setTimeout(show, delay)
    }

    function show() {
      setMsg(makeMessage())
      setVisible(true)
      // hide after 6 seconds, then schedule next
      timerRef.current = setTimeout(() => {
        setVisible(false)
        schedule()
      }, 6_000)
    }

    // First appearance after 2 seconds
    timerRef.current = setTimeout(show, 2_000)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out ${
        visible ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="flex items-center justify-center gap-2.5 border-b border-white/5 bg-white/[0.03] py-2 px-4 text-sm">
        <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-slate-300">
          <span className="font-semibold text-white">{msg?.name}</span>
          {' '}just withdrew{' '}
          <span className="font-semibold text-accent">{msg?.amount}</span>
        </span>
      </div>
    </div>
  )
}
