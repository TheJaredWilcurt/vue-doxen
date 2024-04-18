<template>
  <fieldset
    v-bind="applyStyleTokens({ formFieldFieldset: true })"
    :data-value="dataValue(modelValue)"
  >
    <slot></slot>
  </fieldset>
</template>

<script>
import {
  createModelValueProp,
  styleTokens
} from '@/helpers/props.js';
import { dataValue } from '@/helpers/snapshotHelpers.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

const Any = null;
const modelValue = createModelValueProp(Any);

export default {
  name: 'FormFieldsetWrapper',
  mixins: [
    applyStyleTokens
  ],
  props: {
    modelValue,
    styleTokens
  },
  methods: {
    dataValue
  }
};
</script>
