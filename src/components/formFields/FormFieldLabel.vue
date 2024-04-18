<template>
  <legend
    v-if="label"
    v-bind="applyStyleTokens({
      formFieldLegend: true,
      formFieldLegendDisabled: disabled,
      formFieldLegendError: errorMessage
    })"
  >
    {{ label }}:
    <span
      v-if="required"
      v-text="'*'"
      v-bind="applyStyleTokens({ formFieldRequired: true })"
    ></span>
  </legend>
</template>

<script>
import {
  createDisabledProp,
  createErrorMessageProp,
  label,
  required,
  styleTokens
} from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

const disabled = createDisabledProp('form field');
const errorMessage = createErrorMessageProp('form field');

export default {
  name: 'FormFieldLabel',
  mixins: [
    applyStyleTokens
  ],
  props: {
    disabled,
    errorMessage,
    label,
    required,
    styleTokens
  }
};
</script>
