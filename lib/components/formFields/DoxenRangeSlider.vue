<template>
  <FormFieldsetWrapper
    :modelValue="modelValue"
    :styleTokens="styleTokens"
  >
    <FormFieldLabel
      :disabled="disabled"
      :errorMessage="errorMessage"
      :label="label"
      :idFor="idFor"
      :required="required"
      :styleTokens="styleTokens"
    />
    <div v-bind="applyStyleTokens({ formFieldRangeSliderContainer: true })">
      <input
        v-bind="{
          ...$attrs,
          ...applyStyleTokens({
            formFieldRangeSlider: true,
            formFieldRangeSliderError: errorMessage
          })
        }"
        :id="idFor"
        :aria-invalid="!!errorMessage"
        :aria-required="!!required"
        :data-test="idFor"
        :data-value="dataValue(modelValue)"
        :disabled="disabled"
        :name="idFor"
        :min="min"
        :max="max"
        :required="required"
        type="range"
        :value="modelValue"
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

const COMPONENT_NAME = 'DoxenRangeSlider';
const disabled = createDisabledProp('number input');
const errorMessage = createErrorMessageProp('number input');
const message = createMessageProp('number input');
const modelValue = createModelValueProp(Number);

export default {
  ...createImportStatement(COMPONENT_NAME),
  name: COMPONENT_NAME,
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
  props: {
    min: {
      description: 'The lower numberic bound used by the range slider.',
      type: Number,
      default: 0
    },
    max: {
      description: 'The upper numberic bound used by the range slider.',
      type: Number,
      default: 100
    },
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
      this.$emit('update:model-value', parseInt($event.target.value));
    }
  },
  computed: {
    uniqueId: function () {
      return generateRandomId();
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
