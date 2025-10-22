import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { getProviders } from "@/features/dashboard/api/provider"

interface ProviderState {
    providers: string[]
    loading: boolean
    fetchProviders: () => Promise<void>
    clearProviders: () => void
}

export const useProviderStore = create<ProviderState>()(
    persist(
        (set, get) => ({
            providers: [],
            loading: false,
            fetchProviders: async () => {
                const current = get().providers
                if (current.length > 0) return

                set({ loading: true })
                try {
                    const data = await getProviders()
                    const providers = data.map((p: any) => p.slug)
                    set({ providers })
                } catch {
                    set({ providers: [] })
                } finally {
                    set({ loading: false })
                }
            },
            clearProviders: () => set({ providers: [] }),
        }),
        {
            name: "providers",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)
