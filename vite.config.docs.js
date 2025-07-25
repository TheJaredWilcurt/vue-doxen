/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';

/* eslint-disable-next-line import/no-unresolved */
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';
import vueDevToolsAccessibility from 'vue-dev-tools-accessibility';

const __dirname = import.meta.dirname;

const config = defineConfig({
  base: '/vue-doxen',
  build: {
    chunkSizeWarningLimit: 572.36,
    outDir: resolve(__dirname, 'site'),
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
          json5: ['json5'],
          'lodash.clonedeep': ['lodash.clonedeep'],
          'lodash.isequal': ['lodash.isequal'],
          'lodash.lowerfirst': ['lodash.lowerfirst'],
          'lodash.startcase': ['lodash.startcase'],
          nprogress: ['nprogress'],
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
  plugins: [
    vue(),
    vueDevTools({
      launchEditor: 'subl'
    }),
    vueDevToolsAccessibility()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./lib', import.meta.url)),
      '@@': fileURLToPath(new URL('./tests', import.meta.url)),
      '@@@': fileURLToPath(new URL('./docs', import.meta.url))
    }
  },
  server: {
    open: '/index.html'
  }
});

export default config;
