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
    <div v-bind="applyStyleTokens({ formFieldCheckboxContainer: true })">
      <input
        v-bind="{
          ...$attrs,
          ...applyStyleTokens({
            formFieldCheckbox: true,
            formFieldCheckboxError: errorMessage
          })
        }"
        :id="idFor"
        :aria-invalid="!!errorMessage"
        :aria-required="!!required"
        :checked="modelValue"
        :data-test="idFor"
        :data-value="dataValue(modelValue)"
        :disabled="disabled"
        :name="idFor"
        :required="required"
        type="checkbox"
        @input="updateValue"
      />
      <label
        v-bind="applyStyleTokens({
          formFieldCheckboxNameLabel: true,
          formFieldCheckboxNameDisabled: disabled,
          formFieldCheckboxNameError: errorMessage
        })"
        :for="idFor"
      >
        {{ name }}
        <span
          v-if="!label && required"
          v-text="'*'"
          v-bind="applyStyleTokens({ formFieldRequired: true })"
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
import {
  createIdFor,
  createImportStatement,
  generateRandomId
} from '@/helpers/componentHelpers.js';
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

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

import FormFieldFooter from '@/components/formFields/FormFieldFooter.vue';
import FormFieldLabel from '@/components/formFields/FormFieldLabel.vue';
import FormFieldsetWrapper from '@/components/formFields/FormFieldsetWrapper.vue';

const COMPONENT_NAME = 'DoxenCheckbox';
const disabled = createDisabledProp('checkbox');
const errorMessage = createErrorMessageProp('checkbox');
const message = createMessageProp('checkbox');
const modelValue = createModelValueProp(Boolean);

export default {
  ...createImportStatement(COMPONENT_NAME),
  name: COMPONENT_NAME,
  description: 'A checkbox form field component.',
  components: {
    FormFieldFooter,
    FormFieldLabel,
    FormFieldsetWrapper
  },
  mixins: [
    applyStyleTokens
  ],
  inheritAttrs: false,
  emits: ['update:model-value'],
  emitsToDemo: {
    'update:model-value': {
      value: 'A boolean matching if the checkbox is currently checked.'
    }
  },
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
      this.$emit('update:model-value', $event.target.checked);
    }
  },
  computed: {
    uniqueId: function () {
      return generateRandomId();
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
