<template>
  <div
    v-bind="applyStyleTokens({ codeBoxContainer: true })"
    aria-label="Code example"
    role="textbox"
    tabindex="0"
    :title="copy ? 'Click to copy' : undefined"
    @click="copyCode"
    @keydown.enter="copyCode"
    @keydown.space.prevent.stop="copyCode"
  >
    <HighlightJS
      v-bind="applyStyleTokens({ codeBox: true })"
      :autodetect="false"
      :code="formattedCode"
      :language="language"
      :key="index"
    />
    <div
      v-if="copied"
      v-bind="applyStyleTokens({ codeBoxCopied: copied })"
    >
      Copied
    </div>
  </div>
</template>

<script>
/* eslint-disable import/extensions */
import hljsVuePlugin from '@highlightjs/vue-plugin';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';

import { styleTokens } from '@/helpers/props.js';
import { serializeJavaScript } from '@/helpers/serializeJavaScript.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

const JAVASCRIPT = 'javascript';
const XML = 'xml';

hljs.registerLanguage(JAVASCRIPT, javascript);
hljs.registerLanguage(XML, xml);

export default {
  name: 'DoxenCodeBox',
  components: {
    HighlightJS: hljsVuePlugin.component
  },
  mixins: [applyStyleTokens],
  props: {
    copy: {
      type: Boolean,
      default: true
    },
    code: {
      type: null,
      default: undefined
    },
    styleTokens
  },
  data: function () {
    return {
      copied: false,
      index: 0
    };
  },
  methods: {
    copyCode: async function () {
      if (this.copy) {
        try {
          await navigator.clipboard.writeText(this.formattedCode);
          this.copied = true;
          setTimeout(() => {
            this.copied = false;
          }, 2100);
        } catch (error) {
          console.error(error.message);
        }
      }
    }
  },
  computed: {
    formattedCode: function () {
      if (typeof(this.code) === 'string') {
        return this.code;
      }
      return serializeJavaScript(this.code);
    },
    language: function () {
      if (this.formattedCode.trim().startsWith('<')) {
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
