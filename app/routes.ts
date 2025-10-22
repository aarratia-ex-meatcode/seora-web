import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  route("/", "routes/login.tsx"),
  route("", "routes/protected.tsx", [
    route("dashboard", "features/dashboard/layout.tsx", [
      // Main dashboard
      index("features/dashboard/pages/index.tsx"),

      // Users
      route("users", "features/dashboard/pages/users.tsx"),

      // AEO
      route("aeo", "features/dashboard/pages/aeo/layout.tsx", [
        route("analysis", "features/dashboard/pages/aeo/analysis.tsx"),
        route("questions", "features/dashboard/pages/aeo/questions.tsx"),
        route("plan", "features/dashboard/pages/aeo/plan.tsx"),
        route("scoring", "features/dashboard/pages/aeo/scoring.tsx"),
      ]),

      // SEO
      route("seo", "features/dashboard/pages/seo/layout.tsx", [
        route("audit", "features/dashboard/pages/seo/audit.tsx"),
        route("competitors", "features/dashboard/pages/seo/competitors.tsx"),
      ]),

      // Communication
      route("communication", "features/dashboard/pages/communication/layout.tsx", [
        route("support", "features/dashboard/pages/communication/support.tsx"),
        route("pricing", "features/dashboard/pages/communication/pricing.tsx"),
      ]),

      // User profile options
      route("profile", "features/dashboard/pages/profile.tsx"),
      route("billing", "features/dashboard/pages/billing.tsx"),
      route("notifications", "features/dashboard/pages/notifications.tsx"),
    ]),
  ]),
] satisfies RouteConfig
