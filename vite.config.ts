// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';  // 수정된 부분

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
