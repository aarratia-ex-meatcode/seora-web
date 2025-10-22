"use client";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  const [form, setForm] = useState({ name: "", domain: "" });
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
