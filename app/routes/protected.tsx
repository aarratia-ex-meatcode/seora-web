"use client"
import { useEffect, useState } from "react"
import { Outlet } from "react-router"
import { Loader2 } from "lucide-react"

export default function ProtectedLayout() {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const stored = localStorage.getItem("auth")
    const parsed = stored ? JSON.parse(stored) : null
    const token = parsed?.state?.token

    if (!token) {
      window.location.href = "/"
    } else {
      setChecked(true)
    }
  }, [])

  if (!checked)
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )

  return <Outlet />
}
