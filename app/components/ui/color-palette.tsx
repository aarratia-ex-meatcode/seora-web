import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ColorSwatchProps {
  name: string;
  value: string;
  className?: string;
}

function ColorSwatch({ name, value, className }: ColorSwatchProps) {
  return (
    <div
      className={cn(
        "bg-card flex items-center gap-3 rounded-lg border p-3",
        className,
      )}
    >
      <div
        className="border-border h-12 w-12 rounded-lg border-2 shadow-sm"
        style={{ backgroundColor: value }}
      />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium">{name}</div>
        <div className="text-muted-foreground font-mono text-xs">{value}</div>
      </div>
    </div>
  );
}

function ColorSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-2">{children}</CardContent>
    </Card>
  );
}

export function ColorPalette() {
  // Light theme colors
  const lightColors = {
    basic: {
      background: "oklch(0.97 0.02 87.85)",
      foreground: "oklch(0.12 0 0)",
    },
    ui: {
      card: "oklch(1 0 0)",
      "card-foreground": "oklch(0.145 0 0)",
      popover: "oklch(1 0 0)",
      "popover-foreground": "oklch(0.145 0 0)",
      primary: "oklch(0.205 0 0)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.97 0 0)",
      "secondary-foreground": "oklch(0.205 0 0)",
      muted: "oklch(0.97 0 0)",
      "muted-foreground": "oklch(0.556 0 0)",
      accent: "oklch(0.97 0 0)",
      "accent-foreground": "oklch(0.205 0 0)",
      destructive: "oklch(0.577 0.245 27.325)",
      border: "oklch(0.922 0 0)",
      input: "oklch(0.922 0 0)",
      ring: "oklch(0.708 0 0)",
    },
    charts: {
      "chart-1": "oklch(0.646 0.222 41.116)",
      "chart-2": "oklch(0.6 0.118 184.704)",
      "chart-3": "oklch(0.398 0.07 227.392)",
      "chart-4": "oklch(0.828 0.189 84.429)",
      "chart-5": "oklch(0.769 0.188 70.08)",
    },
    sidebar: {
      sidebar: "oklch(0.985 0 0)",
      "sidebar-foreground": "oklch(0.145 0 0)",
      "sidebar-primary": "oklch(0.205 0 0)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.97 0 0)",
      "sidebar-accent-foreground": "oklch(0.205 0 0)",
      "sidebar-border": "oklch(0.922 0 0)",
      "sidebar-ring": "oklch(0.708 0 0)",
    },
  };

  // Dark theme colors
  const darkColors = {
    basic: {
      background: "oklch(0.145 0 0)",
      foreground: "oklch(0.985 0 0)",
    },
    ui: {
      card: "oklch(0.205 0 0)",
      "card-foreground": "oklch(0.985 0 0)",
      popover: "oklch(0.205 0 0)",
      "popover-foreground": "oklch(0.985 0 0)",
      primary: "oklch(0.922 0 0)",
      "primary-foreground": "oklch(0.205 0 0)",
      secondary: "oklch(0.269 0 0)",
      "secondary-foreground": "oklch(0.985 0 0)",
      muted: "oklch(0.269 0 0)",
      "muted-foreground": "oklch(0.708 0 0)",
      accent: "oklch(0.269 0 0)",
      "accent-foreground": "oklch(0.985 0 0)",
      destructive: "oklch(0.704 0.191 22.216)",
      border: "oklch(1 0 0 / 10%)",
      input: "oklch(1 0 0 / 15%)",
      ring: "oklch(0.556 0 0)",
    },
    charts: {
      "chart-1": "oklch(0.488 0.243 264.376)",
      "chart-2": "oklch(0.696 0.17 162.48)",
      "chart-3": "oklch(0.769 0.188 70.08)",
      "chart-4": "oklch(0.627 0.265 303.9)",
      "chart-5": "oklch(0.645 0.246 16.439)",
    },
    sidebar: {
      sidebar: "oklch(0.205 0 0)",
      "sidebar-foreground": "oklch(0.985 0 0)",
      "sidebar-primary": "oklch(0.488 0.243 264.376)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.269 0 0)",
      "sidebar-accent-foreground": "oklch(0.985 0 0)",
      "sidebar-border": "oklch(1 0 0 / 10%)",
      "sidebar-ring": "oklch(0.556 0 0)",
    },
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Paleta de Colores</h1>
        <p className="text-muted-foreground">
          Colores definidos en el sistema de diseño usando OKLCH
        </p>
      </div>

      {/* Light Theme */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full border-2 border-gray-200 bg-white"></div>
          <h2 className="text-2xl font-semibold">Tema Claro</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ColorSection
            title="Básicos"
            description="Colores fundamentales del tema"
          >
            {Object.entries(lightColors.basic).map(([name, value]) => (
              <ColorSwatch key={name} name={name} value={value} />
            ))}
          </ColorSection>

          <ColorSection
            title="Interfaz"
            description="Colores para componentes UI"
          >
            {Object.entries(lightColors.ui).map(([name, value]) => (
              <ColorSwatch key={name} name={name} value={value} />
            ))}
          </ColorSection>

          <ColorSection
            title="Gráficos"
            description="Colores para visualizaciones"
          >
            {Object.entries(lightColors.charts).map(([name, value]) => (
              <ColorSwatch key={name} name={name} value={value} />
            ))}
          </ColorSection>

          <ColorSection
            title="Sidebar"
            description="Colores específicos del sidebar"
          >
            {Object.entries(lightColors.sidebar).map(([name, value]) => (
              <ColorSwatch key={name} name={name} value={value} />
            ))}
          </ColorSection>
        </div>
      </div>

      {/* Dark Theme */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full border-2 border-gray-700 bg-gray-900"></div>
          <h2 className="text-2xl font-semibold">Tema Oscuro</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ColorSection
            title="Básicos"
            description="Colores fundamentales del tema"
          >
            {Object.entries(darkColors.basic).map(([name, value]) => (
              <ColorSwatch key={name} name={name} value={value} />
            ))}
          </ColorSection>

          <ColorSection
            title="Interfaz"
            description="Colores para componentes UI"
          >
            {Object.entries(darkColors.ui).map(([name, value]) => (
              <ColorSwatch key={name} name={name} value={value} />
            ))}
          </ColorSection>

          <ColorSection
            title="Gráficos"
            description="Colores para visualizaciones"
          >
            {Object.entries(darkColors.charts).map(([name, value]) => (
              <ColorSwatch key={name} name={name} value={value} />
            ))}
          </ColorSection>

          <ColorSection
            title="Sidebar"
            description="Colores específicos del sidebar"
          >
            {Object.entries(darkColors.sidebar).map(([name, value]) => (
              <ColorSwatch key={name} name={name} value={value} />
            ))}
          </ColorSection>
        </div>
      </div>
    </div>
  );
}
