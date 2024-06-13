<template>
  <FormFieldsetWrapper
    :modelValue="modelValue"
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
            formFieldTextareaError: errorMessage
          })
        }"
        :id="idFor"
        :name="idFor"
        :aria-invalid="!!errorMessage"
        :aria-required="!!required"
        :data-test="idFor"
        :data-value="dataValue(modelValue)"
        :disabled="disabled"
        :required="required"
        :value="modelValue"
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

const COMPONENT_NAME = 'DoxenTextarea';
const disabled = createDisabledProp('textarea');
const errorMessage = createErrorMessageProp('textarea');
const message = createMessageProp('textarea');
const modelValue = createModelValueProp(String);

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
  methods: {
    dataValue,
    updateValue: function ($event) {
      this.$emit('update:model-value', $event.target.value);
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
