<template>
  <!-- eslint-disable vue/no-v-text-v-html-on-component -->
  <component
    v-for="(node, nodeIndex) in astTree"
    v-html="node.source"
    :is="node.tag"
    :key="'slot-item' + nodeIndex"
  />
</template>

<script>
/**
 * @file This renders HTML markup without a wrapper element (required by v-html).
 */

/* eslint-disable-next-line import/no-extraneous-dependencies */
import { parseDocument } from 'htmlparser2';

export default {
  name: 'HtmlFragments',
  props: {
    html: {
      type: String,
      default: ''
    }
  },
  computed: {
    astTree: function () {
      const xmlOptions = {
        withStartIndices: true,
        withEndIndices: true,
        decodeEntities: false,
        lowerCaseAttributeNames: false,
        normalizeWhitespace: false,
        recognizeSelfClosing: false,
        xmlMode: false
      };
      return parseDocument(this.html, xmlOptions)
        .children
        .filter((node) => {
          return node && node.type === 'tag';
        })
        .map((node) => {
          return {
            source: this.html.substring(node.startIndex, node.endIndex + 1),
            tag: node.name
          };
        });
    }
  }
};
</script>
