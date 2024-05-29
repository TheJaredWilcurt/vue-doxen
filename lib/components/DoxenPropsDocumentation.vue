<template>
  <h3 v-bind="applyStyleTokens({ componentDemoH3: true })">Props Documentation</h3>
  <ul v-bind="applyStyleTokens({ propsDocumentationUl: true })">
    <li
      v-for="(value, prop) in propsToDemo"
      v-bind="applyStyleTokens({ propsDocumentationLi: true })"
      :key="prop"
    >
      <code v-bind="applyStyleTokens({ propsDocumentationCode: true })">{{ prop }}</code>
      <ul v-bind="applyStyleTokens({ propsDocumentationUl: true })">
        <li
          v-if="value.description"
          v-html="value.description"
          v-bind="applyStyleTokens({ propsDocumentationLi: true })"
        ></li>
        <li
          v-if="value.required"
          v-bind="applyStyleTokens({ propsDocumentationLi: true })"
        >
          This is a <strong v-bind="applyStyleTokens({ propsDocumentationStrong: true })">required</strong> prop.
        </li>
        <li
          v-else
          v-bind="applyStyleTokens({ propsDocumentationLi: true })"
        >
          This prop is <strong v-bind="applyStyleTokens({ propsDocumentationStrong: true })">optional</strong>.
        </li>
        <li
          v-if="'validator' in value && typeof(value.validator) === 'function'"
          v-bind="applyStyleTokens({ propsDocumentationLi: true })"
        >
          This prop uses a <strong v-bind="applyStyleTokens({ propsDocumentationStrong: true })">validator</strong> function.
        </li>
        <li
          v-if="'type' in value"
          v-bind="applyStyleTokens({ propsDocumentationLi: true })"
        >
          <strong
            v-text="'Type:'"
            v-bind="applyStyleTokens({ propsDocumentationStrong: true })"
          ></strong>&nbsp;
          <em
            v-text="typeToString(value.type)"
            v-bind="applyStyleTokens({ propsDocumentationEm: true })"
          ></em>
        </li>
        <li
          v-if="value.allowed"
          v-bind="applyStyleTokens({ propsDocumentationLi: true })"
        >
          <strong
            v-text="'Allowed:'"
            v-bind="applyStyleTokens({ propsDocumentationStrong: true })"
          ></strong>&nbsp;
          <span
            v-html="formatAllowed(value.allowed)"
            v-bind="applyStyleTokens({ propsDocumentationSpan: true })"
          ></span>
        </li>
        <li
          v-if="'default' in value"
          v-bind="applyStyleTokens({ propsDocumentationLi: true })"
        >
          <strong
            v-text="'Default:'"
            v-bind="applyStyleTokens({ propsDocumentationStrong: true })"
          ></strong>&nbsp;
          <code
            v-text="formatDefault(value.default)"
            v-bind="applyStyleTokens({ propsDocumentationCode: true })"
          ></code>
        </li>
        <li
          v-if="value.example"
          v-bind="applyStyleTokens({ propsDocumentationLi: true })"
        >
          <strong
            v-text="'Example:'"
            v-bind="applyStyleTokens({ propsDocumentationStrong: true })"
          ></strong>
          <CodeBox
            :code="value.example"
            :styleTokens="styleTokens"
          />
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import {
  createImportStatement,
  humanList,
  wrapString
} from '@/helpers/componentHelpers.js';
import { typeToString } from '@/helpers/demoHelpers.js';
import { styleTokens } from '@/helpers/props.js';
import { dataValue } from '@/helpers/snapshotHelpers.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

import CodeBox from '@/components/CodeBox.vue';

const COMPONENT_NAME = 'DoxenPropsDocumentation';

export default {
  ...createImportStatement(COMPONENT_NAME),
  name: COMPONENT_NAME,
  components: {
    CodeBox
  },
  mixins: [applyStyleTokens],
  props: {
    propsToDemo: {
      type: Object,
      required: true
    },
    styleTokens
  },
  methods: {
    typeToString,
    formatAllowed: function (arr) {
      arr = arr.map(function (value) {
        value = wrapString(value, '\'');
        value = '<code>' + value + '</code>';
        return value;
      });
      return humanList(arr, 'and');
    },
    formatDefault: function (value) {
      if (typeof(value) === 'function') {
        value = value();
      }
      return dataValue(value);
    }
  }
};
</script>
