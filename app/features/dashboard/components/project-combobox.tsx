import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import type { Project } from "~/stores/project";
import { useProjectStore } from "~/stores/project";
import { useUserStore } from "~/stores/user";

const projects = [
  {
    id: "proj-001",
    name: "TechBlog España",
    domain: "techblog.es",
    country: "ES",
  },
  {
    id: "proj-002",
    name: "Ecommerce Moda",
    domain: "modafashion.com",
    country: "ES",
  },
  {
    id: "proj-003",
    name: "Portal de Noticias",
    domain: "noticias.es",
    country: "ES",
  },
  {
    id: "proj-004",
    name: "SaaS CRM Global",
    domain: "crmsolutions.io",
    country: null,
  },
  {
    id: "proj-005",
    name: "Blog de Marketing",
    domain: "marketingpro.es",
    country: "ES",
  },
  {
    id: "proj-006",
    name: "Travel Guide",
    domain: "viajeslatinos.com",
    country: "MX",
  },
  {
    id: "proj-007",
    name: "E-learning Platform",
    domain: "educatech.io",
    country: null,
  },
  {
    id: "proj-008",
    name: "Restaurante Online",
    domain: "saboresdelbarrio.es",
    country: "ES",
  },
];

export function ProjectCombobox() {
  const { user } = useUserStore();
  const { currentProject, setProject } = useProjectStore();
  const projectsList = (user?.projects || projects) as Project[];

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(currentProject?.id || "");

  const selectedProject = projectsList.find(project => project.id === value);
  const buttonMessage = value
    ? selectedProject?.name
    : "Seleccionar proyecto...";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="hover:bg-primary/20 w-[12.5rem] justify-between font-medium shadow-none"
        >
          {buttonMessage}
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[12.5rem] p-0">
        <Command>
          <CommandList>
            <CommandEmpty className="p-4 text-center text-sm">
              No hay proyectos disponibles.
            </CommandEmpty>
            <CommandGroup>
              {projectsList.map(project => (
                <CommandItem
                  key={project.id}
                  value={project.id}
                  onSelect={currentValue => {
                    setValue(currentValue);
                    setOpen(false);
                    setProject(project);
                  }}
                >
                  {project.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === project.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
