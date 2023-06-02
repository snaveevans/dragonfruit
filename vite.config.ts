import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({ registerType: "prompt" })],
  test: {
    include: ["**/*.test.tsx", "**/*.test.ts"],
    exclude: ["setup.test.ts"],
    globals: true,
    environment: "happy-dom",
    coverage: {
      provider: "istanbul",
    },
    setupFiles: ["setup.test.ts"],
  },
  server: {
    https: {
      cert: './localhost.crt',
      key: './localhost.key',
    }
  },
});
