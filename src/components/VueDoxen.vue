<template>
  <div v-bind="applyStyleTokens({ vueDoxen: true })">
    <DoxenComponentDemo
      v-if="processedDemos[selectedDemo]"
      :demo="processedDemos[selectedDemo]"
      :styleTokens="styleTokens"
      :key="selectedDemo"
    />
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
  },
  computed: {
    selectedDemo: function () {
      return this.modelValue;
    },
    processedDemos: function () {
      return processDemos(this.demos);
    }
  }
};
</script>
