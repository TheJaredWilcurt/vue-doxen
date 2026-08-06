import path from 'node:path';

import pluginJs from '@eslint/js';
import tjwBase from 'eslint-config-tjw-base';
import tjwImport from 'eslint-config-tjw-import-x';
import tjwJest from 'eslint-config-tjw-jest';
import tjwVue from 'eslint-config-tjw-vue';
import pluginImport from 'eslint-plugin-import-x';
import pluginJest from 'eslint-plugin-jest';
import pluginVue from 'eslint-plugin-vue';
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility';

const __dirname = import.meta.dirname;
const vue3Recommended = pluginVue.configs['flat/recommended'];
const vueA11yRecommended = pluginVueA11y.configs['flat/recommended'];

export default [
  pluginJs.configs.recommended,
  pluginImport.flatConfigs.recommended,
  pluginJest.configs['flat/recommended'],
  ...vue3Recommended,
  ...vueA11yRecommended,
  tjwBase.configs.recommended,
  tjwImport,
  tjwJest.configs.recommended,
  tjwVue,
  {
    // project specific rules/settings
    languageOptions: {
      ecmaVersion: 2025,
      globals: {
        BigInt: true,
        globalThis: true,
        Promise: true,
        vi: true,
        Vue: true,
        VueRouter: true
      }
    },
    // project specific rules/settings
    rules: {
      /**
       * These 4 specific import rules were turned off because
       * they bug out and break things when enabled.
       */
      'import-x/named': 'off',
      'import-x/namespace': 'off',
      'import-x/no-cycle': 'off',
      'import-x/no-deprecated': 'off',
      // Turned off because import plugin can't see exports used in .vue files
      'import-x/no-unused-modules': 'off',
      'import-x/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: false,
            order: 'asc'
          },
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type'
          ],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '@/helpers/**',
              group: 'object',
              position: 'before'
            },
            {
              pattern: '@/mixins/**',
              group: 'object',
              position: 'before'
            },
            {
              pattern: '**/*.vue',
              group: 'object',
              position: 'before'
            },
            {
              pattern: '@@@/**',
              group: 'object',
              position: 'before'
            },
            {
              pattern: '@@/**',
              group: 'object',
              position: 'before'
            }
          ]
        }
      ],
      'jest/no-deprecated-functions': 'off',
      'no-empty': [
        'error',
        {
          allowEmptyCatch: true
        }
      ],
      'no-useless-assignment': 'off',
      'vue/no-v-for-template-key': 'off',
      'vue/no-v-model-argument': 'off',
      'vue/no-multiple-template-root': [
        'off'
      ],
      'vue/v-on-event-hyphenation': [
        'error',
        'never',
        {
          ignore: [],
          ignoreTags: [],
          // Breaks things in Vue 2
          autofix: true
        }
      ],
      'vuejs-accessibility/label-has-for': [
        'error',
        {
          components: ['Label'],
          required: {
            some: ['nesting', 'id']
          },
          allowChildren: false
        }
      ]
    },
    settings: {
      'import-x/resolver': {
        vite: {
          viteConfig: {
            resolve: {
              alias: {
                '@': path.resolve(__dirname, 'lib'),
                '@@': path.resolve(__dirname, 'tests'),
                '@@@': path.resolve(__dirname, 'docs'),
                '@@@@': path.resolve(__dirname, 'linter')
              }
            }
          }
        }
      }
    }
  },
  // Turn off rules in the docs site
  {
    files: [
      './docs/**/*'
    ],
    rules: {
      'import-x/no-extraneous-dependencies': 'off'
    }
  }
];
