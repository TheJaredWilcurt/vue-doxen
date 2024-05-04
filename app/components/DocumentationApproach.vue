<template>
  <li>
    <slot></slot>
    <CodeBox
      :code="code"
      :language="language"
      :styleTokens="styleTokens"
    />
  </li>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import CodeBox from '@/components/CodeBox.vue';

export default {
  name: 'DocumentationApproach',
  components: {
    CodeBox
  },
  props: {
    code: {
      type: String,
      required: true
    },
    language: {
      type: String,
      default: 'javascript'
    },
    styleTokens
  }
};
</script>
