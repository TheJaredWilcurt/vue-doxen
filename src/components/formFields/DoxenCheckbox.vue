<template>
  <fieldset
    data-style-tokens="formFieldFieldset"
    :class="styleTokens.formFieldFieldset"
  >
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
    <p
      v-if="message"
      v-text="message"
      data-style-tokens="formFieldMessage"
      :class="styleTokens.formFieldMessage"
    ></p>
    <p
      v-if="errorMessage"
      v-text="errorMessage"
      data-style-tokens="formFieldError formFieldMessage"
      :class="[styleTokens.formFieldError, styleTokens.formFieldMessage]"
    ></p>
    <p v-if="$attrs.innerHTML" v-html="$attrs.innerHTML"></p>
    <slot></slot>
  </fieldset>
</template>

<script>
import {
  createIdFor,
  USE_VMODEL_WARNING
} from '@/helpers/componentHelpers.js';
import { dataValue } from '@/helpers/snapshotHelpers.js';

const COMPONENT_NAME = 'DoxenCheckbox';

export default {
  name: COMPONENT_NAME,
  inheritAttrs: false,
  emits: ['update:modelValue'],
  props: {
    styleTokens: {
      type: Object,
      default: function () {
        return {};
      }
    },
    label: {
      type: String,
      default: undefined,
      description: 'A legend placed above the form field.'
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
    },
    disabled: {
      type: Boolean,
      default: false,
      description: 'Prevents interacting with the checkbox and visually indicates the field is disabled.'
    },
    required: {
      type: Boolean,
      default: false,
      description: 'Indicates a field is required and prevents form submission.'
    },
    message: {
      type: String,
      default: undefined,
      description: 'Additional helpful information below the checkbox.'
    },
    errorMessage: {
      type: String,
      default: undefined,
      description: 'Error message that appears below the checkbox.'
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
