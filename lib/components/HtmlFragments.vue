<template>
  <!-- eslint-disable vue/no-v-text-v-html-on-component -->
  <component
    v-for="(node, nodeIndex) in astTree"
    v-bind="node.attributes"
    v-html="node.childrenHtml"
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
          if (!node) {
            return false;
          }
          if (node.type === 'tag') {
            return true;
          }
          if (node.type === 'text') {
            const text = this.html.substring(node.startIndex, node.endIndex + 1);
            if (text.trim()) {
              return true
            }
          }
          return false;
        })
        .map((node) => {
          if (node.type === 'text') {
            return {
              attributes: {},
              childrenHtml: this.html.substring(node.startIndex, node.endIndex + 1),
              tag: 'span'
            };
          }
          if (!node.children.length) {
            return {
              attributes: node.attribs,
              childrenHtml: '',
              tag: node.name
            };
          }
          let start = node.endIndex;
          let end = node.startIndex;
          node.children.forEach((child) => {
            if (child.startIndex < start) {
              start = child.startIndex;
            }
            if (child.endIndex > end) {
              end = child.endIndex;
            }
          });
          return {
            attributes: node.attribs,
            childrenHtml: this.html.substring(start, end + 1),
            tag: node.name
          };
        });
    }
  }
};
</script>
