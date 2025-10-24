"use client";

import { Block } from "@/components/primitives/block";
import { Header } from "@/components/primitives/header";
import { Nav } from "@/components/primitives/nav";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/dashboard/components/app-sidebar";
import { NavTabs } from "@/features/dashboard/components/nav-tabs";
import { SiteHeader } from "@/features/dashboard/components/site-header";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { Link, Outlet } from "react-router";

const SIDEBAR_WIDTH = "calc(var(--spacing) * 72)";
const HEADER_HEIGHT = "calc(var(--spacing) * 12)";

const SIDEBAR_PROVIDER_STYLES = {
  "--sidebar-width": SIDEBAR_WIDTH,
  "--header-height": HEADER_HEIGHT,
} as React.CSSProperties;

export default function DashboardLayout() {
  const { token } = useAuthStore();
  const { user } = useUserStore();

  return (
    <>
      <SidebarProvider style={SIDEBAR_PROVIDER_STYLES}>
        {/* <AppSidebar variant="sidebar" /> */}
        <SidebarInset className="bg-background">
          <Block className="sticky top-0 z-10">
            <Header className="px-4 sm:px-8">
              <Nav className="flex h-16 flex-row items-center justify-between">
                <Block>
                  <Link to="/">seora.ai</Link>
                </Block>
                <Block></Block>
              </Nav>
            </Header>

            <Block className="px-4 sm:px-8">
              <NavTabs />
            </Block>
          </Block>

          <SiteHeader />

          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 p-6 lg:p-8">
                <Outlet context={{ user, token }} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
