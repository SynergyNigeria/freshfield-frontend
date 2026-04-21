'use client'

import { useEffect, useState } from 'react'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useAuthStore } from '@/store/authStore'
import Link from 'next/link'
import toast from 'react-hot-toast'

const API = process.env.NEXT_PUBLIC_API_URL

function WithdrawContent() {
  const { token } = useAuthStore()
  const [kycVerified, setKycVerified] = useState<boolean | null>(null)
  const [withdrawalNote, setWithdrawalNote] = useState('You are ineligible for withdrawal above $1000 at the moment')
  const [adminWithdrawNote, setAdminWithdrawNote] = useState('You will be notified about this transaction soon.')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [amount, setAmount] = useState('')
  const [walletAddress, setWalletAddress] = useState('')

  useEffect(() => {
    Promise.all([
      fetch(`${API}/auth/kyc/`, { headers: { Authorization: `Token ${token}` } }).then(r => r.ok ? r.json() : null),
      fetch(`${API}/investment/portfolio/`, { headers: { Authorization: `Token ${token}` } }).then(r => r.ok ? r.json() : null),
    ])
      .then(([kyc, portfolio]) => {
        if (kyc) setKycVerified(kyc.kyc_verified)
        if (portfolio?.withdrawal_note) setWithdrawalNote(portfolio.withdrawal_note)
        if (portfolio?.admin_withdraw_note) setAdminWithdrawNote(portfolio.admin_withdraw_note)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [token])

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount) { toast.error('Enter a withdrawal amount'); return }
    if (!walletAddress.trim()) { toast.error('Enter your BTC wallet address'); return }

    setSubmitting(true)
    try {
      // Withdrawals are currently held by admin and users are shown the admin note.
      toast.error(adminWithdrawNote || 'This withdrawal is on hold. You will be notified about this transaction soon.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
    </div>
  )

  if (kycVerified === false) {
    return (
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold">Withdraw Funds</h1>
        <div className="mt-8 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-6">
          <p className="text-yellow-400 font-semibold text-lg">KYC Verification Required</p>
          <p className="mt-2 text-sm text-yellow-400/80">You must complete identity verification before you can withdraw funds.</p>
          <Link href="/kyc-verification" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-black hover:brightness-110 transition-all">
            Verify Identity
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold">Withdraw Funds</h1>
      <p className="mt-2 text-sm text-medium-gray">Withdrawals are sent to your Bitcoin (BTC) wallet address.</p>

      <form onSubmit={handleWithdraw} className="mt-8 space-y-5">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-6">

          {/* BTC badge */}
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F7931A]/15 text-[#F7931A] font-bold text-sm shrink-0">₿</span>
            <div>
              <p className="text-sm font-semibold">Bitcoin (BTC)</p>
              <p className="text-xs text-medium-gray">Bitcoin network</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Amount (USD)</label>
            <input
              type="number" min="1" step="0.01" value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">BTC Wallet Address</label>
            <input
              type="text" value={walletAddress}
              onChange={e => setWalletAddress(e.target.value)}
              placeholder="bc1q... or 1... or 3..."
              className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm font-mono outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        <button
          type="submit" disabled={submitting}
          className="w-full rounded-xl bg-accent py-3 text-sm font-semibold text-black disabled:opacity-50 hover:brightness-110 transition-all"
        >
          {submitting ? 'Processing...' : 'Submit Withdrawal'}
        </button>
      </form>

      {/* Admin note */}
      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
        <span className="mt-0.5 shrink-0 text-accent text-base leading-none">ℹ</span>
        <p className="text-sm font-semibold text-white/80 leading-relaxed">{withdrawalNote}</p>
      </div>
    </div>
  )
}

export default function WithdrawPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 lg:px-8">
        <WithdrawContent />
      </div>
    </ProtectedRoute>
  )
}
