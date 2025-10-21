import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  route("/", "routes/login.tsx"),
  route("", "routes/protected.tsx", [
    route("dashboard", "features/dashboard/layout.tsx", [
      index("features/dashboard/pages/index.tsx"),
      route("users", "features/dashboard/pages/users/index.tsx"),
    ]),
  ]),
] satisfies RouteConfig
