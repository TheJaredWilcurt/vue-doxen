<template>
  <div v-bind="applyStyleTokens({ vueDoxen: true })">
    VueDoxen - {{ modelValue }}
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
  name: 'VueDoxen',
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
