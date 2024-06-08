/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');

const baseRestrictedSyntax = require('eslint-config-tjw-base/no-restricted-syntax.json');
const jestRestrictedSyntax = require('eslint-config-tjw-jest/no-restricted-syntax.json');

module.exports = {
  root: true,
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    ecmaVersion: 2024,
    sourceType: 'module'
  },
  globals: {
    globalThis: true,
    Promise: true,
    vi: true,
    Vue: true,
    VueRouter: true
  },
  plugins: [
    'vue',
    'vuejs-accessibility'
  ],
  extends: [
    'plugin:vuejs-accessibility/recommended',
    'eslint:recommended',
    'plugin:vue/recommended',
    'tjw-base',
    'tjw-import',
    'tjw-jest',
    'tjw-vue'
  ],
  rules: {
    'import/no-anonymous-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-namespace': 'off',
    'import/no-unresolved': 'off',
    'import/no-unused-modules': 'off',
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
    'no-restricted-syntax': [
      'error',
      ...baseRestrictedSyntax,
      ...jestRestrictedSyntax
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
      webpack: {
        config: {
          resolve: {
            alias: {
              '@': path.resolve('lib'),
              '@@': path.resolve('tests'),
              '@@@': path.resolve('app')
            }
          }
        }
      }
    }
  }
};
