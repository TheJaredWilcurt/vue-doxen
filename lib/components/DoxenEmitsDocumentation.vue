<template>
  <h3 v-bind="applyStyleTokens({ componentDemoH3: true })">Emits Documentation</h3>
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
        v-if="emit.description || emit.value || emit.example"
        v-bind="applyStyleTokens({ emitsDocumentationUl: true })"
      >
        <li
          v-if="emit.description"
          v-bind="applyStyleTokens({ emitsDocumentationLi: true })"
        >
          <strong
            v-text="'Description:'"
            v-bind="applyStyleTokens({ emitsDocumentationStrong: true })"
          ></strong>&nbsp;
          <span
            v-html="emit.description"
            v-bind="applyStyleTokens({ emitsDocumentationSpan: true})"
          ></span>
        </li>
        <li
          v-if="emit.value"
          v-bind="applyStyleTokens({ emitsDocumentationLi: true })"
        >
          <strong
            v-text="'Value:'"
            v-bind="applyStyleTokens({ emitsDocumentationStrong: true })"
          ></strong>&nbsp;
          <span
            v-html="emit.value"
            v-bind="applyStyleTokens({ emitsDocumentationSpan: true })"
          ></span>
        </li>
        <li
          v-if="emit.example"
          v-bind="applyStyleTokens({ emitsDocumentationLi: true })"
        >
          <strong
            v-text="'Example:'"
            v-bind="applyStyleTokens({ emitsDocumentationStrong: true })"
          ></strong>
          <CodeBox
            :code="emit.example"
            :styleTokens="styleTokens"
          />
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { createImportStatement } from '@/helpers/componentHelpers.js';
import { styleTokens } from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

import CodeBox from '@/components/CodeBox.vue';

const COMPONENT_NAME = 'DoxenEmitsDocumentation';

export default {
  ...createImportStatement(COMPONENT_NAME),
  name: COMPONENT_NAME,
  components: {
    CodeBox
  },
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
