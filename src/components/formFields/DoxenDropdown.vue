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
      data-style-tokens="formFieldDropdownContainer"
      :class="styleTokens.formFieldDropdownContainer"
    >
      <select
        v-bind="{ ...$attrs, innerHTML: undefined }"
        :id="idFor"
        data-style-tokens="formFieldDropdown formFieldDropdownError"
        :class="{
          [styleTokens.formFieldDropdown]: true,
          [styleTokens.formFieldDropdownError]: errorMessage
        }"
        :data-value="dataValue(modelValue)"
        :disabled="disabled"
        :required="required"
        :value="modelValue"
        @input="updateValue(option.value)"
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
  humanList,
  replaceWeirdCharacters,
  wrappedHumanList
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

import FormFieldFooter from '@/components/formFields/FormFieldFooter.vue';
import FormFieldLabel from '@/components/formFields/FormFieldLabel.vue';
import FormFieldsetWrapper from '@/components/formFields/FormFieldsetWrapper.vue';

const COMPONENT_NAME = 'DoxenDropdown';
const allowedOptionValueTypes = ['string', 'number', 'boolean'];
const disabled = createDisabledProp('radio buttons');
const errorMessage = createErrorMessageProp('radio buttons');
const message = createMessageProp('radio buttons');
const modelValue = createModelValueProp([String, Number, Boolean]);

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
    options: {
      type: Array,
      required: false,
      default: function () {
        return [];
      },
      description: 'Array of objects. Each object represents a radio button and contains a <code>name</code> (string) and a <code>value</code> (' + humanList(allowedOptionValueTypes) + ').',
      example: [
        '[',
        '  {',
        '    name: \'Kiva.org\',',
        '    value: \'kiva\'',
        '  },',
        '  {',
        '    name: \'Good.store\',',
        '    value: \'goodstore\'',
        '  }',
        ']'
      ].join('\n'),
      validator: function (options) {
        let valid = true;
        if (Array.isArray(options)) {
          options.forEach(function (option) {
            if (
              typeof(option) !== 'object' ||
              Array.isArray(option) ||
              !option.name ||
              (
                !allowedOptionValueTypes.includes(typeof(option.value)) &&
                option.value !== null
              )
            ) {
              console.warn('The ' + COMPONENT_NAME + ' options prop must be an array of objects with a name and a value that is a type of ' + wrappedHumanList(allowedOptionValueTypes));
              console.warn('Example:\n<' + COMPONENT_NAME + ' :options="[{ name: \'Foo\', value: 2 }]" />');
              valid = false;
            }
          });
        } else {
          valid = false;
        }
        return valid;
      }
    }
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
