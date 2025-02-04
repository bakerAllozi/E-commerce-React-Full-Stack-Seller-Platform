import { defineConfig } from 'vitest/config'; // ✅ استخدم vitest/config بدلاً من vite
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
  test: {
    globals: true, // ✅ يجعل `expect` و `test` متاحين عالميًا
    environment: 'jsdom', // ✅ محاكاة بيئة المتصفح
    setupFiles: './src/setupTests.ts', // ✅ تحميل `setupTests.ts`
  },
});
