'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { authAPI } from '@/lib/api'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from 'feather-icons-react'

export default function SettingsPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('All fields are required')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match')
      return
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long')
      return
    }

    try {
      setLoading(true)
      const response = await authAPI.changePassword({
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      })

      toast.success('Password updated successfully!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || error.message || 'Failed to update password'
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white pb-20">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-6">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Settings</h1>
              <p className="mt-2 text-slate-400">Manage your account preferences</p>
            </div>

            {/* Account Information Card */}
            <div className="rounded-[20px] bg-black/40 p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-white">Account Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-500 uppercase tracking-wide">Email</label>
                  <p className="mt-2 text-white font-semibold">{user?.email || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm text-slate-500 uppercase tracking-wide">Full Name</label>
                  <p className="mt-2 text-white font-semibold">
                    {user?.first_name} {user?.last_name || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Reset Password Card */}
            <div className="rounded-[20px] bg-black/40 p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-white">Change Password</h2>
              <form onSubmit={handleResetPassword} className="space-y-4">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter your current password"
                      className="w-full rounded-lg bg-white/5 px-4 py-3 pr-12 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter your new password"
                      className="w-full rounded-lg bg-white/5 px-4 py-3 pr-12 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">Must be at least 8 characters long</p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your new password"
                      className="w-full rounded-lg bg-white/5 px-4 py-3 pr-12 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !currentPassword || !newPassword || !confirmPassword}
                  className="w-full rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-black hover:bg-yellow-400 transition-all disabled:opacity-50 mt-6"
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>

            {/* Security Tips */}
            <div className="rounded-[20px] bg-black/40 p-6 sm:p-8 border-l-4 border-l-accent">
              <h3 className="text-lg font-bold text-white mb-2">Security Tips</h3>
              <ul className="text-slate-400 text-sm space-y-2">
                <li>• Use a strong password with uppercase, lowercase, numbers, and symbols</li>
                <li>• Never share your password with anyone</li>
                <li>• Change your password regularly for better security</li>
                <li>• Use a unique password that you don't use elsewhere</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
