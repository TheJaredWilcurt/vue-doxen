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
      data-style-tokens="formFieldCheckboxContainer"
      :class="styleTokens.formFieldCheckboxContainer"
    >
      <input
        :id="idFor"
        :checked="modelValue"
        :name="idFor"
        :aria-required="required"
        :aria-invalid="errorMessage"
        :disabled="disabled"
        :required="required"
        data-style-tokens="formFieldCheckbox formFieldCheckboxError"
        :class="{
          [styleTokens.formFieldCheckbox]: true,
          [styleTokens.formFieldCheckboxError]: errorMessage
        }"
        :data-test="idFor"
        :data-value="dataValue(modelValue)"
        type="checkbox"
        v-bind="{ ...$attrs, innerHTML: undefined }"
        @input="updateValue"
      />
      <label
        data-style-tokens="formFieldCheckboxNameLabel formFieldCheckboxNameDisabled formFieldCheckboxNameError"
        :class="{
          [styleTokens.formFieldCheckboxNameLabel]: true,
          [styleTokens.formFieldCheckboxNameDisabled]: disabled,
          [styleTokens.formFieldCheckboxNameError]: errorMessage
        }"
        :for="idFor"
      >
        {{ name }}
        <span
          v-if="!label && required"
          v-text="'*'"
          data-style-tokens="formFieldRequired"
          :class="styleTokens.formFieldRequired"
        ></span>
      </label>
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

const COMPONENT_NAME = 'DoxenCheckbox';
const disabled = createDisabledProp('checkbox');
const errorMessage = createErrorMessageProp('checkbox');
const message = createMessageProp('checkbox');
const modelValue = createModelValueProp(Boolean);

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
    modelValue,
    required,
    styleTokens,
    name: {
      type: String,
      default: undefined,
      description: 'A clickable label placed next to the checkbox.'
    }
  },
  methods: {
    dataValue,
    updateValue: function ($event) {
      this.$emit('update:modelValue', $event.target.checked);
    }
  },
  computed: {
    uniqueId: function () {
      return crypto.randomUUID();
    },
    idFor: function () {
      return createIdFor({
        label: this.label,
        value: 'boolean',
        name: this.name,
        uniqueId: this.uniqueId
      });
    }
  }
};
</script>
