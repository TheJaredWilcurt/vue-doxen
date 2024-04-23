<template>
  <ul v-bind="applyStyleTokens({ propsDocumentationUl: true })">
    <li
      v-for="(value, prop) in component.props"
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
          v-if="'type' in value"
          v-bind="applyStyleTokens({ propsDocumentationLi: true })"
        >
          <strong v-bind="applyStyleTokens({ propsDocumentationStrong: true })">
            Type:
          </strong>&nbsp;
          <em>{{ typeToString(value.type) }}</em>
        </li>
        <li
          v-if="value.allowed"
          v-bind="applyStyleTokens({ propsDocumentationLi: true })"
        >
          <strong v-bind="applyStyleTokens({ propsDocumentationStrong: true })">
            Allowed:
          </strong>&nbsp;
          <span v-html="formatAllowed(value.allowed)"></span>
        </li>
        <li
          v-if="'default' in value"
          v-bind="applyStyleTokens({ propsDocumentationLi: true })"
        >
          <strong v-bind="applyStyleTokens({ propsDocumentationStrong: true })">
            Default:
          </strong>&nbsp;
          <code v-bind="applyStyleTokens({ propsDocumentationCode: true })">{{ formatDefault(value.default) }}</code>
        </li>
        <li
          v-if="value.example"
          v-bind="applyStyleTokens({ propsDocumentationLi: true })"
        >
          <strong v-bind="applyStyleTokens({ propsDocumentationStrong: true })">
            Example:
          </strong>
          <CodeBox
            :code="value.example"
            language="javascript"
            :styleTokens="styleTokens"
          />
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { humanList, wrapString } from '@/helpers/componentHelpers.js';
import { typeToString } from '@/helpers/demoHelpers.js';
import { styleTokens } from '@/helpers/props.js';
import { dataValue } from '@/helpers/snapshotHelpers.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

import CodeBox from '@/components/CodeBox.vue';

export default {
  name: 'PropsDocumentation',
  components: {
    CodeBox
  },
  mixins: [applyStyleTokens],
  props: {
    component: {
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
        return value();
      }
      return dataValue(value);
    }
  }
};
</script>
