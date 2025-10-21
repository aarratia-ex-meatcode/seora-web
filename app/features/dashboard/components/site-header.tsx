"use client"
import { useState } from "react"
import countries from "@/data/countries.json"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown, Plus, X, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUserStore } from "@/stores/user-store"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useAddProject } from "@/features/dashboard/hooks/use-add-project"

export function SiteHeader() {
  const { user } = useUserStore()
  const projects = user?.projects || []
  const currentProject = projects[0]?.name || "Sin proyectos"
  const credits = user?.credit?.balance ?? 0
  const [open, setOpen] = useState(false)
  const [countryOpen, setCountryOpen] = useState(false)
  const [form, setForm] = useState({
    name: "",
    domain: "",
    country: "",
  })
  const [settings, setSettings] = useState<{ key: string; value: string }[]>([])
  const [error, setError] = useState("")
  const addProjectMutation = useAddProject()

  const addSetting = () => setSettings([...settings, { key: "", value: "" }])
  const removeSetting = (i: number) =>
    setSettings(settings.filter((_, idx) => idx !== i))
  const updateSetting = (i: number, field: string, val: string) => {
    const updated = [...settings]
    updated[i] = { ...updated[i], [field]: val }
    setSettings(updated)
  }

  const isValidDomain = (domain: string) => {
    const pattern = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/
    return pattern.test(domain)
  }

  const handleSubmit = async () => {
    if (!isValidDomain(form.domain)) {
      setError("Dominio inválido")
      return
    }
    setError("")

    const payload = {
      user_id: String(user?.id ?? ""),
      name: form.name,
      domain: form.domain,
      country: form.country || "",
      settings: settings.reduce((acc, s) => {
        if (s.key) acc[s.key] = s.value
        return acc
      }, {} as Record<string, string>),
    }

    addProjectMutation.mutate(payload, {
      onSuccess: () => setOpen(false),
    })
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-white px-4">
      <div className="flex items-center gap-2 w-full">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-5" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[160px] justify-between">
              {currentProject}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px]">
            {projects.map((p) => (
              <DropdownMenuItem key={p.id}>{p.name}</DropdownMenuItem>
            ))}
            <DropdownMenuItem
              className="text-blue-600"
              onClick={() => setOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" /> Crear nuevo proyecto
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-4 ml-auto">
          <Badge variant="secondary" className="text-xs px-3 py-1">
            {credits > 0
              ? `FREE · ${credits} créditos restantes`
              : "Sin créditos"}
          </Badge>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Crear nuevo proyecto</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Nombre</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <Label>Dominio</Label>
              <Input
                value={form.domain}
                onChange={(e) => setForm({ ...form, domain: e.target.value })}
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            <div>
              <Label>País</Label>
              <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {form.country
                      ? countries.find((c) => c.code === form.country)?.name
                      : "Seleccionar país..."}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="Buscar país..." />
                    <CommandList>
                      <CommandEmpty>No se encontró país</CommandEmpty>
                      <ScrollArea className="h-72">
                        <CommandGroup>
                          {countries.map((c) => (
                            <CommandItem
                              key={c.code}
                              value={c.name}
                              onSelect={() => {
                                setForm({ ...form, country: c.code })
                                setCountryOpen(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  form.country === c.code
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {c.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </ScrollArea>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Settings</Label>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={addSetting}
                  type="button"
                >
                  <Plus className="h-4 w-4 mr-1" /> Añadir
                </Button>
              </div>
              {settings.map((s, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <Input
                    placeholder="Key"
                    value={s.key}
                    onChange={(e) => updateSetting(i, "key", e.target.value)}
                  />
                  <Input
                    placeholder="Value"
                    value={s.value}
                    onChange={(e) => updateSetting(i, "value", e.target.value)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSetting(i)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit} disabled={addProjectMutation.isPending}>
              {addProjectMutation.isPending ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  )
}
