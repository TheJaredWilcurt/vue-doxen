<template>
  <legend
    v-if="label"
    data-style-tokens="formFieldLegend formFieldLegendDisabled formFieldLegendError"
    :class="{
      [styleTokens.formFieldLegend]: true,
      [styleTokens.formFieldLegendDisabled]: disabled,
      [styleTokens.formFieldLegendError]: errorMessage
    }"
  >
    {{ label }}:
    <span
      v-if="required"
      v-text="'*'"
      data-style-tokens="formFieldRequired"
      :class="styleTokens.formFieldRequired"
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

const disabled = createDisabledProp('form field');
const errorMessage = createErrorMessageProp('form field');

export default {
  name: 'FormFieldLabel',
  props: {
    disabled,
    errorMessage,
    label,
    required,
    styleTokens
  }
};
</script>
