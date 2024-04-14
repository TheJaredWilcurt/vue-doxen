/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');

const baseRestrictedSyntax = require('eslint-config-tjw-base/no-restricted-syntax.json');

module.exports = {
  root: true,
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    ecmaVersion: 2024,
    sourceType: 'module'
  },
  globals: {
    Promise: true,
    Vue: true,
    Pinia: true,
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
    'tjw-vue'
  ],
  rules: {
    'import/no-anonymous-default-export': 'off',
    'import/no-namespace': 'off',
    'import/no-unresolved': 'off',
    'import/no-unused-modules': 'off',
    'no-restricted-syntax': [
      'error',
      ...baseRestrictedSyntax
    ],
    'vue/no-v-for-template-key': 'off',
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
              '@': path.resolve('src')
            }
          }
        }
      }
    }
  }
};
