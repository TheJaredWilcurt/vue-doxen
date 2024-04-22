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
      const processed = {};
      for (const demoName in this.demos) {
        const demo = this.demos[demoName];
        const demoType = typeof(demo) === 'object';
        if (demoType) {
          if (demo.component) {
            processed[demoName] = demo;
          } else {
            processed[demoName] = { component: demo };
          }
        }
      }
      return processed;
    }
  }
};
</script>
