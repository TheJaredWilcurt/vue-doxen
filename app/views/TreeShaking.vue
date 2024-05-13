<template>
  <div class="docs-page">
    <h1
      id="tree-shaking"
      class="docs-title"
    >
      Tree Shaking
    </h1>

    <ul>
      <li><a href="#import">Import your components</a></li>
      <li><a href="#use">Use the options with VueDoxenCustom</a></li>
    </ul>

    <DocumentationSection id="import" title="Import your components">
      <p>
        First create the Vue-Doxen options object, below is an example you can start from.
        Don't remove anything from the example, unless you are replacing it with your own component.
        Every part of the options object that expects a component be passed in is required.
        Without a component the Vue-Doxen demo may break at run-time.
      </p>

      <CodeBox
        :code="TREE_SHAKING_IMPORT_EXAMPLE"
        :styleTokens="styleTokens"
      />
    </DocumentationSection>

    <DocumentationSection id="use" title="Use the options with VueDoxenCustom">
      <p>
        Pass in the options object you created from the example above into <code>VueDoxenCustom</code>.
      </p>

      <CodeSwapper
        :codeTypes="{
          Options: TREE_SHAKING_USING_OPTIONS_OPTIONS_API,
          Composition: TREE_SHAKING_USING_OPTIONS_COMPOSITION_API,
          'Script Setup': TREE_SHAKING_USING_OPTIONS_SCRIPT_SETUP
        }"
        fileName="ComponentsDemo.vue"
        :styleTokens="styleTokens"
      />
    </DocumentationSection>
  </div>
</template>

<script>
import {
  TREE_SHAKING_IMPORT_EXAMPLE,
  TREE_SHAKING_USING_OPTIONS_OPTIONS_API,
  TREE_SHAKING_USING_OPTIONS_COMPOSITION_API,
  TREE_SHAKING_USING_OPTIONS_SCRIPT_SETUP
} from '@@@/helpers/codeSnippets.js';
import { styleTokens } from '@/helpers/props.js';

import CodeBox from '@/components/CodeBox.vue';
import CodeSwapper from '@/components/CodeSwapper.vue';
import DocumentationSection from '@@@/components/DocumentationSection.vue';

export default {
  name: 'TreeShaking',
  components: {
    CodeBox,
    CodeSwapper,
    DocumentationSection
  },
  props: {
    styleTokens
  },
  constants: {
    TREE_SHAKING_IMPORT_EXAMPLE,
    TREE_SHAKING_USING_OPTIONS_OPTIONS_API,
    TREE_SHAKING_USING_OPTIONS_COMPOSITION_API,
    TREE_SHAKING_USING_OPTIONS_SCRIPT_SETUP
  }
};
</script>
