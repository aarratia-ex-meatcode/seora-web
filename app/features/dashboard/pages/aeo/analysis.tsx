"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import sampleQuestions from "@/data/questions.json";
import steps from "@/data/steps.json";
import { TourProvider, useTour } from "@reactour/tour";
import {
  Brain,
  CheckCircle2,
  Circle,
  Clock,
  HelpCircle,
  Search,
  Settings2,
  User2,
} from "lucide-react";
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
      className={`flex w-full items-center justify-between rounded-md border px-4 py-[10px] transition-colors ${
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
        <span className="text-primary-foreground text-[15px] font-medium">
          {label}
        </span>
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
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl leading-tight font-bold">
            <span className="bg-primary text-primary-foreground grid h-10 w-10 place-items-center rounded-md">
              <Brain className="h-5 w-5" />
            </span>
            Optimización para Asistentes de IA
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Análisis de Inteligencia Competitiva con diferentes modelos de IA
          </p>
        </div>
        <Button
          variant="outline"
          size="lg"
          className="border-primary text-primary-foreground hover:bg-primary/10 shadow-none"
          onClick={startTour}
        >
          <HelpCircle className="h-5 w-5" />
          Ayuda
        </Button>
      </div>

      <div className="border-primary space-y-6 rounded-md border bg-white p-6 shadow-none md:p-8">
        <div className="space-y-1">
          <h2 className="text-primary-foreground flex items-center gap-2 text-xl leading-tight font-bold">
            <Settings2 className="size-4" />
            Configuración del Análisis
          </h2>
          <p className="text-muted-foreground text-sm">
            Ingresa tu pregunta para analizar con diferentes modelos de IA
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="border-primary bg-background flex items-center gap-3 rounded-md border px-5 py-3">
            <User2 className="size-4" />
            <span className="text-primary-foreground text-[15px] font-medium">
              Marca objetivo:
            </span>

            <span className="text-primary-foreground text-[15px] font-medium">
              {projectName}
            </span>
          </div>

          <div className="step-question">
            <label className="text-primary-foreground mb-2 block text-sm font-semibold">
              Pregunta del Usuario
            </label>
            <Textarea
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder={placeholder}
              className="border-primary min-h-[110px] resize-none rounded-md border text-[15px] shadow-none focus-visible:border-zinc-400 focus-visible:ring-0"
            />
          </div>

          <div className="step-models">
            <label className="text-primary-foreground mb-3 block text-sm font-semibold">
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
              variant="soft"
              size="lg"
              disabled={runAnalysisMutation.isPending}
            >
              <Search className="h-5 w-5" />
              {runAnalysisMutation.isPending ? "Analizando..." : "Buscar"}
            </Button>
          </div>
        </div>
      </div>

      <div className="step-tabs flex justify-center gap-8">
        <Button
          variant="outline"
          className="border-primary text-primary-foreground hover:bg-primary/10 shadow-none"
          size="lg"
        >
          <Brain />
          Análisis Actual
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-primary text-primary-foreground hover:bg-primary/10 shadow-none"
        >
          <Clock className="h-5 w-5" />
          Historial
        </Button>
      </div>
    </>
  );
}
