import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import path from "node:path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), ["VITE_"]);
    return {
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
                    target: env.VITE_API_BASE_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ""),
                    headers: {
                        Authorization: `Bearer ${env.VITE_API_KEY}`,
                    },
                },
            },
        },
        define: {
            'import.meta.env.VITE_API_KEY': JSON.stringify(env.VITE_API_KEY),
            'import.meta.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL),
        },
    };
});
