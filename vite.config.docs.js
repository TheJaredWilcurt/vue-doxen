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
      input: resolve(__dirname, 'index.html'),
      output: {
        manualChunks: {
          '@highlightjs/vue-plugin': ['@highlightjs/vue-plugin'],
          'axe-core': ['axe-core'],
          json5: ['json5'],
          'lodash.clonedeep': ['lodash.clonedeep'],
          'lodash.isequal': ['lodash.isequal'],
          'lodash.lowerfirst': ['lodash.lowerfirst'],
          'lodash.startcase': ['lodash.startcase'],
          'vue-axe': ['vue-axe'],
          'vue-options-api-constants-plugin': ['vue-options-api-constants-plugin'],
          'vue-router': ['vue-router'],
          vue: ['vue']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['axe-core']
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
