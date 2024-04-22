<template>
  <HighlightJS
    v-bind="applyStyleTokens({ codeBox: true })"
    :language="language"
    :code="code"
    :key="index"
  />
</template>

<script>
/* eslint-disable import/extensions */
import hljsVuePlugin from '@highlightjs/vue-plugin';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';

import { styleTokens } from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);
const allowedSyntax = [
  'javascript',
  'xml'
];

export default {
  name: 'CodeBox',
  components: {
    HighlightJS: hljsVuePlugin.component
  },
  mixins: [applyStyleTokens],
  props: {
    code: {
      type: String,
      default: undefined
    },
    language: {
      type: String,
      default: 'xml',
      allowed: allowedSyntax,
      validator: function (value) {
        return allowedSyntax.includes(value);
      }
    },
    styleTokens
  },
  data: function () {
    return {
      index: 0
    };
  },
  created: function () {
    // Force event loop to cycle, then trigger
    // re-applying syntax highlighting
    setTimeout(() => {
      this.index++;
    }, 0);
  }
};
</script>
