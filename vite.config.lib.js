/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';

/* eslint-disable-next-line import/no-unresolved */
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/dist/config.js';

const __dirname = import.meta.dirname;

const config = defineConfig({
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
          if (assetInfo.name === 'vue-doxen.umd.cjs') {
            return 'vue-doxen.umd.js';
          }
          return assetInfo.name;
        },
        exports: 'named',
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
      '@@@': fileURLToPath(new URL('./docs', import.meta.url))
    }
  },
  test: {
    coverage: {
      exclude: [
        ...(configDefaults?.coverage?.exclude || []),
        '.eslintrc.cjs',
        '**/docs/',
        '**/site/',
        '**/scripts/'
      ],
      reportsDirectory: './tests/unit/coverage'
    },
    environment: 'happy-dom',
    globals: true,
    root: '.',
    setupFiles: [
      './tests/unit/setup.js'
    ],
    snapshotSerializers: [
      './node_modules/vue3-snapshot-serializer/index.js'
    ]
  }
});

export default config;
