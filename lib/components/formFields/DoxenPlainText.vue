<template>
  <FormFieldsetWrapper
    :modelValue="modelValue"
    :styleTokens="styleTokens"
  >
    <FormFieldLabel
      :disabled="false"
      :errorMessage="errorMessage"
      :idFor="idFor"
      :label="label"
      :required="false"
      :styleTokens="styleTokens"
    />
    <CodeBox
      v-if="codeAsString"
      :code="codeAsString"
      :styleTokens="styleTokens"
    />
    <div
      v-else
      v-text="modelValue"
      v-bind="applyStyleTokens({ doxenPlainText: true })"
    ></div>
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
  createImportStatement
} from '@/helpers/componentHelpers.js';
import {
  createErrorMessageProp,
  createMessageProp,
  createModelValueProp,
  label,
  styleTokens
} from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

import CodeBox from '@/components/CodeBox.vue';
import FormFieldFooter from '@/components/formFields/FormFieldFooter.vue';
import FormFieldLabel from '@/components/formFields/FormFieldLabel.vue';
import FormFieldsetWrapper from '@/components/formFields/FormFieldsetWrapper.vue';

const COMPONENT_NAME = 'DoxenPlainText';
const errorMessage = createErrorMessageProp('plain text');
const message = createMessageProp('plain text');
const modelValue = createModelValueProp([String, Number, Boolean, Object, Array]);

export default {
  ...createImportStatement(COMPONENT_NAME),
  name: COMPONENT_NAME,
  components: {
    CodeBox,
    FormFieldFooter,
    FormFieldLabel,
    FormFieldsetWrapper
  },
  mixins: [applyStyleTokens],
  props: {
    errorMessage,
    label,
    message,
    modelValue,
    styleTokens,
    codeAsString: {
      description: 'String of a code example to display instead of the raw modelValue.',
      type: String,
      default: undefined
    }
  },
  computed: {
    uniqueId: function () {
      return crypto.randomUUID();
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
