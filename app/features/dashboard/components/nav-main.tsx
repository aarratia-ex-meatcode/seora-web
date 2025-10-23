"use client";
import * as React from "react";
import { type Icon } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  url?: string;
  icon?: Icon;
  children?: NavItem[];
}

export function NavMain({ items }: { items: NavItem[] }) {
  const [open, setOpen] = React.useState<string | null>(null);

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map(item => (
            <React.Fragment key={item.title}>
              <SidebarMenuItem>
                {item.children ? (
                  <button
                    onClick={() =>
                      setOpen(open === item.title ? null : item.title)
                    }
                    className={cn(
                      "hover:bg-primary flex w-full items-center justify-between rounded-lg p-3 text-sm font-medium",
                      open === item.title && "bg-primary",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon && <item.icon className="h-5 w-5" />}
                      <span>{item.title}</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform",
                        open === item.title && "rotate-180",
                      )}
                    />
                  </button>
                ) : (
                  <SidebarMenuButton
                    size="lg"
                    className="hover:bg-primary p-3 text-sm font-medium [&>svg]:size-5"
                    asChild
                  >
                    <a href={item.url!}>
                      {item.icon && <item.icon className="h-5 w-5" />}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>

              {item.children && open === item.title && (
                <div className="mt-1 ml-5 flex flex-col gap-1">
                  {item.children.map(child => (
                    <a
                      key={child.title}
                      href={child.url}
                      className="text-muted-foreground hover:text-primary-foreground hover:bg-primary flex items-center gap-2 rounded-lg p-3 px-3 py-2 text-sm"
                    >
                      {child.icon && <child.icon className="h-5 w-5" />}
                      {child.title}
                    </a>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
