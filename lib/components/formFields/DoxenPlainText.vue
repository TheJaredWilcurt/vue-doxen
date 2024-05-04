<template>
  <FormFieldsetWrapper
    :modelValue="modelValue"
    :styleTokens="styleTokens"
  >
    <FormFieldLabel
      :disabled="disabled"
      :errorMessage="errorMessage"
      :idFor="idFor"
      :label="label"
      :required="required"
      :styleTokens="styleTokens"
    />
    <div
      v-text="modelValue"
      v-bind="applyStyleTokens({ doxenPlainText: true })"
    ></div>
    <FormFieldFooter
      :errorMessage="errorMessage"
      :innerHTML="$attrs.innerHTML"
      :message="message"
      :styleTokens="styleTokens"
    />
    <slot></slot>
  </FormFieldsetWrapper>
</template>

<script>
import { createIdFor } from '@/helpers/componentHelpers.js';
import {
  createDisabledProp,
  createErrorMessageProp,
  createMessageProp,
  createModelValueProp,
  createOptionsProp,
  label,
  required,
  styleTokens
} from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

import FormFieldFooter from '@/components/formFields/FormFieldFooter.vue';
import FormFieldLabel from '@/components/formFields/FormFieldLabel.vue';
import FormFieldsetWrapper from '@/components/formFields/FormFieldsetWrapper.vue';

const COMPONENT_NAME = 'DoxenPlainText';
const disabled = createDisabledProp('radio buttons');
const errorMessage = createErrorMessageProp('radio buttons');
const message = createMessageProp('radio buttons');
const modelValue = createModelValueProp([String, Number, Boolean, Object, Array]);
const options = createOptionsProp(COMPONENT_NAME);

export default {
  name: COMPONENT_NAME,
  components: {
    FormFieldFooter,
    FormFieldLabel,
    FormFieldsetWrapper
  },
  mixins: [applyStyleTokens],
  props: {
    disabled,
    errorMessage,
    label,
    message,
    modelValue,
    options,
    required,
    styleTokens
  },
  computed: {
    uniqueId: function () {
      return crypto.randomUUID();
    },
    idFor: function () {
      return createIdFor({
        label: this.label,
        uniqueId: this.uniqueId
      });
    }
  }
};
</script>
