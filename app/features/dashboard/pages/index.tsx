"use client";
import { SectionCards } from "@/features/dashboard/components/section-cards";

export default function DashboardHome() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
    </div>
  );
}
