// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 기존 ESM 방식에서 CommonJS 방식으로 변경
import pkg from 'vite';
const { createFilter } = pkg;

export default defineConfig({
  plugins: [react()],
});
