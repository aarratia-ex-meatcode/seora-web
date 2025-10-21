import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import graphql from "@rollup/plugin-graphql"
import path from "path"

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), graphql()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "app"),
      "~": path.resolve(__dirname, "app"),
      "@components": path.resolve(__dirname, "app/components"),
      "@ui": path.resolve(__dirname, "app/components/ui"),
      "@lib": path.resolve(__dirname, "app/lib"),
      "@hooks": path.resolve(__dirname, "app/hooks"),
    },
  },
})
