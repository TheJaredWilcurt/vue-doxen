<template>
  <FormFieldsetWrapper
    :modelValue="innerValue"
    :styleTokens="styleTokens"
  >
    <FormFieldLabel
      :disabled="disabled"
      :errorMessage="errorMessage"
      :idFor="idFor"
      :label="label"
      :required="required"
      :styleTokens="styleTokens"
    />
    <div v-bind="applyStyleTokens({ formFieldTextareaContainer: true })">
      <textarea
        v-bind="{
          ...$attrs,
          ...applyStyleTokens({
            formFieldTextarea: true,
            formFieldTextareaCode: true,
            formFieldTextareaError: errorMessage
          })
        }"
        :id="idFor"
        :name="idFor"
        :aria-invalid="!!errorMessage"
        :aria-required="!!required"
        :data-test="idFor"
        :data-value="dataValue(innerValue)"
        :disabled="disabled"
        :required="required"
        :value="innerValue"
        @input.prevent="updateValue"
        @keyup.prevent="validate"
      ></textarea>
    </div>
    <p
      v-if="invalid"
      v-bind="applyStyleTokens({ formFieldError: true })"
    >
      Value must be valid JSON
    </p>
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
import JSON5 from 'json5';
import _isEqual from 'lodash.isequal';

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

const COMPONENT_NAME = 'DoxenJsonTextarea';
const disabled = createDisabledProp('textarea');
const errorMessage = createErrorMessageProp('textarea');
const message = createMessageProp('textarea');
const modelValue = createModelValueProp(Object);

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
    required,
    modelValue,
    styleTokens
  },
  data: function () {
    return {
      innerValue: '',
      invalid: false
    };
  },
  methods: {
    dataValue,
    validate: function ($event) {
      const value = $event.target.value;
      this.invalid = false;
      try {
        JSON5.parse(value);
      } catch {
        this.invalid = true;
      }
    },
    setInnerValue: function (obj) {
      if (typeof(obj) === 'string') {
        this.innerValue = obj;
      } else {
        try {
          this.innerValue = JSON5.stringify(obj, null, 2);
        } catch {}
      }
    },
    updateValue: function ($event) {
      const value = $event.target.value;
      this.innerValue = value;
      let object;
      try {
        object = JSON5.parse(value);
      } catch {}
      if (object) {
        this.$emit('update:model-value', object);
      }
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
  },
  watch: {
    modelValue: async function (newValue, oldValue) {
      if (!_isEqual(newValue, oldValue) || !oldValue) {
        await this.setInnerValue(newValue);
        this.updateValue({ target: { value: this.innerValue } });
      }
    }
  },
  created: function () {
    this.setInnerValue(this.modelValue);
  }
};
</script>
