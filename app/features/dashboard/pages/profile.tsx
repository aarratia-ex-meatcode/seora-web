"use client";
import { useSearchParams, useNavigate } from "react-router";
import { ProfileTabs } from "@/features/dashboard/components/profile/profile-tabs";

export default function ProfilePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tab = searchParams.get("tab") || "business-data";

  const handleTabChange = (value: string) => {
    navigate(`/dashboard/profile?tab=${value}`);
  };

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <h1 className="text-3xl font-bold">Configuración del Negocio</h1>
      <p className="text-muted-foreground">
        Configura los datos de tu negocio y gestiona tus competidores
      </p>
      <ProfileTabs activeTab={tab} onTabChange={handleTabChange} />
    </div>
  );
}
