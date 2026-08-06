/* eslint-disable import-x/no-extraneous-dependencies,import-x/no-unresolved */
import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';

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
    rolldownOptions: {
      external: [
        '/vue-doxen/branding/vue-doxen-dog.png',
        '/vue-doxen/branding/vue-doxen-logo-large.png',
        '/vue-doxen/branding/vue-doxen-text.png',
        'colorette',
        'pretty-ms'
      ],
      input: resolve(__dirname, 'index.html'),
      output: {
        globals: {
          colorette: 'colorette',
          'pretty-ms': 'prettyMilliseconds'
        },
        codeSplitting: {
          groups: [
            {
              test: /node_modules\/highlight/,
              name: 'highlightjs'
            },
            {
              test: /node_modules\/json5/,
              name: 'json5'
            },
            {
              test: /node_modules\/nprogress/,
              name: 'nprogress'
            },
            {
              test: /node_modules\/lodash/,
              name: 'lodash'
            },
            {
              test: /node_modules\/htmlparser2/,
              name: 'htmlparser2'
            },
            {
              test: /node_modules\/vue-router/,
              name: 'vue-router'
            },
            {
              test: /node_modules\/vue-options-api-constants-plugin/,
              name: 'constants-plugin'
            },
            {
              test: /node_modules\/vue/,
              name: 'vue'
            },
            {
              test: /node_modules/,
              name: 'lib'
            },
            {
              test: /index\.js/,
              name: 'alloy-docs'
            }
          ]
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
      '@@@': fileURLToPath(new URL('./docs', import.meta.url)),
      '@@@@': fileURLToPath(new URL('./linter', import.meta.url))
    }
  },
  server: {
    open: '/index.html'
  }
});

export default config;
