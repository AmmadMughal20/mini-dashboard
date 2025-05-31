import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from 'path'


export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true, // This enables global describe, it, expect functions
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});