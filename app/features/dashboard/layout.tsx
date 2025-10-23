"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/dashboard/components/app-sidebar";
import { SiteHeader } from "@/features/dashboard/components/site-header";
import { Outlet } from "react-router";
import { useAuthStore } from "~/stores/auth";
import { useUserStore } from "~/stores/user";

const SIDEBAR_WIDTH = "calc(var(--spacing) * 72)";
const HEADER_HEIGHT = "calc(var(--spacing) * 12)";

const SIDEBAR_PROVIDER_STYLES = {
  "--sidebar-width": SIDEBAR_WIDTH,
  "--header-height": HEADER_HEIGHT,
} as React.CSSProperties;

export default function Page() {
  const { token } = useAuthStore();
  const { user } = useUserStore();

  return (
    <SidebarProvider style={SIDEBAR_PROVIDER_STYLES}>
      <AppSidebar variant="sidebar" />
      <SidebarInset className="bg-background">
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4">
              <div className="p-6 lg:p-8">
                <Outlet context={{ user, token }} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
