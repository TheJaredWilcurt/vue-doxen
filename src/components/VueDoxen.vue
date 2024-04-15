<template>
  <div>
    VueDoxen - {{ modelValue }}
  </div>
</template>

<script>
import {
  createModelValueProp,
  demos,
  styleTokens
} from '@/helpers/props.js';

const modelValue = createModelValueProp(String);

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
