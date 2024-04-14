<template>
  <fieldset
    data-style-tokens="formFieldFieldset"
    :class="styleTokens.formFieldFieldset"
    :data-value="dataValue(modelValue)"
  >
    <FormFieldLabel
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
        data-style-tokens="formFieldCheckboxNameDisabled formFieldCheckboxNameError"
        :class="{
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
  </fieldset>
</template>

<script>
import {
  createIdFor,
  USE_VMODEL_WARNING
} from '@/helpers/componentHelpers.js';
import {
  createErrorMessageProp,
  createMessageProp,
  label,
  required,
  styleTokens
} from '@/helpers/props.js';
import { dataValue } from '@/helpers/snapshotHelpers.js';

import FormFieldFooter from '@/components/formFields/FormFieldFooter.vue';
import FormFieldLabel from '@/components/formFields/FormFieldLabel.vue';

const COMPONENT_NAME = 'DoxenCheckbox';
const message = createMessageProp('checkbox');
const errorMessage = createErrorMessageProp('checkbox');

export default {
  name: COMPONENT_NAME,
  components: {
    FormFieldFooter,
    FormFieldLabel
  },
  inheritAttrs: false,
  emits: ['update:modelValue'],
  props: {
    errorMessage,
    label,
    message,
    required,
    styleTokens,
    disabled: {
      type: Boolean,
      default: false,
      description: 'Prevents interacting with the checkbox and visually indicates the field is disabled.'
    },
    modelValue: {
      type: Boolean,
      default: null,
      description: USE_VMODEL_WARNING
    },
    name: {
      type: String,
      default: undefined,
      description: 'A clickable label placed next to the checkbox.'
    }
  },
  methods: {
    dataValue,
    updateValue: function (evt) {
      this.$emit('update:modelValue', evt.target.checked);
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
