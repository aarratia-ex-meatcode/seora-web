"use client";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "~/stores/user";
import { useProjectStore } from "~/stores/project";
import type { Project } from "~/stores/project";
import { CreateProjectModal } from "./modals/create-project-modal";

export function SiteHeader() {
  const { user } = useUserStore();
  const { currentProject, setProject } = useProjectStore();
  const projects = (user?.projects || []) as Project[];
  const credits = user?.credit?.balance ?? 0;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!currentProject && projects.length > 0) {
      setProject(projects[0]);
    }
  }, [projects, currentProject, setProject]);

  return (
    <header className="flex shrink-0 items-center justify-between border-b bg-transparent px-8 py-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-5" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="min-w-[180px] justify-between rounded-xl border-gray-300 text-sm font-normal"
            >
              {currentProject?.name || "Sin proyectos"}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            className="w-[220px] rounded-xl shadow-sm"
          >
            {projects.map(p => (
              <DropdownMenuItem
                key={p.id}
                onClick={() => setProject(p)}
                className="text-sm"
              >
                {p.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem
              className="text-sm font-medium text-blue-600"
              onClick={() => setOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Crear nuevo proyecto
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2">
        {credits > 0 ? (
          <>
            <Badge
              variant="outline"
              className="rounded-full border-blue-200 bg-blue-50 px-3 text-xs text-blue-600"
            >
              FREE
            </Badge>
            <span className="text-sm text-gray-600">
              {credits} créditos restantes
            </span>
          </>
        ) : (
          <Badge
            variant="secondary"
            className="text-foreground bg-background rounded-full px-3 py-1 text-xs"
          >
            Sin créditos
          </Badge>
        )}
      </div>

      <CreateProjectModal open={open} onOpenChange={setOpen} />
    </header>
  );
}
