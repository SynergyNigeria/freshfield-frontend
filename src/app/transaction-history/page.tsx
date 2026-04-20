'use client'

import { useEffect, useState } from 'react'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useAuthStore } from '@/store/authStore'

const API = process.env.NEXT_PUBLIC_API_URL

interface Transaction {
  id: number
  transaction_type: string
  amount: string
  status: string
  description: string
  transaction_id: string
  created_at: string
}

const TYPE_STYLES: Record<string, string> = {
  DEPOSIT: 'text-green-400',
  WITHDRAWAL: 'text-red-400',
  BUY: 'text-blue-400',
  SELL: 'text-purple-400',
}

const STATUS_BADGE: Record<string, string> = {
  COMPLETED: 'bg-green-400/10 text-green-400 border-green-400/20',
  PENDING: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
  FAILED: 'bg-red-400/10 text-red-400 border-red-400/20',
}

function TransactionHistoryContent() {
  const { token } = useAuthStore()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API}/wallet/transactions/`, { headers: { Authorization: `Token ${token}` } })
      .then(r => r.ok ? r.json() : [])
      .then(setTransactions)
      .finally(() => setLoading(false))
  }, [token])

  if (loading) return <div className="flex h-64 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" /></div>

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold">Transaction History</h1>
      <p className="mt-2 text-medium-gray">{transactions.length} transaction{transactions.length !== 1 ? 's' : ''}</p>

      {transactions.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-4xl mb-3">💳</p>
          <p className="text-medium-gray">No transactions yet.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {transactions.map(tx => (
            <div key={tx.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-xs font-bold uppercase ${TYPE_STYLES[tx.transaction_type] ?? 'text-white'}`}>{tx.transaction_type}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_BADGE[tx.status] ?? ''}`}>{tx.status}</span>
                  </div>
                  <p className="text-sm text-medium-gray truncate">{tx.description || '—'}</p>
                  <p className="text-xs text-white/30 mt-1">{new Date(tx.created_at).toLocaleString()}</p>
                  <p className="text-xs text-white/20 mt-1 truncate">ID: {tx.transaction_id}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-lg font-bold ${['DEPOSIT','SELL'].includes(tx.transaction_type) ? 'text-green-400' : 'text-red-400'}`}>
                    {['DEPOSIT','SELL'].includes(tx.transaction_type) ? '+' : '-'}${parseFloat(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function TransactionHistoryPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 lg:px-8">
        <TransactionHistoryContent />
      </div>
    </ProtectedRoute>
  )
}
