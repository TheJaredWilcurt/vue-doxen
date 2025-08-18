<template>
  <!-- eslint-disable vue/no-v-text-v-html-on-component -->
  <component
    v-for="(node, nodeIndex) in astTree"
    v-html="node.childrenHtml"
    v-bind="node.attributes"
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

const badAttributeAndTagCharacters = [
  '<',
  '>',
  '(',
  ')',
  '[',
  ']',
  '/',
  '\\',
  ':',
  ';',
  '=',
  '#',
  '@',
  '!',
  '$',
  '%',
  '^',
  '*',
  '|',
  '+',
  '&',
  ',',
  '~',
  '`',
  '\'',
  '"',
  ' '
];

function checkTagOrAttributeName (attributeOrTagName) {
  return badAttributeAndTagCharacters.some((character) => {
    return attributeOrTagName.includes(character);
  });
}

function cleanTagOrAttributeName (attributeOrTagName) {
  return attributeOrTagName
    .trim()
    .split('')
    .filter((character) => {
      return !badAttributeAndTagCharacters.includes(character);
    })
    .join('');
}


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
          if (node && node.type === 'tag') {
            return true;
          }
          if (node && node.type === 'text') {
            const text = this.html.substring(node.startIndex, node.endIndex + 1);
            if (text.trim()) {
              return true;
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

          const attributes = node.attribs;
          /**
           * When mid-typing, you may have something like '<div <div></div>'
           * which gets interpreted as `attribs: { '<div': '' }`.
           * This is an invalid attribute name, causing a console error,
           * so we avoid that with this fix:
           */
          for (const attributeName in attributes) {
            const hasBadCharacter = checkTagOrAttributeName(attributeName);
            if (hasBadCharacter) {
              const newName = cleanTagOrAttributeName(attributeName);
              if (newName) {
                attributes[newName] = attributes[attributeName];
              }
              delete attributes[attributeName];
            }
          }

          /**
           * When mid-typing, you may have something like '<d<div></div>'
           * which gets interpretted as the tag name 'd<div'.
           * This is an invalid tag name and causes a console error,
           * so we avoid that with this fix:
           */
          const tag = cleanTagOrAttributeName(node.name) || 'span';

          if (!node.children.length) {
            return {
              attributes,
              childrenHtml: '',
              tag
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
            attributes,
            childrenHtml: this.html.substring(start, end + 1),
            tag
          };
        });
    }
  }
};
</script>
