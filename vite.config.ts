import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: "@app",
        replacement: path.resolve(__dirname, "./src"),
      },
      {
        find: "@assets",
        replacement: path.resolve(__dirname, "./src/assets"),
      },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
      {
        find: "@contexts",
        replacement: path.resolve(__dirname, "./src/contexts"),
      },
      { find: "@hooks", replacement: path.resolve(__dirname, "./src/hooks") },
      { find: "@pages", replacement: path.resolve(__dirname, "./src/pages") },
      {
        find: "@services",
        replacement: path.resolve(__dirname, "./src/services"),
      },
      {
        find: "@stores",
        replacement: path.resolve(__dirname, "./src/stores"),
      },
      {
        find: "@utils",
        replacement: path.resolve(__dirname, "./src/utils"),
      },
    ],
  },
});
