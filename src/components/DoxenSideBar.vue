<template>
  <div v-bind="applyStyleTokens({ sidebarContainer: true })">
    <button
      v-for="(value, key) in demos"
      @click="updateValue(key)"
      v-bind="applyStyleTokens({
        sidebarButton: true,
        sidebarButtonActive: modelValue === key
      })"
      :key="key"
    >
      {{ value?.component?.name }}
    </button>
  </div>
</template>

<script>
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
  emits: ['update:modelValue'],
  props: {
    demos,
    modelValue,
    styleTokens
  },
  methods: {
    updateValue: function (key) {
      this.$emit('update:modelValue', key);
    }
  }
};
</script>
