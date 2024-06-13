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
      v-if="uniqueOptions"
      v-bind="applyStyleTokens({ formFieldRadioDialsContainer: true })"
    >
      <div
        v-for="option in uniqueOptions"
        v-bind="applyStyleTokens({ formFieldRadioDialContainer: true })"
        :key="'option' + option.uniqueId"
      >
        <input
          v-bind="{
            ...$attrs,
            ...applyStyleTokens({
              formFieldRadioDial: true,
              formFieldRadioDialError: errorMessage
            })
          }"
          :id="createRadioIdFor(option, label)"
          :aria-invalid="!!errorMessage"
          :aria-required="!!required"
          :checked="modelValue == option.value"
          :data-test="'radio-button-' + option.value"
          :data-value="dataValue(modelValue == option.value)"
          :disabled="disabled"
          :name="radioName"
          :required="required"
          type="radio"
          :value="option.value"
          @input="updateValue(option.value)"
        />
        <label
          v-text="option.name"
          v-bind="applyStyleTokens({
            formFieldRadioDialNameLabel: true,
            formFieldRadioDialNameDisabled: disabled,
            formFieldRadioDialNameError: errorMessage
          })"
          :for="createRadioIdFor(option, label)"
        ></label>
      </div>
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
import _cloneDeep from 'lodash.clonedeep';

import {
  createImportStatement,
  createRadioIdFor,
  generateRandomId,
  replaceWeirdCharacters
} from '@/helpers/componentHelpers.js';
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
import { dataValue } from '@/helpers/snapshotHelpers.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

import FormFieldFooter from '@/components/formFields/FormFieldFooter.vue';
import FormFieldLabel from '@/components/formFields/FormFieldLabel.vue';
import FormFieldsetWrapper from '@/components/formFields/FormFieldsetWrapper.vue';

const COMPONENT_NAME = 'DoxenRadioDials';
const disabled = createDisabledProp('radio buttons');
const errorMessage = createErrorMessageProp('radio buttons');
const message = createMessageProp('radio buttons');
const modelValue = createModelValueProp([String, Number, Boolean]);
const options = createOptionsProp(COMPONENT_NAME);

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
    disabled,
    errorMessage,
    label,
    message,
    modelValue,
    options,
    required,
    styleTokens
  },
  methods: {
    createRadioIdFor,
    dataValue,
    updateValue: function (value) {
      this.$emit('update:model-value', value);
    }
  },
  computed: {
    uniqueOptions: function () {
      if (!this.options || !Array.isArray(this.options)) {
        return [];
      }
      return _cloneDeep(this.options)
        .map((option) => {
          return {
            ...option,
            uniqueId: generateRandomId()
          };
        });
    },
    radioName: function () {
      const label = this.label;
      const uniqueIds = this.uniqueOptions
        .map((option) => {
          return option.uniqueId;
        })
        .filter(Boolean);
      const names = this.uniqueOptions
        .map((option) => {
          return option.name;
        })
        .filter(Boolean);
      const name = [
        'VueDoxen',
        label,
        uniqueIds.join(' '),
        names.join(' ')
      ].filter(Boolean).join('_');
      return replaceWeirdCharacters(name);
    }
  }
};
</script>
