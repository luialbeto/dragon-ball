import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import path from "path";
var __dirname = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig(function (_a) {
    var mode = _a.mode;
    return ({
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
                    additionalData: "\n          @use \"~/src/styles/variables\" as *;\n          @use \"~/src/styles/mixins\" as *;\n        ",
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
    });
});
