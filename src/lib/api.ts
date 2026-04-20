import axios from 'axios'
import { useAuthStore } from '@/store/authStore'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://freshfieldsinc.pythonanywhere.com/api'

const api = axios.create({
  baseURL: API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Token ${token}`
  }
  return config
})

export const authAPI = {
  register: (data: any) => api.post('/auth/register/', data),
  login: (data: any) => api.post('/auth/login/', data),
  getProfile: () => api.get('/auth/profile/'),
  updateProfile: (data: any) => api.put('/auth/profile/', data),
  changePassword: (data: any) => api.post('/auth/change-password/', data),
}

export const walletAPI = {
  getWallet: () => api.get('/wallet/'),
  deposit: (data: any) => api.post('/wallet/deposit/', data),
  withdraw: (data: any) => api.post('/wallet/withdrawal/', data),
  getTransactions: () => api.get('/wallet/transactions/'),
}

export const investmentAPI = {
  getCryptos: () => api.get('/investment/cryptos/'),
  getPortfolio: () => api.get('/investment/portfolio/'),
  buy: (data: any) => api.post('/investment/buy/', data),
  sell: (data: any) => api.post('/investment/sell/', data),
  getHistory: () => api.get('/investment/history/'),
}

export default api
