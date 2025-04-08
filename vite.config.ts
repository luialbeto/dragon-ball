import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    minify: mode === "production" ? "terser" : false,
    sourcemap: mode === "development",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          framer: ["framer-motion"],
          router: ["react-router-dom"],
          vendor: ["axios", "axios-cache-interceptor"],
        },
      },
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "~/src/styles/variables" as *;
          @use "~/src/styles/mixins" as *;
        `,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, "./"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://dragonball-api.com",
        changeOrigin: true,
        secure: false,
        headers: {
          Origin: "http://localhost:5173",
          "Accept-Version": "1.0.0",
        },
      },
    },
  },
}));
