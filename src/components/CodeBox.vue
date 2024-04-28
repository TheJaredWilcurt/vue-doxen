<template>
  <HighlightJS
    v-bind="applyStyleTokens({ codeBox: true })"
    :autodetect="false"
    :code="code"
    :language="language"
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

const JAVASCRIPT = 'javascript';
const XML = 'xml';

hljs.registerLanguage(JAVASCRIPT, javascript);
hljs.registerLanguage(XML, xml);

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
    styleTokens
  },
  data: function () {
    return {
      index: 0
    };
  },
  computed: {
    language: function () {
      if (this.code.trim().startsWith('<')) {
        return XML;
      } else {
        return JAVASCRIPT;
      }
    }
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
