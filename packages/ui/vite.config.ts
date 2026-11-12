import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Build thư viện: dist/index.js (ESM) + dist/styles.css
export default defineConfig({
  plugins: [react()],
  build: {
    lib: { entry: 'src/index.ts', formats: ['es'], fileName: 'index', cssFileName: 'styles' },
    rollupOptions: {
      external: [/^react($|\/)/, /^react-dom($|\/)/, /^antd($|\/)/, /^@ant-design\//, /^@phosphor-icons\//, '@pancake/tokens'],
    },
    sourcemap: true,
  },
});
