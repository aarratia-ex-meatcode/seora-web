"use client"
import { useEffect } from "react"
import { Outlet } from "react-router"

export default function ProtectedLayout() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("auth")
      const parsed = stored ? JSON.parse(stored) : null
      const token = parsed?.state?.token

      if (!token) {
        window.location.href = "/"
      }
    }
  }, [])

  return <Outlet />
}
