import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, '../dist'), 
    },
  },
  server: {
    port: 5173, 
    open: true, 
  },
});