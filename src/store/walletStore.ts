import { create } from 'zustand'

interface Wallet {
  id: number
  balance: string
  currency: string
}

interface WalletStore {
  wallet: Wallet | null
  setWallet: (wallet: Wallet) => void
  updateBalance: (newBalance: string) => void
}

export const useWalletStore = create<WalletStore>((set) => ({
  wallet: null,
  setWallet: (wallet) => set({ wallet }),
  updateBalance: (newBalance) =>
    set((state) => ({
      wallet: state.wallet ? { ...state.wallet, balance: newBalance } : null,
    })),
}))
