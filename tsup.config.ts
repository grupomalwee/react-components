import { defineConfig } from "tsup";
import path from "path";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: {
    resolve: true,
    compilerOptions: {
      skipLibCheck: true,
    },
  },
  outDir: "dist",
  clean: true,
  sourcemap: false,
  splitting: false, 
  treeshake: true, 
  minify: false, 
  banner: {
    js: `"use client";\nimport './index.css';`,
  },

  external: ["react", "react-dom", "@radix-ui/react-slot", "@radix-ui/react-*"],
  esbuildOptions(options) {
    options.platform = "browser";
    options.loader = {
      ...options.loader,
      ".css": "copy",
    };
    options.alias = {
      "@": path.resolve(__dirname, "src"),
    };
    options.resolveExtensions = [".tsx", ".ts", ".jsx", ".js"];
  },

  onSuccess: async () => {
    console.log("✓ Build tsup concluído com sucesso");
  },
});
