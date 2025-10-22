"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IconExternalLink,
  IconTrash,
  IconSettings,
} from "@tabler/icons-react";

const competitors = [
  {
    name: "Lorem",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    url: "https://www.lorem.com",
  }
];

export function CompetitorsTab() {
  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border p-6 md:p-8">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <IconSettings className="size-5" />
          Gestión de Competidores
        </h2>
        <p className="text-gray-500 text-sm">
          Utiliza IA para identificar automáticamente tus principales competidores o agrega competidores manualmente.
        </p>

        <div className="flex flex-wrap gap-3">
          <Button className="rounded-xl bg-black text-white hover:bg-black/90">
            Analizar competidores nuevamente
          </Button>
          <Button
            variant="outline"
            className="rounded-xl border-gray-300 hover:bg-gray-50"
          >
            Agregar Manual
          </Button>
        </div>
      </Card>

      <Card className="rounded-2xl border p-6 md:p-8 space-y-5">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-lg">📊</span> Competidores Identificados (3)
        </h3>

        <div className="grid md:grid-cols-3 gap-5">
          {competitors.map((c) => (
            <Card
              key={c.name}
              className="rounded-xl border p-5 space-y-3 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-base hover:underline flex items-center gap-1"
                >
                  {c.name}
                  <IconExternalLink className="size-4" />
                </a>
                <Badge className="bg-gray-100 text-gray-700">Detectado</Badge>
              </div>

              <p className="text-sm text-gray-600">{c.desc}</p>
              <p className="text-xs text-gray-400">{c.url}</p>

              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2 border-red-200 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <IconTrash className="size-4 mr-1" /> Eliminar
              </Button>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
