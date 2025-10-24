"use client";

import { Button } from "@/components/ui/button";
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
import { Block } from "~/components/primitives/block";
import { Title } from "~/components/primitives/title";
import { Text } from "~/components/primitives/text";
import { useRunAnalysis } from "~/features/dashboard/hooks/use-run-analysis";
import { useProjectStore } from "~/stores/project";
import { useProviderStore } from "~/stores/provider";
import { Badge } from "~/components/ui/badge";

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
      <Block className="flex items-center gap-3">
        <span
          className={`grid h-8 w-8 place-items-center rounded-full border ${
            active ? "border-zinc-400" : "border-zinc-300"
          }`}
        >
          {icon}
        </span>
        <Text as="span" size="base" weight="medium">
          {label}
        </Text>
      </Block>
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
    <Block className="mx-auto w-full max-w-7xl">
      <Block className="flex flex-col gap-y-4">
        <Block className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Block className="flex flex-col gap-y-4">
            <Block className="flex flex-row items-center justify-between gap-x-4">
              <Block className="flex flex-row items-center gap-x-4">
                <Block>
                  <Title
                    level="h2"
                    size="2xl"
                    weight="bold"
                    className="flex items-center gap-3"
                  >
                    Optimización para Asistentes de IA
                  </Title>
                  <Text variant="muted" size="sm">
                    Análisis de Inteligencia Competitiva con diferentes modelos
                    de IA
                  </Text>
                </Block>
              </Block>
              <Button
                variant="ghost"
                size="lg"
                className="border-primary text-primary-foreground hover:bg-primary/10 shadow-none"
                onClick={startTour}
              >
                <HelpCircle className="h-5 w-5" />
                {/* Ayuda */}
              </Button>
            </Block>

            <Block className="border-primary space-y-6 rounded-md border bg-white p-6 shadow-none md:p-8">
              <Block className="space-y-1">
                <Title
                  level="h2"
                  size="xl"
                  weight="bold"
                  className="flex items-center gap-2"
                >
                  <Settings2 className="size-4" />
                  Configuración del Análisis
                </Title>
                <Text variant="muted" size="sm">
                  Ingresa tu pregunta para analizar con diferentes modelos de IA
                </Text>
              </Block>

              <Block className="flex flex-col gap-6">
                <Block className="border-primary bg-background flex items-center gap-3 rounded-md border px-5 py-3">
                  <User2 className="size-4" />
                  <Text as="span" size="base" weight="medium">
                    Marca objetivo:
                  </Text>

                  <Text as="span" size="base" weight="medium">
                    {projectName}
                  </Text>
                </Block>

                <Block className="step-question">
                  <label className="text-primary-foreground mb-2 block text-sm font-semibold">
                    Pregunta del Usuario
                  </label>
                  <Textarea
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    placeholder={placeholder}
                    className="border-primary min-h-[110px] resize-none rounded-md border text-[15px] shadow-none focus-visible:border-zinc-400 focus-visible:ring-0"
                  />

                  <Block className="mt-4 flex flex-row flex-wrap gap-2">
                    {[
                      "¿Quiénes lideran el mercado chileno?",
                      "¿Cuáles son las tendencias actuales en Chile?",
                      "¿Qué empresas lideran el sector de e-commerce en Chile?",
                      "¿Cómo mejorar la presencia digital de una marca emergente en Chile?",
                      "¿Qué sectores muestran mayor crecimiento en Chile durante 2025?",
                      "¿Cuáles son las marcas de automóviles más vendidas en Chile?",
                      "¿Cómo ha evolucionado la adopción de autos eléctricos en Chile?",
                      "¿Qué tendencias predominan en la industria automotriz chilena?",
                      "¿Qué estrategias comerciales son más efectivas para concesionarios de autos?",
                      "¿Cómo afecta la regulación ambiental al mercado automotriz chileno?"
                    ].map(question => (
                      <Badge variant="outline" key={question}>{question}</Badge>
                    ))}
                  </Block>
                </Block>

                <Block className="step-models">
                  <label className="text-primary-foreground mb-3 block text-sm font-semibold">
                    Selecciona los modelos
                  </label>
                  <Block className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {providers.map(slug => (
                      <ModelCard
                        key={slug}
                        icon={<Brain className="h-4 w-4 text-zinc-600" />}
                        label={slug.charAt(0).toUpperCase() + slug.slice(1)}
                        active={models.includes(slug)}
                        onClick={() => toggleModel(slug)}
                      />
                    ))}
                  </Block>
                </Block>

                <Block className="step-search flex justify-end">
                  <Button
                    onClick={handleSearch}
                    variant="soft"
                    size="lg"
                    disabled={runAnalysisMutation.isPending}
                  >
                    <Search className="h-5 w-5" />
                    {runAnalysisMutation.isPending ? "Analizando..." : "Buscar"}
                  </Button>
                </Block>
              </Block>
            </Block>

            <Block className="step-tabs flex justify-center gap-x-4">
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
            </Block>
          </Block>

          <Block className="flex flex-col gap-y-4">
            <Block className="flex flex-row items-center justify-between gap-x-4">
              <Block className="flex flex-row items-center gap-x-4">
                <Block>
                  <Title
                    level="h2"
                    size="2xl"
                    weight="bold"
                    className="flex items-center gap-3"
                  >
                    Resultados del Análisis
                  </Title>
                  <Text variant="muted" size="sm">
                    Resultados del análisis de la pregunta del usuario
                  </Text>
                </Block>
              </Block>
            </Block>

            <Block className="border-primary h-full space-y-6 rounded-md border bg-white p-6 shadow-none md:p-8"></Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
}
