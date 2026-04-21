import { create } from 'zustand'

interface Crypto {
  id: number
  symbol: string
  name: string
  current_price: string
  market_cap: string
}

interface Portfolio {
  id: number
  holdings: any[]
  total_value: number
  total_invested: string
  total_profit: string
  portfolio_amount: string
  withdrawal_amount: string
  withdrawal_note: string
  kyc_note: string
}

interface InvestmentStore {
  cryptos: Crypto[]
  portfolio: Portfolio | null
  setCryptos: (cryptos: Crypto[]) => void
  setPortfolio: (portfolio: Portfolio) => void
}

export const useInvestmentStore = create<InvestmentStore>((set) => ({
  cryptos: [],
  portfolio: null,
  setCryptos: (cryptos) => set({ cryptos }),
  setPortfolio: (portfolio) => set({ portfolio }),
}))
