import path from 'node:path';

import pluginJs from '@eslint/js';
import tjwBase from 'eslint-config-tjw-base';
import tjwImport from 'eslint-config-tjw-import';
import tjwJest from 'eslint-config-tjw-jest';
import tjwVue from 'eslint-config-tjw-vue';
import pluginImport from 'eslint-plugin-import';
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
      'import/named': 'off',
      'import/namespace': 'off',
      'import/no-cycle': 'off',
      'import/no-deprecated': 'off',

      'import/order': [
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
      'vue/no-v-for-template-key': 'off',
      'vue/no-v-model-argument': 'off',
      'vue/no-multiple-template-root': [
        'off'
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
      'import/resolver': {
        vite: {
          viteConfig: {
            resolve: {
              alias: {
                '@': path.resolve(__dirname, 'lib'),
                '@@': path.resolve(__dirname, 'tests'),
                '@@@': path.resolve(__dirname, 'app')
              }
            }
          }
        }
      }
    }
  }
];
