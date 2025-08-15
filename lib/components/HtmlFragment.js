/**
 * @file This is a render function component that allows placing strings of markup
 *       on the page without the need for a wrapper element, like with v-html.
 */

import { createVNode } from 'vue';

function isValidHtml (htmlString) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'application/xml');
    const errorNode = doc.querySelector('parsererror');
    return !errorNode;
  } catch {
    return false;
  }
}
function createHtmlNodes (html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  const childNodes = Array.from(container.childNodes);
  function processNode (node) {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const attributes = {};
      Array.from(node.attributes).forEach(function (attribute) {
        attributes[attribute.nodeName] = attribute.nodeValue;
      });
      return createVNode(
        node.tagName.toLowerCase(),
        attributes,
        Array.from(node.childNodes)
          .map(processNode)
          .filter(Boolean)
      );
    }
    return null;
  }
  const vNodes = childNodes
    .map(processNode)
    .filter(Boolean);
  return vNodes;
}

let markup;

const HtmlFragment = {
  props: ['html'],
  render: function (props) {
    if (isValidHtml(props.html)) {
      markup = props.html;
    }
    if (markup) {
      return createHtmlNodes(markup);
    }
    return null;
  }
};

export default HtmlFragment;
