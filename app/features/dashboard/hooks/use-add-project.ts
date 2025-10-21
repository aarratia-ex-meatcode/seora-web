import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { addProject } from "@/features/dashboard/api/projects.api"
import { me } from "@/features/me/api/me.api"
import { useUserStore } from "@/stores/user-store"

export function useAddProject() {
  const { setUser } = useUserStore()

  return useMutation({
    mutationFn: async (data: {
      user_id: string
      name: string
      domain: string
      country?: string
      settings?: Record<string, any>
    }) => {
      const project = await addProject(data)
      const user = await me()
      setUser(user)
      return project
    },
    onSuccess: () => {
      toast.success("Proyecto creado correctamente")
    },
    onError: (error: any) => {
      toast.error(error.message || "Error al crear el proyecto")
    },
  })
}
