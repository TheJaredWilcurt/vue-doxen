<template>
  <div>
    VueDoxen - {{ modelValue }}
  </div>
</template>

<script>
import {
  demos,
  modelValue,
  styleTokens
} from '@/helpers/props.js';

export default {
  name: 'VueDoxen',
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
