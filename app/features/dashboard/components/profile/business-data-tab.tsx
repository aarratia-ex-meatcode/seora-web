"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useProjectStore } from "~/stores/project";

export function BusinessDataTab() {
  const { currentProject } = useProjectStore();
  const [form, setForm] = useState({
    domain: "",
    name: "",
    country: "",
  });

  useEffect(() => {
    if (currentProject) {
      setForm({
        domain: currentProject.domain || "",
        name: currentProject.name || "",
        country: currentProject.country || "",
      });
    }
  }, [currentProject]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="rounded-2xl border p-6 md:p-8 space-y-6">
      <h2 className="text-2xl font-semibold">Datos del Negocio</h2>

      {currentProject ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="mb-2 block">Sitio Web</Label>
              <Input
                placeholder="maquinitas.bet"
                value={form.domain}
                onChange={(e) => handleChange("domain", e.target.value)}
                className="h-11 rounded-xl"
              />
            </div>

            <div>
              <Label className="mb-2 block">Marca a Analizar</Label>
              <Input
                placeholder="maquinitas"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="h-11 rounded-xl"
              />
            </div>

            <div className="md:col-span-2">
              <Label className="mb-2 block">País de búsqueda (opcional)</Label>
              <Input
                placeholder="Ej: Chile, México, España"
                value={form.country}
                onChange={(e) => handleChange("country", e.target.value)}
                className="h-11 rounded-xl"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 bg-black text-white hover:bg-black/90">
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
  );
}
