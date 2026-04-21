'use client'

import { useEffect, useRef, useState } from 'react'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'

const API = process.env.NEXT_PUBLIC_API_URL

interface KYCStatus {
  has_kyc: boolean
  kyc_verified: boolean
  submission?: { id: number; status: string; admin_note: string | null; created_at: string }
  message?: string
}

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  APPROVED: 'text-green-400 bg-green-400/10 border-green-400/30',
  REJECTED: 'text-red-400 bg-red-400/10 border-red-400/30',
}

function KYCContent() {
  const { token } = useAuthStore()
  const [kycStatus, setKycStatus] = useState<KYCStatus | null>(null)
  const [kycNote, setKycNote] = useState('No KYC, no withdrawal.')
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const idRef = useRef<HTMLInputElement>(null)
  const selfieRef = useRef<HTMLInputElement>(null)

  const fetchStatus = async () => {
    try {
      const [kycRes, portfolioRes] = await Promise.all([
        fetch(`${API}/auth/kyc/`, { headers: { Authorization: `Token ${token}` } }),
        fetch(`${API}/investment/portfolio/`, { headers: { Authorization: `Token ${token}` } }),
      ])
      if (kycRes.ok) setKycStatus(await kycRes.json())
      if (portfolioRes.ok) {
        const p = await portfolioRes.json()
        if (p.kyc_note) setKycNote(p.kyc_note)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchStatus() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const id_doc = idRef.current?.files?.[0]
    const selfie = selfieRef.current?.files?.[0]
    if (!id_doc || !selfie) { toast.error('Please select both files'); return }

    const form = new FormData()
    form.append('id_document', id_doc)
    form.append('selfie', selfie)

    setUploading(true)
    try {
      const res = await fetch(`${API}/auth/kyc/`, { method: 'POST', headers: { Authorization: `Token ${token}` }, body: form })
      const data = await res.json()
      if (res.ok) { toast.success('KYC submitted successfully!'); fetchStatus() }
      else toast.error(data.message || 'Submission failed')
    } catch {
      toast.error('Network error')
    } finally {
      setUploading(false)
    }
  }

  if (loading) return <div className="flex h-64 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" /></div>

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold">KYC Verification</h1>
      <p className="mt-2 text-medium-gray">Upload your ID and selfie to unlock withdrawals.</p>

      {/* Persistent notice */}
      {!kycStatus?.kyc_verified && (
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent/5 px-5 py-4">
          <span className="mt-0.5 shrink-0 text-accent text-base leading-none">ℹ</span>
          <p className="text-sm font-semibold text-white/80 leading-relaxed">
            You must verify your identity by uploading your KYC documents before you can make any withdrawals.{' '}
            <span className="text-accent">{kycNote}</span>
          </p>
        </div>
      )}

      {kycStatus?.has_kyc && kycStatus.submission && (
        <div className={`mt-6 rounded-xl border p-5 ${STATUS_STYLES[kycStatus.submission.status]}`}>
          <p className="font-semibold text-sm uppercase tracking-wide">Status: {kycStatus.submission.status}</p>
          <p className="mt-1 text-sm opacity-80">Submitted: {new Date(kycStatus.submission.created_at).toLocaleDateString()}</p>
          {kycStatus.submission.admin_note && <p className="mt-2 text-sm">Note: {kycStatus.submission.admin_note}</p>}
        </div>
      )}

      {(!kycStatus?.has_kyc || kycStatus.submission?.status === 'REJECTED') && (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Government-issued ID</label>
              <p className="text-xs text-medium-gray mb-3">Passport, driver&apos;s license, or national ID card</p>
              <input ref={idRef} type="file" accept="image/*" className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-medium-gray file:mr-4 file:rounded-lg file:border-0 file:bg-accent file:px-4 file:py-2 file:text-xs file:font-semibold file:text-black cursor-pointer" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Selfie</label>
              <p className="text-xs text-medium-gray mb-3">A clear photo of your face</p>
              <input ref={selfieRef} type="file" accept="image/*" className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-medium-gray file:mr-4 file:rounded-lg file:border-0 file:bg-accent file:px-4 file:py-2 file:text-xs file:font-semibold file:text-black cursor-pointer" />
            </div>
          </div>
          <button type="submit" disabled={uploading} className="w-full rounded-xl bg-accent py-3 text-sm font-semibold text-black disabled:opacity-50 hover:brightness-110 transition-all">
            {uploading ? 'Uploading...' : 'Submit KYC Documents'}
          </button>
        </form>
      )}

      {kycStatus?.kyc_verified && (
        <div className="mt-6 rounded-xl border border-green-400/30 bg-green-400/10 p-5">
          <p className="text-green-400 font-semibold">Your identity has been verified.</p>
          <p className="text-sm text-green-400/70 mt-1">You can now make withdrawals.</p>
        </div>
      )}

      {kycStatus?.submission?.status === 'PENDING' && (
        <p className="mt-6 text-sm text-medium-gray">Your submission is under review. You&apos;ll be notified once it&apos;s processed.</p>
      )}
    </div>
  )
}

export default function KycVerificationPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 lg:px-8">
        <KYCContent />
      </div>
    </ProtectedRoute>
  )
}
