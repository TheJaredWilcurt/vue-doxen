<template>
  <legend
    v-if="label"
    v-bind="applyStyleTokens({
      formFieldLegend: true,
      formFieldLegendDisabled: disabled,
      formFieldLegendError: errorMessage
    })"
  >
    <label
      v-bind="applyStyleTokens({ formFieldLabel: true })"
      :for="idFor"
    >
      {{ label }}:
    </label>
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
    idFor: {
      type: String,
      default: undefined
    },
    label,
    required,
    styleTokens
  }
};
</script>
