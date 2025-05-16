import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  outDir: 'dist',
  clean: true,
  sourcemap: false,
  banner: {
    js: "import './index.css';" // 👈 adiciona no topo de index.js e index.mjs
  },
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      '.css': 'copy', // garante que .css seja preservado
    };
  },
});
