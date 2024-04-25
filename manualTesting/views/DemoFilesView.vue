<template>
  <div class="docs-paragraph">
    <h1 class="docs-title">Demo Files</h1>

    <p>
      Though you can simply pass a component in directly to Vue-Doxen and it will be demo'd, you may want greater control over the documentation page that is generated. Demo objects let you do that, and it is common to have one file per demo object.
    </p>

    <h2>Example Demo File</h2>

    <p><code>myComponentDemo.js</code></p>

    <CodeBox
      :code="DEMO_FILE_EXAMPLE"
      language="javascript"
      :styleTokens="styleTokens"
    />

    <h2>Using Demo Files</h2>

    <VueApiSwapper
      :composition="DEMO_FILE_USAGE_COMPOSITION_EXAMPLE"
      fileName="DocumentationPage.vue"
      :options="DEMO_FILE_USAGE_EXAMPLE"
      :styleTokens="styleTokens"
    />
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import CodeBox from '@/components/CodeBox.vue';
import VueApiSwapper from '@@@/components/VueApiSwapper.vue';

import {
  DEMO_FILE_EXAMPLE,
  DEMO_FILE_USAGE_EXAMPLE,
  DEMO_FILE_USAGE_COMPOSITION_EXAMPLE
} from '@@@/helpers/codeSnippets.js';

export default {
  name: 'DemoFilesView',
  components: {
    CodeBox,
    VueApiSwapper
  },
  props: {
    styleTokens
  },
  constants: {
    DEMO_FILE_EXAMPLE,
    DEMO_FILE_USAGE_EXAMPLE,
    DEMO_FILE_USAGE_COMPOSITION_EXAMPLE
  }
};
</script>
