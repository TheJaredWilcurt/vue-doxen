<template>
  <p
    v-if="message"
    v-text="message"
    v-bind="pAttributes"
    data-style-tokens="formFieldMessage"
    :class="styleTokens.formFieldMessage"
  ></p>
  <p
    v-if="errorMessage"
    v-text="errorMessage"
    v-bind="pAttributes"
    data-style-tokens="formFieldError formFieldMessage"
    :class="[styleTokens.formFieldError, styleTokens.formFieldMessage]"
  ></p>
  <p
    v-if="innerHTML"
    v-html="innerHTML"
    v-bind="pAttributes"
  ></p>
</template>

<script>
import {
  createErrorMessageProp,
  createMessageProp,
  styleTokens
} from '@/helpers/props.js';

const message = createMessageProp('form field');
const errorMessage = createErrorMessageProp('form field');

export default {
  name: 'FormFieldFooter',
  inheritAttrs: false,
  props: {
    errorMessage,
    message,
    innerHTML: {
      type: String,
      default: undefined,
      description: 'A way to pass arbitrary markup to be rendered via a prop.'
    },
    styleTokens
  },
  computed: {
    pAttributes: function () {
      return {
        ...this.$attrs,
        innerHTML: undefined
      };
    }
  }
};
</script>
