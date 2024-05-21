<template>
  <div v-bind="applyStyleTokens({ vueDoxen: true })">
    <ComponentDemo
      v-if="processedDemos[selectedDemo]"
      :demo="processedDemos[selectedDemo]"
      :options="validatedOptions"
      :styleTokens="styleTokens"
      :key="selectedDemo"
    />
  </div>
</template>

<script>
/**
 * @file This component acts as a wrapper and public interface for ComponentDemo.
 * It handles the user inputs, defaulting values, and passing down just the selected demo.
 */
import {
  createImportStatement,
  processDemos
} from '@/helpers/componentHelpers.js';
import {
  createModelValueProp,
  createVueDoxenOptions,
  demos,
  styleTokens
} from '@/helpers/props.js';
import { validateOptions } from '@/helpers/validateOptions.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

import ComponentDemo from '@/components/ComponentDemo.vue';
import VueDoxenCustomDescription from '@/components/VueDoxenCustomDescription.vue';

const COMPONENT_NAME = 'VueDoxenCustom';
const modelValue = createModelValueProp(String);
const options = createVueDoxenOptions(false);

export default {
  ...createImportStatement(COMPONENT_NAME),
  name: COMPONENT_NAME,
  description: {
    component: VueDoxenCustomDescription
  },
  components: {
    ComponentDemo
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
    defaultModelValue: function () {
      if (
        this.processedDemos &&
        Object.keys(this.processedDemos).length &&
        !Object.keys(this.processedDemos).includes(this.modelValue)
      ) {
        const firstDemo = Object.keys(this.processedDemos)[0];
        console.info(
          'Vue-Doxen received a v-model value of "' + this.modelValue +
          '", however that value could not be found in the list of ' +
          'provided demos:', Object.keys(this.processedDemos)
        );
        console.info(
          'This is likely from a bug in your code, that you should ' +
          'fix. For convenience we will display the first provided ' +
          'demo, "' + firstDemo + '".'
        );
        this.updateValue(firstDemo);
      }
    },
    updateValue: function (key) {
      this.$emit('update:model-value', key);
    }
  },
  computed: {
    selectedDemo: function () {
      if (
        this.processedDemos &&
        Object.keys(this.processedDemos).length
      ) {
        if (Object.keys(this.processedDemos).includes(this.modelValue)) {
          return this.modelValue;
        }
        return Object.keys(this.processedDemos)[0];
      }
      return undefined;
    },
    processedDemos: function () {
      return processDemos(this.demos);
    },
    validatedOptions: function () {
      return validateOptions(this.options);
    }
  },
  watch: {
    modelValue: function () {
      this.defaultModelValue();
    }
  },
  created: function () {
    this.defaultModelValue();
  }
};
</script>
