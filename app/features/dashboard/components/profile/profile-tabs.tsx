"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BusinessDataTab } from "./business-data-tab";
import { CompetitorsTab } from "./competitors-tab";
import { SovQuestionsTab } from "./sov-questions-tab";
import {
  IconSettings,
  IconUsers,
  IconMessageQuestion,
} from "@tabler/icons-react";

export function ProfileTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (value: string) => void;
}) {
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <div className="border-b pb-4">
          <TabsList className="flex gap-2 bg-transparent">
            <TabsTrigger
              value="business-data"
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-black transition-all"
            >
              <IconSettings className="size-4" />
              Datos del Negocio
            </TabsTrigger>
            <TabsTrigger
              value="competitors"
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-black transition-all"
            >
              <IconUsers className="size-4" />
              Gestión de Competidores
            </TabsTrigger>
            <TabsTrigger
              value="sov-questions"
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-black transition-all"
            >
              <IconMessageQuestion className="size-4" />
              Preguntas del SoV
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="business-data" className="pt-4">
          <BusinessDataTab />
        </TabsContent>
        <TabsContent value="competitors" className="pt-4">
          <CompetitorsTab />
        </TabsContent>
        <TabsContent value="sov-questions" className="pt-4">
          <SovQuestionsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
