"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import sampleQuestions from "@/data/questions.json";
import steps from "@/data/steps.json";
import { TourProvider, useTour } from "@reactour/tour";
import { Brain, CheckCircle2, Circle, Search, Settings2, User2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRunAnalysis } from "~/features/dashboard/hooks/use-run-analysis";
import { useProjectStore } from "~/stores/project";
import { useProviderStore } from "~/stores/provider";

type ModelKey = string;

export default function AnalysisPage() {
  return (
    <TourProvider
      steps={steps}
      onClickMask={(e: any) => e.stopPropagation()}
      padding={10}
    >
      <AnalysisContent />
    </TourProvider>
  );
}

function ModelCard({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-xl border px-4 py-[10px] transition-colors ${
        active
          ? "border-zinc-400 bg-white"
          : "border-zinc-200 hover:border-zinc-300"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`grid h-8 w-8 place-items-center rounded-full border ${
            active ? "border-zinc-400" : "border-zinc-300"
          }`}
        >
          {icon}
        </span>
        <span className="text-[15px] font-medium text-zinc-800">{label}</span>
      </div>
      {active ? (
        <CheckCircle2 className="h-[18px] w-[18px] text-zinc-700" />
      ) : (
        <Circle className="h-[18px] w-[18px] text-zinc-400" />
      )}
    </button>
  );
}

function AnalysisContent() {
  const { setIsOpen, setCurrentStep } = useTour();
  const [question, setQuestion] = useState("");
  const [models, setModels] = useState<ModelKey[]>([]);
  const { providers, fetchProviders } = useProviderStore();
  const { currentProject } = useProjectStore();
  const runAnalysisMutation = useRunAnalysis();
  const called = useRef(false);
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    if (Array.isArray(sampleQuestions) && sampleQuestions.length > 0) {
      setPlaceholder(
        sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)],
      );
    }
  }, []);

  useEffect(() => {
    if (!called.current && !providers.length) {
      called.current = true;
      fetchProviders();
    }
  }, [providers]);

  useEffect(() => {
    if (providers.length && models.length === 0) {
      setModels([providers[0]]);
    }
  }, [providers]);

  const toggleModel = (key: ModelKey) =>
    setModels(prev => {
      if (prev.includes(key)) {
        if (prev.length === 1) return prev;
        return prev.filter(k => k !== key);
      }
      return [...prev, key];
    });

  const startTour = () => {
    setCurrentStep(0);
    setIsOpen(true);
  };

  const handleSearch = () => {
    if (!question.trim()) {
      toast.error("Debes ingresar una pregunta");
      return;
    }

    if (!models.length) {
      toast.error("Selecciona al menos un modelo");
      return;
    }

    if (!currentProject?.id) {
      toast.error("Selecciona un proyecto válido");
      return;
    }

    runAnalysisMutation.mutate({
      project_id: String(currentProject.id),
      question,
      models,
    });
  };

  const projectName = currentProject?.name || "Sin proyecto";

  return (
    <div className="">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-[32px] leading-tight font-extrabold">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-black text-white">
              <Brain className="h-5 w-5" />
            </span>
            AEO Analysis
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Análisis de Inteligencia Competitiva con diferentes modelos de IA
          </p>
        </div>
        <Button
          variant="outline"
          className="rounded-full border border-zinc-300 px-5 text-sm font-medium hover:bg-zinc-50"
          onClick={startTour}
        >
          ¿Cómo usar AEO Analysis?
        </Button>
      </div>

      <Card className="rounded-2xl border border-zinc-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[20px] font-semibold text-zinc-800">
            <Settings2 className="h-5 w-5 text-zinc-700" />
            Configuración del Análisis
          </CardTitle>
          <p className="mt-1 text-sm text-zinc-500">
            Ingresa tu pregunta para analizar con diferentes modelos de IA
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-6 pt-2">
          <div className="flex items-center gap-3 rounded-xl bg-zinc-100/70 px-5 py-3">
            <User2 className="h-5 w-5 text-zinc-500" />
            <span className="text-[15px] font-medium text-zinc-600">
              Marca objetivo:
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-zinc-700 ring-1 ring-zinc-200">
              {projectName}
            </span>
          </div>

          <div className="step-question">
            <label className="mb-2 block text-sm font-semibold text-zinc-800">
              Pregunta del Usuario
            </label>
            <Textarea
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder={placeholder}
              className="min-h-[110px] resize-none rounded-xl border border-zinc-200 text-[15px] shadow-none focus-visible:border-zinc-400 focus-visible:ring-0"
            />
          </div>

          <div className="step-models">
            <label className="mb-3 block text-sm font-semibold text-zinc-800">
              Selecciona los modelos
            </label>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {providers.map(slug => (
                <ModelCard
                  key={slug}
                  icon={<Brain className="h-4 w-4 text-zinc-600" />}
                  label={slug.charAt(0).toUpperCase() + slug.slice(1)}
                  active={models.includes(slug)}
                  onClick={() => toggleModel(slug)}
                />
              ))}
            </div>
          </div>

          <div className="step-search flex justify-end">
            <Button
              onClick={handleSearch}
              disabled={runAnalysisMutation.isPending}
              className="h-10 rounded-xl px-6 text-[15px] shadow-none hover:opacity-90"
            >
              <Search className="mr-2 h-4 w-4" />
              {runAnalysisMutation.isPending ? "Analizando..." : "Buscar"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      <div className="step-tabs flex justify-center gap-8">
        <Button className="flex items-center gap-2 rounded-xl bg-black px-6 py-3 font-medium text-white">
          <Brain className="h-4 w-4" />
          Análisis Actual
        </Button>
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-100 px-6 py-3 text-zinc-800 hover:bg-zinc-100"
        >
          ⏱️ Historial
        </Button>
      </div>
    </div>
  );
}
