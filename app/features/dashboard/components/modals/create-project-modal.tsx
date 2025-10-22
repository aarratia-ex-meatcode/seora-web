"use client";
import { useState } from "react";
import countries from "@/data/countries.json";
import { ChevronDown, Plus, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useAddProject } from "@/features/dashboard/hooks/use-add-project";
import { BaseModal } from "@/features/dashboard/components/base-modal";
import { useUserStore } from "~/stores/user";

export function CreateProjectModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { user } = useUserStore();
  const addProjectMutation = useAddProject();

  const [countryOpen, setCountryOpen] = useState(false);
  const [form, setForm] = useState({ name: "", domain: "", country: "" });
  const [settings, setSettings] = useState<{ key: string; value: string }[]>(
    []
  );
  const [error, setError] = useState("");

  const addSetting = () =>
    setSettings((prev) => [...prev, { key: "", value: "" }]);
  const removeSetting = (i: number) =>
    setSettings((prev) => prev.filter((_, idx) => idx !== i));
  const updateSetting = (i: number, field: string, val: string) => {
    const updated = [...settings];
    updated[i] = { ...updated[i], [field]: val };
    setSettings(updated);
  };

  const isValidDomain = (domain: string) =>
    /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/.test(domain);

  const handleSubmit = async () => {
    if (!isValidDomain(form.domain)) {
      setError("Dominio inválido");
      return;
    }
    setError("");

    const payload = {
      user_id: String(user?.id ?? ""),
      name: form.name,
      domain: form.domain,
      country: form.country || "",
      settings: settings.reduce(
        (acc, s) => {
          if (s.key) acc[s.key] = s.value;
          return acc;
        },
        {} as Record<string, string>
      ),
    };

    addProjectMutation.mutate(payload, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title="Crear nuevo proyecto"
      onConfirm={handleSubmit}
      loading={addProjectMutation.isPending}
    >
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
                            setForm({ ...form, country: c.code });
                            setCountryOpen(false);
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
    </BaseModal>
  );
}
