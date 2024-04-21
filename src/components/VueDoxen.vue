<template>
  <div v-bind="applyStyleTokens({ vueDoxen: true })">
    <DoxenComponentDemo
      v-if="demos[modelValue]"
      :demo="demos[modelValue]"
    />
  </div>
</template>

<script>
import {
  createModelValueProp,
  demos,
  styleTokens
} from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

import DoxenComponentDemo from '@/components/DoxenComponentDemo.vue';

const modelValue = createModelValueProp(String);

export default {
  name: 'VueDoxen',
  components: {
    DoxenComponentDemo
  },
  mixins: [
    applyStyleTokens
  ],
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
  }
};
</script>
