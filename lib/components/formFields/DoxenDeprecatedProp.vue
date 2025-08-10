<template>
  <div
    v-bind="applyStyleTokens({ formFieldDeprecatedProp: true })"
  ></div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

export default {
  name: 'DoxenDeprecatedProp',
  description: 'To discourage use of deprecated props, we use this component to "display nothing" in the props playground. It is just a simple empty div (<code>&lt;div&gt;&lt;/div&gt;</code>). Because it is used in the props playground, it has v-model set up, but it doesn\'t do anything. It has one targetable styleToken, <code>formFieldDeprecatedProp</code>.',
  mixins: [
    applyStyleTokens
  ],
  props: {
    modelValue: {
      type: null,
      default: undefined
    },
    styleTokens
  },
  emits: [
    'update:model-value'
  ]
};
</script>
