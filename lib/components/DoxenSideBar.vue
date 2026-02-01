<template>
  <div v-bind="applyStyleTokens({ sidebarContainer: true })">
    <slot name="default"></slot>
    <button
      v-for="(value, key) in processedDemos"
      :aria-pressed="modelValue === key"
      :data-test="'button' + key"
      @click="updateValue(key)"
      v-bind="applyStyleTokens({
        sidebarButton: true,
        sidebarButtonNotSelected: modelValue !== key,
        sidebarButtonSelected: modelValue === key
      })"
      :key="key"
    >
      {{ getName(value, key) }}
    </button>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import {
  createImportStatement,
  processDemos
} from '@/helpers/componentHelpers.js';
import {
  createModelValueProp,
  demos,
  styleTokens
} from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

const COMPONENT_NAME = 'DoxenSideBar';
const modelValue = createModelValueProp(String);

export default {
  ...createImportStatement(COMPONENT_NAME),
  name: COMPONENT_NAME,
  mixins: [
    applyStyleTokens
  ],
  slots: {
    default: 'This goes <strong>Above</strong> the sidebar.',
    footer: 'This goes <strong>Below</strong> the sidebar.'
  },
  emits: ['update:model-value'],
  props: {
    demos,
    modelValue,
    styleTokens
  },
  methods: {
    getName: function (demo, componentNameFallback) {
      function findNameOrTitleInDemoOrComponent (nameTitle) {
        // If name is defined on the demo (or the demo is just the component and there is no demo) prefer it
        if (
          demo[nameTitle] &&
          typeof(demo[nameTitle]) === 'string'
        ) {
          return demo[nameTitle];
        }
        // Else prefer component
        if (
          demo.component &&
          demo.component[nameTitle] &&
          typeof(demo.component[nameTitle]) === 'string'
        ) {
          return demo.component[nameTitle];
        }
      }

      return (
        findNameOrTitleInDemoOrComponent('title') ||
        findNameOrTitleInDemoOrComponent('name') ||
        findNameOrTitleInDemoOrComponent('__name') ||
        componentNameFallback
      );
    },
    updateValue: function (key) {
      this.$emit('update:model-value', key);
    }
  },
  computed: {
    processedDemos: function () {
      return processDemos(this.demos);
    }
  }
};
</script>
