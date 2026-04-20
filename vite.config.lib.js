/* eslint-disable import-x/no-extraneous-dependencies */
import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';

/* eslint-disable-next-line import-x/no-unresolved */
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
/* eslint-disable-next-line import-x/extensions,import-x/no-unresolved */
import { configDefaults } from 'vitest/config';

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
      external: [
        'colorette',
        'pretty-ms',
        'vue'
      ],
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
          colorette: 'colorette',
          'pretty-ms': 'prettyMilliseconds',
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
      '@@@': fileURLToPath(new URL('./docs', import.meta.url)),
      '@@@@': fileURLToPath(new URL('./linter', import.meta.url))
    }
  },
  test: {
    coverage: {
      exclude: [
        ...(configDefaults?.coverage?.exclude || []),
        '.eslintrc.cjs',
        './docs/',
        './site/',
        './scripts/',
        './lib/sass/',
        './tests/'
      ],
      reportsDirectory: './tests/unit/coverage'
    },
    environment: 'happy-dom',
    // https://github.com/nodejs/node/issues/60303
    // https://github.com/vitest-dev/vitest/issues/8757
    // https://github.com/capricorn86/happy-dom/issues/1950
    execArgv: (process.versions.node.split('.')[0]) >= 25 ? ['--no-experimental-webstorage'] : [],
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
