"use client";
import * as React from "react";
import {
  IconDashboard,
  IconBrain,
  IconQuestionMark,
  IconListDetails,
  IconChartBar,
  IconSearch,
  IconMessageCircle,
  IconBolt,
  IconCreditCard,
} from "@tabler/icons-react";
import { NavUser } from "@/features/dashboard/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useUserStore } from "~/stores/user";
import { NavMain } from "@/features/dashboard/components/nav-main";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUserStore();
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated)
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
                  <IconBrain className="!size-5" />
                  <span className="text-base font-semibold">seora.ai</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      </Sidebar>
    );

  const data = {
    user: {
      name: user?.name || "Usuario",
      email: user?.email || "Sin correo",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: IconDashboard,
      },
      {
        title: "AEO",
        icon: IconBrain,
        children: [
          {
            title: "AEO Analysis",
            url: "/dashboard/aeo/analysis",
            icon: IconChartBar,
          },
          {
            title: "Preguntas Relacionadas",
            url: "/dashboard/aeo/questions",
            icon: IconQuestionMark,
          },
          {
            title: "Plan de Acción",
            url: "/dashboard/aeo/plan",
            icon: IconListDetails,
          },
          {
            title: "AI Scoring",
            url: "/dashboard/aeo/scoring",
            icon: IconChartBar,
          },
        ],
      },
      {
        title: "SEO",
        icon: IconSearch,
        children: [
          {
            title: "Auditoría SEO",
            url: "/dashboard/seo/audit",
            icon: IconChartBar,
          },
          {
            title: "Competencia",
            url: "/dashboard/seo/competitors",
            icon: IconListDetails,
          },
        ],
      },
      {
        title: "Comunicación",
        icon: IconMessageCircle,
        children: [
          {
            title: "Soporte",
            url: "/dashboard/communication/support",
            icon: IconBolt,
          },
          {
            title: "Pricing",
            url: "/dashboard/communication/pricing",
            icon: IconCreditCard,
          },
        ],
      },
    ],
  };

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
                <IconBrain className="!size-5" />
                <span className="text-base font-semibold">seora.ai</span>
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
  );
}
