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
        <li>
          <a href="#custom-components">Using custom components on Demo pages</a>
          <ul>
            <li><a href="#globally">Globally replacing Vue-Doxen components</a></li>
          </ul>
        </li>
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

    <DocumentationSection id="custom-components" title="Using custom components on Demo pages">
      <p>
        In the Props Playground on a demo page, each prop will be represented with an interactive
        form field component. Vue-Doxen tries to intelligently pick from it's own built-in form
        field components as to what would be the best component to use. If your prop requires
        a custom component to better handle this interaction in the playground, you can pass it
        in as part of the demo file. This is shown in the above examples.
      </p>

      <SubDocumentationSection id="globally" title="Globally replacing Vue-Doxen components">
        <p>
          If you want to replace the default components (checkbox, radio dials, dropdown, text input,
          etc.) that ship with Vue-Doxen with your own components globally, read the
          <RouterLink :to="{ name: 'treeShaking', hash: '#tree-shaking' }">Tree Shaking</RouterLink> page.
        </p>
      </SubDocumentationSection>
    </DocumentationSection>
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import CodeSwapper from '@/components/CodeSwapper.vue';
import DocumentationSection from '@@@/components/DocumentationSection.vue';
import SubDocumentationSection from '@@@/components/SubDocumentationSection.vue';

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
    DocumentationSection,
    SubDocumentationSection
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
