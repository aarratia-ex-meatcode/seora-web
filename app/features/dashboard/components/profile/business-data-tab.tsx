"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useProjectStore } from "~/stores/project";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAddProject } from "@/features/dashboard/hooks/use-add-project";
import { useUserStore } from "~/stores/user";

export function BusinessDataTab() {
  const { currentProject } = useProjectStore();
  const { user } = useUserStore();
  const addProjectMutation = useAddProject();

  const [form, setForm] = useState({ domain: "", name: "", country: "" });
  const [original, setOriginal] = useState({ domain: "", name: "" });
  const [openConfirm, setOpenConfirm] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentProject) {
      setForm({
        domain: currentProject.domain || "",
        name: currentProject.name || "",
        country: currentProject.country || "",
      });
      setOriginal({
        domain: currentProject.domain || "",
        name: currentProject.name || "",
      });
    }
  }, [currentProject]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isValidDomain = (domain: string) =>
    /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/.test(domain);

  const handleSave = () => {
    const nameChanged =
      form.name.trim() !== "" && form.name.trim() !== original.name.trim();
    const domainChanged =
      form.domain.trim() !== "" &&
      form.domain.trim() !== original.domain.trim();

    if (nameChanged && domainChanged) {
      if (!isValidDomain(form.domain)) {
        setError("Dominio inválido");
        return;
      }
      setError("");
      setOpenConfirm(true);
    }
  };

  const confirmSave = async () => {
    setOpenConfirm(false);

    const payload = {
      user_id: String(user?.id ?? ""),
      name: form.name.trim(),
      domain: form.domain.trim(),
      country: form.country.trim(),
    };

    addProjectMutation.mutate(payload, {
      onSuccess: () => {
        setForm({ domain: "", name: "", country: "" });
      },
    });
  };

  return (
    <>
      <Card className="rounded-2xl border p-6 md:p-8 space-y-6">
        <h2 className="text-2xl font-semibold">Datos del Negocio</h2>

        {currentProject ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="mb-2 block">Sitio Web</Label>
                <Input
                  placeholder="web.com"
                  value={form.domain}
                  onChange={(e) => handleChange("domain", e.target.value)}
                  className="h-11 rounded-xl"
                />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              </div>

              <div>
                <Label className="mb-2 block">Marca a Analizar</Label>
                <Input
                  placeholder="brand"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>

              <div>
                <Label className="mb-2 block">
                  Países de búsqueda (separados por comas)
                </Label>
                <Input
                  placeholder="Ej: chile, perú"
                  value={form.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 bg-black text-white hover:bg-black/90"
                onClick={handleSave}
              >
                <IconDeviceFloppy className="size-4" />
                Guardar Cambios
              </Button>
            </div>
          </>
        ) : (
          <p className="text-gray-500">
            Selecciona un proyecto para ver sus datos.
          </p>
        )}
      </Card>

      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Crear nuevo proyecto</DialogTitle>
          </DialogHeader>
          <p>
            Esto creará un nuevo proyecto llamado{" "}
            <strong>{form.name || "sin nombre"}</strong> con el dominio{" "}
            <strong>{form.domain || "sin dominio"}</strong>.
            <br />
            ¿Estás seguro?
          </p>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setOpenConfirm(false)}
              className="rounded-xl"
            >
              Cancelar
            </Button>
            <Button
              onClick={confirmSave}
              className="rounded-xl bg-black text-white hover:bg-black/90"
              disabled={addProjectMutation.isPending}
            >
              Crear proyecto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
