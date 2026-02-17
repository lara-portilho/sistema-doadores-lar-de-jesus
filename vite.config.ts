import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import tsconfigJson from "./tsconfig.app.json" with { type: "json" };

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: Object.entries(tsconfigJson.compilerOptions.paths).map(
      ([key, value]) => {
        return {
          find: key.replace("/*", ""),
          replacement: path.resolve(
            __dirname,
            `./${value[0].replace("/*", "")}`,
          ),
        };
      },
    ),
  },
});
