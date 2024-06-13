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
    <div
      v-if="codeAsString"
      v-bind="applyStyleTokens({ doxenPlainText: true })"
    >
      <CodeBox
        :id="idFor"
        :code="codeAsString"
        :styleTokens="styleTokens"
      />
    </div>
    <div
      v-else-if="asCode"
      v-bind="applyStyleTokens({ doxenPlainText: true })"
    >
      <CodeBox
        :id="idFor"
        :code="serializedModelValue || ''"
        :styleTokens="styleTokens"
      />
    </div>
    <div
      v-else
      v-text="modelValue"
      v-bind="applyStyleTokens({ doxenPlainText: true })"
      :id="idFor"
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
  createImportStatement,
  generateRandomId
} from '@/helpers/componentHelpers.js';
import {
  createErrorMessageProp,
  createMessageProp,
  createModelValueProp,
  label,
  styleTokens
} from '@/helpers/props.js';
import { serializeJavaScript } from '@/helpers/serializeJavaScript.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

import CodeBox from '@/components/CodeBox.vue';
import FormFieldFooter from '@/components/formFields/FormFieldFooter.vue';
import FormFieldLabel from '@/components/formFields/FormFieldLabel.vue';
import FormFieldsetWrapper from '@/components/formFields/FormFieldsetWrapper.vue';

const COMPONENT_NAME = 'DoxenPlainText';
const errorMessage = createErrorMessageProp('plain text');
const message = createMessageProp('plain text');
const modelValue = createModelValueProp([String, Number, Boolean, Object, Array, Function]);

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
    asCode: {
      description: 'Presents the modelValue with syntax highlighting. Assumes the code is HTML, JavaScript, or JSON.',
      type: Boolean,
      default: false
    },
    codeAsString: {
      description: 'String of a code example to display instead of the raw modelValue.',
      type: String,
      default: undefined
    }
  },
  computed: {
    serializedModelValue: function () {
      if (this.asCode) {
        try {
          return serializeJavaScript(this.modelValue);
        } catch (error) {
          console.log(error);
        }
      }
      return undefined;
    },
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
