'use client'

import { useEffect, useState } from 'react'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'

const API = process.env.NEXT_PUBLIC_API_URL

interface Notification {
  id: number
  title: string
  message: string
  is_read: boolean
  created_at: string
}

function NotificationsContent() {
  const { token } = useAuthStore()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API}/auth/notifications/`, { headers: { Authorization: `Token ${token}` } })
      .then(r => r.ok ? r.json() : [])
      .then(setNotifications)
      .finally(() => setLoading(false))
  }, [token])

  const markRead = async (id: number) => {
    await fetch(`${API}/auth/notifications/${id}/read/`, { method: 'POST', headers: { Authorization: `Token ${token}` } })
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n))
    toast.success('Marked as read')
  }

  const unreadCount = notifications.filter(n => !n.is_read).length

  if (loading) return <div className="flex h-64 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" /></div>

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Notifications</h1>
        {unreadCount > 0 && <span className="rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-semibold px-3 py-1">{unreadCount} unread</span>}
      </div>

      {notifications.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-4xl mb-3">🔔</p>
          <p className="text-medium-gray">No notifications yet.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {notifications.map(n => (
            <div key={n.id} className={`rounded-2xl border p-5 transition-colors ${n.is_read ? 'border-white/10 bg-white/[0.02]' : 'border-accent/20 bg-accent/[0.04]'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {!n.is_read && <span className="w-2 h-2 rounded-full bg-accent shrink-0" />}
                    <p className="font-semibold text-sm">{n.title}</p>
                  </div>
                  <p className="text-sm text-medium-gray">{n.message}</p>
                  <p className="text-xs text-white/30 mt-2">{new Date(n.created_at).toLocaleString()}</p>
                </div>
                {!n.is_read && (
                  <button onClick={() => markRead(n.id)} className="shrink-0 text-xs text-accent border border-accent/30 rounded-lg px-3 py-1.5 hover:bg-accent/10 transition-colors">
                    Mark read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function NotificationsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 lg:px-8">
        <NotificationsContent />
      </div>
    </ProtectedRoute>
  )
}
