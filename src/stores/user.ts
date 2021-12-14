import { User } from 'types'
import create from 'zustand'

type AuthState = {
  user?: User
  setUser: (user?: User) => void
}

const useAuth = create<AuthState>((set) => ({
  user: undefined,
  setUser: (user: User | undefined) =>
    set(() => {
      return { user }
    }),
}))

export default useAuth
