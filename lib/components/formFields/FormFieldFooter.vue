<template>
  <p
    v-if="message"
    v-text="message"
    v-bind="{
      ...$attrs,
      ...applyStyleTokens({ formFieldMessage: true })
    }"
  ></p>
  <p
    v-if="errorMessage"
    v-text="errorMessage"
    v-bind="{
      ...$attrs,
      ...applyStyleTokens({ formFieldError: true })
    }"
  ></p>
  <p
    v-if="innerHTML"
    v-html="innerHTML"
    v-bind="$attrs"
  ></p>
</template>

<script>
import {
  createErrorMessageProp,
  createMessageProp,
  styleTokens
} from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

const message = createMessageProp('form field');
const errorMessage = createErrorMessageProp('form field');

export default {
  name: 'FormFieldFooter',
  mixins: [
    applyStyleTokens
  ],
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
  }
};
</script>
