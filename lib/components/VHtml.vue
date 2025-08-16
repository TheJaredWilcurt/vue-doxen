<template>
  <component
    v-for="node in astTree"
    v-html="node.source"
    :is="node.tag"
  />
</template>

<script>
import * as htmlparser2 from 'htmlparser2';

export default {
  name:'VHtml',
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
      return htmlparser2
        .parseDocument(this.html, xmlOptions)
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
