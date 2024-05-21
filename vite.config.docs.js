/* eslint-disable import/no-unused-modules */
import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

const __dirname = import.meta.dirname;

export default defineConfig({
  base: '/vue-doxen',
  build: {
    chunkSizeWarningLimit: 569.98,
    outDir: resolve(__dirname, 'docs'),
    rollupOptions: {
      external: [
        '/vue-doxen/branding/vue-doxen-dog.png',
        '/vue-doxen/branding/vue-doxen-logo-large.png',
        '/vue-doxen/branding/vue-doxen-text.png'
      ],
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
          nprogress: ['nprogress'],
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
      '@': fileURLToPath(new URL('./lib', import.meta.url)),
      '@@': fileURLToPath(new URL('./tests', import.meta.url)),
      '@@@': fileURLToPath(new URL('./app', import.meta.url))
    }
  },
  server: {
    open: '/index.html'
  }
});
