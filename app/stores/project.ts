"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Project {
    id: string;
    name: string;
    domain: string;
    country: string|null;
}

interface ProjectState {
    currentProject: Project | null;
    setProject: (project: Project) => void;
    clearProject: () => void;
}

export const useProjectStore = create<ProjectState>()(
    persist(
        (set) => ({
            currentProject: null,
            setProject: (project) => set({ currentProject: project }),
            clearProject: () => set({ currentProject: null }),
        }),
        {
            name: "current-project",
        }
    )
);
