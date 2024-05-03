<template>
  <ul v-bind="applyStyleTokens({ propsDocumentationUl: true })">
    <li
      v-for="(value, prop) in props"
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
          v-if="'validator' in value && typeof(value.validator) === 'function'"
          v-bind="applyStyleTokens({ propsDocumentationLi: true })"
        >
          <strong
            v-text="'Validator:'"
            v-bind="applyStyleTokens({ propsDocumentationStrong: true })"
          ></strong>&nbsp;
          <CodeBox
            :code="unindent('' + value.validator)"
            :styleTokens="styleTokens"
          />
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
import { humanList, wrapString } from '@/helpers/componentHelpers.js';
import {
  combinePropsAndPropsToDemo,
  typeToString
} from '@/helpers/demoHelpers.js';
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
    propsToDemo: {
      type: Object,
      required: true
    },
    styleTokens
  },
  methods: {
    typeToString,
    /**
     * Fixes indentation on strings of code. This is a naive implementation.
     * If the code includes a open/closing character inside of a string it
     * will just assume it is code rather than text. This function does not
     * even work on itself.
     *
     * TODO: Improve this to work better.
     *
     * @param  {string} value  A string of code.
     * @return {string}        A string of code with proper indentation.
     */
    unindent: function (value) {
      let amount = 0;
      return (value || '')
        .split('\n')
        .map((line) => {
          const amountOfOpenBrace = line.split('[').length - 1;
          const amountOfOpenCurly = line.split('{').length - 1;
          const amountOfOpenParen = line.split('(').length - 1;

          const amountOfCloseBrace = line.split(']').length - 1;
          const amountOfCloseCurly = line.split('}').length - 1;
          const amountOfCloseParen = line.split(')').length - 1;

          const opens = (
            Math.max(amountOfOpenBrace - amountOfCloseBrace, 0) +
            Math.max(amountOfOpenCurly - amountOfCloseCurly, 0) +
            Math.max(amountOfOpenParen - amountOfCloseParen, 0)
          );
          const closes = (
            Math.max(amountOfCloseBrace - amountOfOpenBrace, 0) +
            Math.max(amountOfCloseCurly - amountOfOpenCurly, 0) +
            Math.max(amountOfCloseParen - amountOfOpenParen, 0)
          );

          amount = amount + (closes * -2);
          const indentation = (new Array(amount)).fill(' ').join('');
          amount = amount + (opens * 2);

          return indentation + line.trim();
        })
        .join('\n');
    },
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
  },
  computed: {
    props: function () {
      return combinePropsAndPropsToDemo(this.propsToDemo, this.component.props);
    }
  }
};
</script>
