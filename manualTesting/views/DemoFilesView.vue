<template>
  <div class="docs-page">
    <h1 class="docs-title">Demo Files</h1>

    <p>
      Though you can simply pass a component in directly to Vue-Doxen and it will be demo'd, you may want greater control over the documentation page that is generated. Demo objects let you do that, and it is common to have one file per demo object.
    </p>

    <p>
      Your demo object requires a <code>component</code> property with a value of an imported Vue component. Everything else in a demo object is <strong>optional</strong>.
    </p>

    <h2>Example Demo File</h2>

    <CodeSwapper
      fileName="myComponentDemo.js"
      :codeTypes="{ JavaScript: DEMO_FILE_EXAMPLE }"
      :styleTokens="styleTokens"
    />

    <h2>Using Demo Files</h2>

    <CodeSwapper
      :codeTypes="{
        Options: DEMO_FILE_USAGE_EXAMPLE,
        Composition: DEMO_FILE_USAGE_COMPOSITION_EXAMPLE,
        'Script Setup': DEMO_FILE_USAGE_SCRIPT_SETUP_EXAMPLE
      }"
      fileName="DocumentationPage.vue"
      :styleTokens="styleTokens"
    />
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import CodeSwapper from '@/components/CodeSwapper.vue';

import {
  DEMO_FILE_EXAMPLE,
  DEMO_FILE_USAGE_EXAMPLE,
  DEMO_FILE_USAGE_COMPOSITION_EXAMPLE,
  DEMO_FILE_USAGE_SCRIPT_SETUP_EXAMPLE
} from '@@@/helpers/codeSnippets.js';

export default {
  name: 'DemoFilesView',
  components: {
    CodeSwapper
  },
  props: {
    styleTokens
  },
  constants: {
    DEMO_FILE_EXAMPLE,
    DEMO_FILE_USAGE_EXAMPLE,
    DEMO_FILE_USAGE_COMPOSITION_EXAMPLE,
    DEMO_FILE_USAGE_SCRIPT_SETUP_EXAMPLE
  }
};
</script>
