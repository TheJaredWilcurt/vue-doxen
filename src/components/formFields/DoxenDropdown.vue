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
      v-bind="applyStyleTokens({ formFieldDropdownContainer: true })"
    >
      <select
        v-bind="{
          ...$attrs,
          ...applyStyleTokens({
            formFieldDropdown: true,
            formFieldDropdownError: errorMessage
          }),
          innerHTML: undefined
        }"
        :id="idFor"
        :aria-required="required"
        :aria-invalid="errorMessage"
        :data-value="dataValue(modelValue)"
        :disabled="disabled"
        :name="idFor"
        :required="required"
        :value="modelValue"
        @change="updateValue($event)"
      >
        <option
          v-for="option in uniqueOptions"
          v-text="option.name"
          :id="createRadioIdFor(option, label)"
          :name="radioName"
          :data-test="'option-' + option.value"
          :value="option.value"
          :key="'option' + option.uniqueId"
        ></option>
      </select>
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
  createIdFor,
  createRadioIdFor,
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

const COMPONENT_NAME = 'DoxenDropdown';
const disabled = createDisabledProp('radio buttons');
const errorMessage = createErrorMessageProp('radio buttons');
const message = createMessageProp('radio buttons');
const modelValue = createModelValueProp([String, Number, Boolean]);
const options = createOptionsProp(COMPONENT_NAME);

export default {
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
  emits: ['update:modelValue'],
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
      this.$emit('update:modelValue', value);
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
            uniqueId: crypto.randomUUID()
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
