<template>
  <div v-bind="applyStyleTokens({ sidebarContainer: true })">
    <slot name="default"></slot>
    <button
      v-for="(value, key) in processedDemos"
      :aria-pressed="modelValue === key"
      @click="updateValue(key)"
      v-bind="applyStyleTokens({
        sidebarButton: true,
        sidebarButtonNotSelected: modelValue !== key,
        sidebarButtonSelected: modelValue === key
      })"
      :key="key"
    >
      {{ value?.component?.name }}
    </button>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import { processDemos } from '@/helpers/componentHelpers.js';
import {
  createModelValueProp,
  demos,
  styleTokens
} from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

const modelValue = createModelValueProp(String);

export default {
  name: 'DoxenSideBar',
  mixins: [
    applyStyleTokens
  ],
  slots: ['default', 'footer'],
  emits: ['update:model-value'],
  props: {
    demos,
    modelValue,
    styleTokens
  },
  methods: {
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
