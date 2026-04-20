'use client'

import { useEffect, useState } from 'react'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useAuthStore } from '@/store/authStore'
import Link from 'next/link'
import toast from 'react-hot-toast'

const API = process.env.NEXT_PUBLIC_API_URL

type Method = 'BANK' | 'WALLET'
type WalletType = 'TRC20' | 'ERC20'

function WithdrawContent() {
  const { token } = useAuthStore()
  const [balance, setBalance] = useState<string | null>(null)
  const [kycVerified, setKycVerified] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState<Method>('BANK')
  const [bankName, setBankName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [walletType, setWalletType] = useState<WalletType>('TRC20')
  const [walletAddress, setWalletAddress] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [walletRes, kycRes] = await Promise.all([
          fetch(`${API}/wallet/`, { headers: { Authorization: `Token ${token}` } }),
          fetch(`${API}/auth/kyc/`, { headers: { Authorization: `Token ${token}` } }),
        ])
        if (walletRes.ok) { const d = await walletRes.json(); setBalance(d.balance) }
        if (kycRes.ok) { const d = await kycRes.json(); setKycVerified(d.kyc_verified) }
      } finally { setLoading(false) }
    }
    fetchData()
  }, [token])

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount) { toast.error('Enter a withdrawal amount'); return }
    if (method === 'BANK' && (!bankName || !accountNumber)) { toast.error('Enter bank name and account number'); return }
    if (method === 'WALLET' && !walletAddress) { toast.error('Enter wallet address'); return }

    setSubmitting(true)
    try {
      const body: Record<string, unknown> = { amount: parseFloat(amount), method }
      if (method === 'BANK') { body.bank_name = bankName; body.account_number = accountNumber }
      else { body.wallet_type = walletType; body.wallet_address = walletAddress }

      const res = await fetch(`${API}/wallet/withdrawal/`, {
        method: 'POST',
        headers: { Authorization: `Token ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (res.ok || res.status === 201) {
        toast.success('Withdrawal submitted!')
        setBalance(data.new_balance)
        setAmount(''); setBankName(''); setAccountNumber(''); setWalletAddress('')
      } else {
        toast.error(data.message || data.error || JSON.stringify(data))
      }
    } catch { toast.error('Network error') }
    finally { setSubmitting(false) }
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
      <p className="mt-2 text-medium-gray">Available balance: <span className="text-accent font-semibold">${balance}</span></p>

      <form onSubmit={handleWithdraw} className="mt-8 space-y-5">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Amount (USD)</label>
            <input type="number" min="1" step="0.01" value={amount} onChange={e => setAmount(e.target.value)}
              placeholder="0.00" className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-accent transition-colors" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Withdrawal Method</label>
            <div className="grid grid-cols-2 gap-3">
              {(['BANK', 'WALLET'] as Method[]).map(m => (
                <button key={m} type="button" onClick={() => setMethod(m)}
                  className={`rounded-xl border py-3 text-sm font-semibold transition-all ${method === m ? 'border-accent bg-accent/10 text-accent' : 'border-white/10 text-medium-gray hover:border-white/30'}`}>
                  {m === 'BANK' ? 'Bank Account' : 'Crypto Wallet'}
                </button>
              ))}
            </div>
          </div>

          {method === 'BANK' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Bank Name</label>
                <input type="text" value={bankName} onChange={e => setBankName(e.target.value)}
                  placeholder="e.g. Chase, Wells Fargo" className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-accent transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Account Number</label>
                <input type="text" value={accountNumber} onChange={e => setAccountNumber(e.target.value)}
                  placeholder="Enter your account number" className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-accent transition-colors" />
              </div>
            </>
          )}

          {method === 'WALLET' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Wallet Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['TRC20', 'ERC20'] as WalletType[]).map(wt => (
                    <button key={wt} type="button" onClick={() => setWalletType(wt)}
                      className={`rounded-xl border py-2.5 text-sm font-semibold transition-all ${walletType === wt ? 'border-accent bg-accent/10 text-accent' : 'border-white/10 text-medium-gray hover:border-white/30'}`}>
                      {wt === 'TRC20' ? 'TRC-20 (TRON)' : 'ERC-20 (Ethereum)'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Wallet Address</label>
                <input type="text" value={walletAddress} onChange={e => setWalletAddress(e.target.value)}
                  placeholder={walletType === 'TRC20' ? 'T...' : '0x...'}
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm font-mono outline-none focus:border-accent transition-colors" />
              </div>
            </>
          )}
        </div>

        <button type="submit" disabled={submitting} className="w-full rounded-xl bg-accent py-3 text-sm font-semibold text-black disabled:opacity-50 hover:brightness-110 transition-all">
          {submitting ? 'Processing...' : 'Withdraw Funds'}
        </button>
      </form>
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
