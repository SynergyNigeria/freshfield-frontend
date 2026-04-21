'use client'

import { useEffect, useRef, useState } from 'react'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useAuthStore } from '@/store/authStore'
import { playNotificationSound } from '@/utils/notificationSound'

const API = process.env.NEXT_PUBLIC_API_URL

interface Message {
  id: number
  sender_is_admin: boolean
  message: string
  is_read: boolean
  created_at: string
}

interface Thread {
  user_id: number
  username: string
  email: string
  unread: number
  last_message: string
  last_at: string | null
}

// ─── User Chat ────────────────────────────────────────────────────────────────
function UserChat({ token }: { token: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const fetchMessages = async () => {
    const res = await fetch(`${API}/auth/support/`, {
      headers: { Authorization: `Token ${token}` },
    })
    if (res.ok) setMessages(await res.json())
  }

  useEffect(() => {
    fetchMessages()
    const t = setInterval(fetchMessages, 6000)
    return () => clearInterval(t)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    setSending(true)
    try {
      const res = await fetch(`${API}/auth/support/`, {
        method: 'POST',
        headers: { Authorization: `Token ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      })
      if (res.ok) {
        setText('')
        await fetchMessages()
      }
    } finally { setSending(false) }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">F</div>
        <div>
          <p className="font-semibold text-sm">Freshfield Support</p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-medium-gray text-center">No messages yet. Send a message and our team will reply shortly.</p>
          </div>
        )}
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender_is_admin ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
              msg.sender_is_admin
                ? 'bg-white/10 text-white rounded-tl-sm'
                : 'bg-accent text-black rounded-tr-sm'
            }`}>
              <p>{msg.message}</p>
              <p className={`text-[10px] mt-1 ${msg.sender_is_admin ? 'text-white/40' : 'text-black/50'}`}>
                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="flex items-center gap-3 mt-3">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
        />
        <button
          type="submit"
          disabled={sending || !text.trim()}
          className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-black disabled:opacity-40 hover:brightness-110 transition-all"
        >
          Send
        </button>
      </form>
    </div>
  )
}

// ─── Admin: Thread List ───────────────────────────────────────────────────────
function AdminThreadList({ token, onSelect }: { token: string; onSelect: (t: Thread) => void }) {
  const [threads, setThreads] = useState<Thread[]>([])
  const [loading, setLoading] = useState(true)
  const prevTotalUnread = useRef(-1) // -1 = first load, skip sound

  const fetchThreads = async () => {
    const res = await fetch(`${API}/auth/support/`, { headers: { Authorization: `Token ${token}` } })
    if (res.ok) {
      const data: Thread[] = await res.json()
      const total = data.reduce((sum, t) => sum + t.unread, 0)
      if (prevTotalUnread.current !== -1 && total > prevTotalUnread.current) {
        playNotificationSound()
      }
      prevTotalUnread.current = total
      setThreads(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchThreads()
    const t = setInterval(fetchThreads, 8000)
    return () => clearInterval(t)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <div className="flex h-40 items-center justify-center"><div className="h-7 w-7 animate-spin rounded-full border-2 border-accent border-t-transparent" /></div>

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Support Chats</h1>
      <p className="text-medium-gray text-sm mb-6">{threads.length} active conversation{threads.length !== 1 ? 's' : ''}</p>

      {threads.length === 0 ? (
        <div className="text-center py-16 text-medium-gray">No conversations yet.</div>
      ) : (
        <div className="space-y-2">
          {threads.map(t => (
            <button
              key={t.user_id}
              onClick={() => onSelect(t)}
              className="w-full flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-left hover:bg-white/[0.05] transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold shrink-0">
                {t.email.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{t.email}</p>
                <p className="text-xs text-medium-gray truncate mt-0.5">{t.last_message || '—'}</p>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-1">
                {t.last_at && <p className="text-[10px] text-white/30">{new Date(t.last_at).toLocaleDateString()}</p>}
                {t.unread > 0 && (
                  <span className="bg-accent text-black text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                    {t.unread}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Admin: Specific Chat ─────────────────────────────────────────────────────
function AdminChat({ token, thread, onBack }: { token: string; thread: Thread; onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const fetchMessages = async () => {
    const res = await fetch(`${API}/auth/support/${thread.user_id}/reply/`, {
      headers: { Authorization: `Token ${token}` },
    })
    if (res.ok) setMessages(await res.json())
  }

  useEffect(() => {
    fetchMessages()
    const t = setInterval(fetchMessages, 6000)
    return () => clearInterval(t)
  }, [thread.user_id]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendReply = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    setSending(true)
    try {
      const res = await fetch(`${API}/auth/support/${thread.user_id}/reply/`, {
        method: 'POST',
        headers: { Authorization: `Token ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      })
      if (res.ok) {
        setText('')
        await fetchMessages()
      }
    } finally { setSending(false) }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack} className="text-medium-gray hover:text-white transition-colors mr-1">
          ← Back
        </button>
        <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm shrink-0">
          {thread.email.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-sm">{thread.email}</p>
          <p className="text-xs text-medium-gray">User ID: {thread.user_id}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-medium-gray">No messages yet.</p>
          </div>
        )}
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender_is_admin ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
              msg.sender_is_admin
                ? 'bg-accent text-black rounded-tr-sm'
                : 'bg-white/10 text-white rounded-tl-sm'
            }`}>
              <p>{msg.message}</p>
              <p className={`text-[10px] mt-1 ${msg.sender_is_admin ? 'text-black/50' : 'text-white/40'}`}>
                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendReply} className="flex items-center gap-3 mt-3">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Reply..."
          className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
        />
        <button
          type="submit"
          disabled={sending || !text.trim()}
          className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-black disabled:opacity-40 hover:brightness-110 transition-all"
        >
          Reply
        </button>
      </form>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function SupportContent() {
  const { token, user, setUser } = useAuthStore()
  const [activeThread, setActiveThread] = useState<Thread | null>(null)
  const [profileReady, setProfileReady] = useState(false)

  // Always fetch fresh profile so is_staff is up-to-date
  useEffect(() => {
    if (!token) return
    fetch(`${API}/auth/profile/`, { headers: { Authorization: `Token ${token}` } })
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data) setUser(data) })
      .catch(() => {})
      .finally(() => setProfileReady(true))
  }, [token, setUser])

  if (!token || !profileReady) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    )
  }

  if (user?.is_staff) {
    if (activeThread) {
      return <AdminChat token={token} thread={activeThread} onBack={() => setActiveThread(null)} />
    }
    return <AdminThreadList token={token} onSelect={setActiveThread} />
  }

  return <UserChat token={token} />
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
