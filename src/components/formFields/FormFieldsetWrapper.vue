<template>
  <fieldset
    data-style-tokens="formFieldFieldset"
    :class="styleTokens.formFieldFieldset"
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

const Any = null;
const modelValue = createModelValueProp(Any);

export default {
  name: 'FormFieldsetWrapper',
  props: {
    modelValue,
    styleTokens
  },
  methods: {
    dataValue
  }
};
</script>
