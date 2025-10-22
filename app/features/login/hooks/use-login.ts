import { useNavigate } from "react-router"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { login } from "~/features/login/api/login"
import { me } from "~/features/me/api/me"
import { useUserStore } from "~/stores/user"
import { useAuthStore } from "~/stores/auth"

export function useLogin() {
  const navigate = useNavigate()
  const { setUser } = useUserStore()
  const { setToken } = useAuthStore()

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await login(data.email, data.password)

      setToken(res.token)

      const user = await me()
      
      setUser(user)

      return res
    },
    onSuccess: () => {
      toast.success("Login successful")
      navigate("/dashboard")
    },
    onError: (error: any) => {
      toast.error(error.message || "Invalid credentials")
    },
  })
}
