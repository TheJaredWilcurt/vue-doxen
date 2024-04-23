/* eslint-disable import/no-unused-modules */
import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

const __dirname = import.meta.dirname;

export default defineConfig({
  base: '/vue-doxen',
  build: {
    outDir: resolve(__dirname, 'docs'),
    rollupOptions: {
      input: resolve(__dirname, 'index.html')
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@@': fileURLToPath(new URL('./tests', import.meta.url)),
      '@@@': fileURLToPath(new URL('./manualTesting', import.meta.url))
    }
  },
  server: {
    open: '/index.html'
  }
});
