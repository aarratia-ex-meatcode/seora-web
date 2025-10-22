"use client"
import * as React from "react"
import { type Icon } from "@tabler/icons-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  url?: string
  icon?: Icon
  children?: NavItem[]
}

export function NavMain({ items }: { items: NavItem[] }) {
  const [open, setOpen] = React.useState<string | null>(null)

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <React.Fragment key={item.title}>
              <SidebarMenuItem>
                {item.children ? (
                  <button
                    onClick={() =>
                      setOpen(open === item.title ? null : item.title)
                    }
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted",
                      open === item.title && "bg-muted"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        open === item.title && "rotate-180"
                      )}
                    />
                  </button>
                ) : (
                  <SidebarMenuButton asChild>
                    <a href={item.url!}>
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>

              {item.children && open === item.title && (
                <div className="ml-5 mt-1 flex flex-col gap-1">
                  {item.children.map((child) => (
                    <a
                      key={child.title}
                      href={child.url}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted"
                    >
                      {child.icon && <child.icon className="h-4 w-4" />}
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
  )
}
