<template>
  <ul v-bind="applyStyleTokens({ emitsDocumentationUl: true })">
    <li
      v-for="(emit, emitName) in emitsToDemo"
      v-bind="applyStyleTokens({ emitsDocumentationLi: true })"
      :key="componentName + '-emit-' + emitName"
    >
      <code
        v-text="'@' + emitName"
        v-bind="applyStyleTokens({ emitsDocumentationCode: true })"
      ></code>
      <ul
        v-if="emit.description || emit.value"
        v-bind="applyStyleTokens({ emitsDocumentationUl: true })"
      >
        <li
          v-if="emit.description"
          v-bind="applyStyleTokens({ emitsDocumentationLi: true })"
        >
          <strong
            v-text="'Description:'"
            v-bind="applyStyleTokens({ emitsDocumentationStrong: true })"
          ></strong>
          {{ emit.description }}
        </li>
        <li
          v-if="emit.value"
          v-bind="applyStyleTokens({ emitsDocumentationLi: true })"
        >
          <strong
            v-text="'Value:'"
            v-bind="applyStyleTokens({ emitsDocumentationStrong: true })"
          ></strong>
          {{ emit.value }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

export default {
  name: 'EmitsDocumentation',
  mixins: [
    applyStyleTokens
  ],
  props: {
    componentName: {
      type: String,
      default: undefined
    },
    emitsToDemo: {
      type: Object,
      default: undefined
    },
    styleTokens
  }
};
</script>
