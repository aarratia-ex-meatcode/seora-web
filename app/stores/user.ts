import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Credit {
  balance: number
}

interface Project {
  id: string
  name: string
  domain: string
}

interface User {
  id: string
  name: string
  email: string
  projects: Project[]
  credit: Credit
}

interface UserState {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user", 
    }
  )
)
