<template>
  <div v-bind="applyStyleTokens({ vueDoxen: true })">
    <DoxenComponentDemo
      v-if="processedDemos[selectedDemo]"
      :demo="processedDemos[selectedDemo]"
      :options="validateOptions"
      :styleTokens="styleTokens"
      :key="selectedDemo"
    />
  </div>
</template>

<script>
/**
 * @file This component acts as a wrapper and public interface for DoxenComponentDemo.
 * It handles the user inputs, defaulting values, and passing down just the selected demo.
*/
import {
  createImportStatement,
  processDemos
} from '@/helpers/componentHelpers.js';
import {
  createModelValueProp,
  demos,
  options,
  styleTokens
} from '@/helpers/props.js';
import { validateOptions } from '@/helpers/validateOptions.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

import DoxenComponentDemo from '@/components/DoxenComponentDemo.vue';

const COMPONENT_NAME = 'VueDoxenCustom';
const modelValue = createModelValueProp(String);

export default {
  ...createImportStatement(COMPONENT_NAME),
  name: COMPONENT_NAME,
  description: [
    'This is the VueDoxen Custom component. Normally Vue-Doxen ships with many built in components',
    'but if you want to pass in your own custom Vue components to perform the same functionality,',
    'you can! This is a more advanced option, but can also result in smaller build sizes, as it',
    'doesn\'t ship with any additional internal Vue-Doxen components (textarea, emitlog, checkbox,',
    'JSON textarea, dropdown, etc.) unless you explicitly import them.'
  ].join(' '),
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
    options,
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
    },
    validateOptions: function () {
      return validateOptions(this.options);
    }
  }
};
</script>
