'use client'

import { useEffect, useState } from 'react'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'

const API = process.env.NEXT_PUBLIC_API_URL

interface FAQ { id: number; question: string; answer: string }

function SupportContent() {
  const { token, user } = useAuthStore()
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [email, setEmail] = useState(user?.email || '')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    fetch(`${API}/auth/support/`, { headers: { Authorization: `Token ${token}` } })
      .then(r => r.ok ? r.json() : { faq: [] })
      .then(d => setFaqs(d.faq || []))
  }, [token])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !subject || !message) { toast.error('Please fill all fields'); return }
    setSending(true)
    try {
      const res = await fetch(`${API}/auth/support/`, {
        method: 'POST',
        headers: { Authorization: `Token ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, subject, message }),
      })
      const data = await res.json()
      if (res.ok || res.status === 201) {
        toast.success('Message sent! We\'ll get back to you within 24 hours.')
        setSubject(''); setMessage('')
      } else {
        toast.error(data.message || 'Failed to send message')
      }
    } catch { toast.error('Network error') }
    finally { setSending(false) }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold">Support</h1>
      <p className="mt-2 text-medium-gray">We typically respond within 24 hours.</p>

      {/* FAQs */}
      {faqs.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqs.map(faq => (
              <div key={faq.id} className="rounded-xl border border-white/10 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium hover:bg-white/[0.03] transition-colors"
                >
                  <span>{faq.question}</span>
                  <span className="text-accent ml-4 text-lg">{openFaq === faq.id ? '−' : '+'}</span>
                </button>
                {openFaq === faq.id && (
                  <div className="px-5 pb-4 text-sm text-medium-gray border-t border-white/10 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact form */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
        <form onSubmit={handleSend} className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Reply email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-accent transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <input type="text" value={subject} onChange={e => setSubject(e.target.value)}
                placeholder="e.g. Issue with my withdrawal" className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-accent transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} rows={5}
                placeholder="Describe your issue in detail..." className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-accent transition-colors resize-none" />
            </div>
          </div>
          <button type="submit" disabled={sending} className="w-full rounded-xl bg-accent py-3 text-sm font-semibold text-black disabled:opacity-50 hover:brightness-110 transition-all">
            {sending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function SupportPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 lg:px-8">
        <SupportContent />
      </div>
    </ProtectedRoute>
  )
}
