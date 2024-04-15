<template>
  <FormFieldsetWrapper
    :modelValue="modelValue"
    :styleTokens="styleTokens"
  >
    <FormFieldLabel
      :disabled="disabled"
      :errorMessage="errorMessage"
      :label="label"
      :required="required"
      :styleTokens="styleTokens"
    />
    <div
      data-style-tokens="formFieldTextFieldContainer"
      :class="styleTokens.formFieldTextFieldContainer"
    >
      <input
        :id="idFor"
        :value="modelValue"
        :name="idFor"
        :disabled="disabled"
        :required="required"
        data-style-tokens="formFieldTextField formFieldTextFieldError"
        :class="{
          [styleTokens.formFieldTextField]: true,
          [styleTokens.formFieldTextFieldError]: errorMessage
        }"
        :data-test="idFor"
        :data-value="dataValue(modelValue)"
        v-bind="{ ...$attrs, innerHTML: undefined }"
        @input="updateValue"
      />
    </div>
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
  label,
  required,
  styleTokens
} from '@/helpers/props.js';
import { dataValue } from '@/helpers/snapshotHelpers.js';

import FormFieldFooter from '@/components/formFields/FormFieldFooter.vue';
import FormFieldLabel from '@/components/formFields/FormFieldLabel.vue';
import FormFieldsetWrapper from '@/components/formFields/FormFieldsetWrapper.vue';

const COMPONENT_NAME = 'DoxenTextField';
const disabled = createDisabledProp('text input');
const errorMessage = createErrorMessageProp('text input');
const message = createMessageProp('text input');
const modelValue = createModelValueProp(String);

export default {
  name: COMPONENT_NAME,
  components: {
    FormFieldFooter,
    FormFieldLabel,
    FormFieldsetWrapper
  },
  inheritAttrs: false,
  emits: ['update:modelValue'],
  props: {
    disabled,
    errorMessage,
    label,
    message,
    required,
    modelValue,
    styleTokens
  },
  methods: {
    dataValue,
    updateValue: function ($event) {
      this.$emit('update:modelValue', $event.target.value);
    }
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
