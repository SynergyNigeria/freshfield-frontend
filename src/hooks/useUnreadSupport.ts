import { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { playNotificationSound } from '@/utils/notificationSound'

const API = process.env.NEXT_PUBLIC_API_URL

/**
 * Polls the unread support message count for the current user.
 * Plays a sound when new messages arrive.
 * Returns 0 for admins (they track unread via thread list).
 */
export function useUnreadSupport() {
  const { token, user } = useAuthStore()
  const [unread, setUnread] = useState(0)
  const prevUnread = useRef(-1) // -1 = first load, skip sound

  useEffect(() => {
    // Admins don't need this badge — they see per-thread unread counts
    if (!token || user?.is_staff) return
    prevUnread.current = -1

    const fetch_ = () => {
      fetch(`${API}/auth/support/unread/`, {
        headers: { Authorization: `Token ${token}` },
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data == null) return
          const count: number = data.unread
          if (prevUnread.current !== -1 && count > prevUnread.current) {
            playNotificationSound()
          }
          prevUnread.current = count
          setUnread(count)
        })
        .catch(() => {})
    }

    fetch_()
    const id = setInterval(fetch_, 30_000)
    return () => clearInterval(id)
  }, [token, user?.is_staff])

  return unread
}
