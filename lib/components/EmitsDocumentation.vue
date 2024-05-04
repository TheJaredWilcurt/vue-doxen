<template>
  <ul v-bind="applyStyleTokens({ emitsDocumentationUl: true })">
    <template v-if="!emitsDocumentation || !emitsDocumentation.length">
      <li
        v-for="emit in component.emits"
        v-bind="applyStyleTokens({ emitsDocumentationLi: true })"
        :key="component.name + '-emit-' + emit"
      >
        <code
          v-text="emit"
          v-bind="applyStyleTokens({ emitsDocumentationCode: true })"
        ></code>
      </li>
    </template>
    <li
      v-for="(emit, emitIndex) in emitsDocumentation"
      v-bind="applyStyleTokens({ emitsDocumentationLi: true })"
      :key="component.name + '-emit-' + emitIndex"
    >
      <code
        v-text="emit.name"
        v-bind="applyStyleTokens({ emitsDocumentationCode: true })"
      ></code>
      <ul v-bind="applyStyleTokens({ emitsDocumentationUl: true })">
        <li v-bind="applyStyleTokens({ emitsDocumentationLi: true })">
          <strong
            v-text="'Event:'"
            v-bind="applyStyleTokens({ emitsDocumentationStrong: true })"
          ></strong>
          {{ emit.event }}
        </li>
        <li v-bind="applyStyleTokens({ emitsDocumentationLi: true })">
          <strong
            v-text="'Value:'"
            v-bind="applyStyleTokens({ emitsDocumentationStrong })"
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
    component: {
      type: Object,
      default: undefined
    },
    emitsDocumentation: {
      type: Array,
      default: undefined
    },
    styleTokens
  }
};
</script>
