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
      data-style-tokens="formFieldTextareaContainer"
      :class="styleTokens.formFieldTextareaContainer"
    >
      <textarea
        :id="idFor"
        :value="modelValue"
        :name="idFor"
        :aria-required="required"
        :aria-invalid="errorMessage"
        :disabled="disabled"
        :required="required"
        data-style-tokens="formFieldTextarea formFieldTextareaError"
        :class="{
          [styleTokens.formFieldTextarea]: true,
          [styleTokens.formFieldTextareaError]: errorMessage
        }"
        :data-test="idFor"
        :data-value="dataValue(modelValue)"
        v-bind="{ ...$attrs, innerHTML: undefined }"
        @input="updateValue"
      ></textarea>
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

const COMPONENT_NAME = 'DoxenTextarea';
const disabled = createDisabledProp('textarea');
const errorMessage = createErrorMessageProp('textarea');
const message = createMessageProp('textarea');
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
