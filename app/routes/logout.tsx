import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { useEffect } from "react";

export default function Logout() {
  const { clearToken } = useAuthStore();
  const { clearUser } = useUserStore();

  useEffect(() => {
    clearToken();
    clearUser();
    window.location.href = "/";
  }, []);

  return null;
}
