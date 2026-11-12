import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  ssr: { noExternal: ['@pancake/tokens'] },
  build: { ssr: 'gallery/entry.tsx', outDir: 'gallery/.ssr', emptyOutDir: true, rollupOptions: { output: { entryFileNames: 'index.js' } } },
});
