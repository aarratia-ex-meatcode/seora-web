"use client";

import { Logo } from "@/components/common/logo";
import { Block } from "@/components/primitives/block";
import { Header } from "@/components/primitives/header";
import { Main } from "@/components/primitives/main";
import { Nav } from "@/components/primitives/nav";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/dashboard/components/app-sidebar";
import { NavTabs } from "@/features/dashboard/components/nav-tabs";
import { ProfileDropdown } from "@/features/dashboard/components/profile-dropdown";
import { SiteHeader } from "@/features/dashboard/components/site-header";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { Outlet } from "react-router";

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
      {/*
      <SidebarProvider style={SIDEBAR_PROVIDER_STYLES}>
        <AppSidebar variant="sidebar" />
        <SidebarInset className="bg-background">
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
      */}

      <Block className="flex min-h-svh flex-col">
        <Block className="flex w-full flex-1 flex-col">
          <Block className="sticky top-0 z-10">
            <Header className="px-4 sm:px-8">
              <Nav className="flex h-16 flex-row items-center justify-between">
                <Block>
                  <Logo />
                </Block>
                <Block>
                  <ProfileDropdown />
                </Block>
              </Nav>
            </Header>
            <Block className="px-4 sm:px-8">
              <NavTabs />
            </Block>
          </Block>

          <Main className="flex flex-1 flex-col px-2 pt-px pb-2">
            <Block className="ring-background @container/main flex grow flex-col rounded-md ring-1">
              <Block className="px-4 py-6 lg:px-6 lg:py-8">
                <Outlet context={{ user, token }} />
              </Block>
            </Block>
          </Main>
        </Block>
      </Block>
    </>
  );
}
