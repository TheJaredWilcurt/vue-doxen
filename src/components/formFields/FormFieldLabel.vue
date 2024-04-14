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
  label,
  required,
  styleTokens
} from '@/helpers/props.js';

export default {
  name: 'FormFieldLabel',
  props: {
    label,
    required,
    styleTokens
  }
};
</script>
