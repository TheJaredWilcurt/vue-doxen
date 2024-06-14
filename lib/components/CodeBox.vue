<template>
  <div
    v-bind="applyStyleTokens({ codeBoxContainer: true })"
    role="button"
    tabindex="0"
    @mouseover="showCopy = true"
    @focus="showCopy = true"
    @mouseout="showCopy = false"
    @blur="showCopy = true"
  >
    <HighlightJS
      v-bind="applyStyleTokens({ codeBox: true })"
      :autodetect="false"
      :code="code"
      :language="language"
      :key="index"
    />
    <button
      v-bind="applyStyleTokens({
        codeBoxCopied: copied,
        codeBoxCopy: !copied,
        codeBoxCopyButton: true,
        codeBoxCopyVisible: showCopy
      })"
      @blur="showCopy = false"
      @click="copy"
    >
      <template v-if="copied">
        Copied
      </template>
      <template v-else>
        Copy
      </template>
    </button>
  </div>
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
      copied: false,
      showCopy: false,
      index: 0
    };
  },
  methods: {
    copy: async function () {
      try {
        await navigator.clipboard.writeText(this.code);
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2100);
      } catch (error) {
        console.error(error.message);
      }
    }
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
