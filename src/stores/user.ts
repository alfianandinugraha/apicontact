import { User } from 'types'
import create from 'zustand'

type AuthState = {
  user?: User
  isLoading: boolean
  setIsLoading: (state: boolean) => void
  setUser: (user?: User) => void
}

const useAuth = create<AuthState>((set) => ({
  user: undefined,
  isLoading: true,
  setIsLoading: (payload) => {
    set(() => {
      return {
        isLoading: payload,
      }
    })
  },
  setUser: (user: User | undefined) =>
    set(() => {
      return { user }
    }),
}))

export default useAuth
