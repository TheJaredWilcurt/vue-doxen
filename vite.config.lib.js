/* eslint-disable import/no-unused-modules */
import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

const __dirname = import.meta.dirname;

export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      cssCodeSplit: false,
      entry: resolve(__dirname, 'lib/vue-doxen.js'),
      name: 'vueDoxen',
      formats: [
        'cjs',
        'es',
        'iife',
        'umd'
      ]
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'vue-doxen.css';
          }
          return assetInfo.name;
        },
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./lib', import.meta.url)),
      '@@': fileURLToPath(new URL('./tests', import.meta.url)),
      '@@@': fileURLToPath(new URL('./app', import.meta.url))
    }
  }
});
