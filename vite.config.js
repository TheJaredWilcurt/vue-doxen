/* eslint-disable import/no-unused-modules */
import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

const __dirname = import.meta.dirname;

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/vue-doxen.js'),
      name: 'vue-doxen'
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
    open: '/manualTesting/index.html'
  }
});
