"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconRefresh, IconEdit, IconX, IconMessageQuestion, IconPlus } from "@tabler/icons-react";

const questions = [
  "¿Cuáles son las casas de apuestas más confiables en México?",
  "¿Qué plataforma de apuestas ofrece las mejores cuotas?",
  "¿Dónde puedo apostar en línea de forma segura?",
  "¿Cuál es la casa de apuestas con la interfaz más fácil de usar?",
  "¿Qué sitios de apuestas tienen los bonos de bienvenida más atractivos?",
  "¿Cuál es la mejor app para apostar desde mi celular?",
  "¿Qué casas de apuestas ofrecen apuestas en vivo con streaming?",
  "¿Qué plataforma de apuestas tiene la mayor variedad de deportes?",
  "¿Dónde puedo encontrar apuestas especiales y mercados únicos?",
  "¿Qué casa de apuestas paga más rápido las ganancias?",
];

export function SovQuestionsTab() {
  return (
    <Card className="rounded-2xl border p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <IconMessageQuestion className="size-5" />
            Configuración de Preguntas Share of Voice
          </h2>
          <p className="text-gray-500 text-sm">
            Configura las preguntas específicas que se usarán para analizar el share of voice de tu marca vs competidores
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl border-gray-300 hover:bg-gray-50"
        >
          <IconRefresh className="size-4 mr-1" /> Regenerar
        </Button>
      </div>

      <div className="space-y-2">
        <div>
          <h3 className="font-medium text-base">Preguntas SOV (20)</h3>
          <p className="text-sm text-gray-500">
            Estas preguntas se usarán en el análisis de Share of Voice
          </p>
        </div>

        <div className="space-y-2 mt-2">
          {questions.map((q, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
            >
              <span className="text-sm text-gray-700">{q}</span>
              <div className="flex gap-3">
                <button className="text-blue-500 hover:text-blue-600">
                  <IconEdit className="size-4" />
                </button>
                <button className="text-red-500 hover:text-red-600">
                  <IconX className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3">
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-xl border-gray-300 hover:bg-gray-50"
        >
          <IconPlus className="size-4" />
          Agregar Pregunta
        </Button>
      </div>
    </Card>
  );
}
