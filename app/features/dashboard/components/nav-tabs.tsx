import { Block } from "@/components/primitives/block";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTabIndicator } from "@/features/dashboard/hooks/use-nav-tab-indicator";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router";

type TabValue = "dashboard" | "aeo-analysis";

interface NavTab {
  label: string;
  value: TabValue;
  to: string;
}

const NAVIGATION_TABS: NavTab[] = [
  {
    label: "Dashboard",
    value: "dashboard",
    to: "/dashboard",
  },
  {
    label: "AEO Analysis",
    value: "aeo-analysis",
    to: "/dashboard/aeo/analysis",
  },
];

interface NavTabsProps {
  className?: string;
  triggerClassName?: string;
}

function NavTabs({ className, triggerClassName }: NavTabsProps) {
  const location = useLocation();

  const getActiveTab = () => {
    const cb = (tab: NavTab) => location.pathname === tab.to;
    const matchingTab = NAVIGATION_TABS.find(cb);

    return matchingTab ? matchingTab.value : NAVIGATION_TABS[0].value;
  };

  const activeTab = getActiveTab();
  const tabsRef = useTabIndicator(activeTab);

  const isCurrentPage = (tabValue: string) => {
    return activeTab === tabValue ? "page" : undefined;
  };

  return (
    <Tabs value={activeTab} className="relative" ref={tabsRef}>
      <TabsList
        className={cn("flex h-11 flex-row gap-x-6 bg-transparent", className)}
      >
        {NAVIGATION_TABS.map(tab => {
          const ariaCurrent = isCurrentPage(tab.value);

          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "group text-foreground hover:text-foreground relative px-0 pb-3 text-sm font-medium data-[state=active]:shadow-none",
                triggerClassName,
              )}
              asChild
            >
              <Link to={tab.to} aria-current={ariaCurrent}>
                <Block
                  as="span"
                  className="group-hover:bg-primary -mx-2.5 inline-flex h-8 flex-row items-center justify-center rounded-md px-2.5 transition-[color,background-color]"
                >
                  {tab.label}
                </Block>
              </Link>
            </TabsTrigger>
          );
        })}
      </TabsList>

      <Block
        className="bg-primary absolute bottom-0 h-0.5 transition-all duration-200"
        style={{
          width: "var(--indicator-width, 0)",
          left: "var(--indicator-left, 0)",
        }}
      />
    </Tabs>
  );
}

export { NavTabs };
