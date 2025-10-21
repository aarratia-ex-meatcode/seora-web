"use client"
import * as React from "react"
import {
  IconDashboard,
  IconListDetails,
  IconInnerShadowTop,
} from "@tabler/icons-react"
import { NavMain } from "@/features/dashboard/components/nav-main"
import { NavUser } from "@/features/dashboard/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useUserStore } from "@/stores/user-store"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUserStore()
  const [hydrated, setHydrated] = React.useState(false)

  React.useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    return (
      <Sidebar collapsible="offcanvas" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                <a href="#">
                  <IconInnerShadowTop className="!size-5" />
                  <span className="text-base font-semibold">Seora</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      </Sidebar>
    )
  }

  const data = {
    user: {
      name: user?.name || "Usuario",
      email: user?.email || "Sin correo",
    },
    navMain: [
      { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
      { title: "Users", url: "/dashboard/users", icon: IconListDetails },
    ],
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Seora</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
