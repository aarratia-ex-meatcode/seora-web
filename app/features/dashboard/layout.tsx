"use client"
import { AppSidebar } from "@/features/dashboard/components/app-sidebar"
import { SiteHeader } from "@/features/dashboard/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router"
import { useAuthStore } from "~/stores/auth"
import { useUserStore } from "~/stores/user"

export default function Page() {
  const { token } = useAuthStore()
  const { user } = useUserStore()

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
          "background-color": "var(--background)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="sidebar" />
      <SidebarInset className="bg-white">
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <Outlet context={{ user, token }} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
