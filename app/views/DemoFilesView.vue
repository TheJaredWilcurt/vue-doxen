<template>
  <div class="docs-page">
    <h1
      id="demo-files"
      class="docs-title"
    >
      Demo Files
    </h1>

    <p>
      Though you can simply pass a component in directly to Vue-Doxen and it will be demo'd, you may want greater control over the documentation page that is generated. Demo objects let you do that, and it is common to have one file per demo object.
    </p>

    <p>
      Your demo object requires a <code>component</code> property with a value of an imported Vue component. Everything else in a demo object is <strong>optional</strong>.
    </p>

    <nav>
      <ul>
        <li><a href="#example">Example Demo File</a></li>
        <li><a href="#using">Using Demo Files</a></li>
      </ul>
    </nav>

    <DocumentationSection id="example" title="Example Demo File">
      <CodeSwapper
        fileName="myComponentDemo.js"
        :codeTypes="{ JavaScript: DEMO_FILE_EXAMPLE }"
        :styleTokens="styleTokens"
      />
    </DocumentationSection>

    <DocumentationSection id="using" title="Using Demo Files">
      <CodeSwapper
        :codeTypes="{
          Options: DEMO_FILE_USAGE_EXAMPLE,
          Composition: DEMO_FILE_USAGE_COMPOSITION_EXAMPLE,
          'Script Setup': DEMO_FILE_USAGE_SCRIPT_SETUP_EXAMPLE
        }"
        fileName="DocumentationPage.vue"
        :styleTokens="styleTokens"
      />
    </DocumentationSection>
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import CodeSwapper from '@/components/CodeSwapper.vue';
import DocumentationSection from '@@@/components/DocumentationSection.vue';

import {
  DEMO_FILE_EXAMPLE,
  DEMO_FILE_USAGE_EXAMPLE,
  DEMO_FILE_USAGE_COMPOSITION_EXAMPLE,
  DEMO_FILE_USAGE_SCRIPT_SETUP_EXAMPLE
} from '@@@/helpers/codeSnippets.js';

export default {
  name: 'DemoFilesView',
  components: {
    CodeSwapper,
    DocumentationSection
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
