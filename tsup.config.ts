import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  outDir: 'dist',
  clean: true,
  sourcemap: false,
  banner: {
    js: "import './index.css';",
  },
  external: [
    "react",
    "react-dom",
    "react-hook-form",
    "@radix-ui/react-slot",
    "@radix-ui/react-*"
  ],
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      '.css': 'copy',
    };
  },
});
