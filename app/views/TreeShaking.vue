<template>
  <div class="docs-page">
    <h1
      id="tree-shaking"
      class="docs-title"
    >
      Tree Shaking
    </h1>

    <p>
      Vue-Doxen ships with many components that it uses as part of the demo process. Though you
      can pass in your own components in demo files to use, Vue-Doxen's components will still
      be included in your final bundle when using the <code>&lt;VueDoxen /&gt;</code> component.
    </p>

    <p>
      If you want to globally replace Vue-Doxen's built-in components with your own custom ones,
      you can! Any built-in components not explicitly imported will be "tree shaken" out of your
      final build. <strong>This ONLY happens</strong> when you use the
      <code>&lt;VueDoxenCustom /&gt;</code> component.
    </p>

    <ul>
      <li><a href="#import">Import your components</a></li>
      <li><a href="#use">Use the options with VueDoxenCustom</a></li>
    </ul>

    <DocumentationSection id="import" title="Import your components">
      <p>
        First create the Vue-Doxen options object, below is an example you can start from.
        You can replace any of the imported components with your own components, as long as
        they accept a similar API. All parts of the options object that expect a component,
        are required. At run time, Vue-Doxen will try to use these components during a demo.
        If it looks for one and it isn't provided, a <strong>big ugly black and yellow warning</strong>
        will be displayed in place of the missing component. There will also be console logs
        with additional information to help you correct the issue.
      </p>

      <DoxenCodeBox
        :code="TREE_SHAKING_IMPORT_EXAMPLE"
        :styleTokens="styleTokens"
      />
    </DocumentationSection>

    <DocumentationSection id="use" title="Use the options with VueDoxenCustom">
      <p>
        Pass in the options object you created from the example above into
        <code>&lt;VueDoxenCustom /&gt;</code>. Other than the required
        <code>options</code> prop, this can be used exactly like the
        <code>&lt;VueDoxen /&gt;</code> component.
      </p>

      <DoxenCodeSwapper
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
import { styleTokens } from '@/helpers/props.js';

import DocumentationSection from '@@@/components/DocumentationSection.vue';
import DoxenCodeBox from '@/components/DoxenCodeBox.vue';
import DoxenCodeSwapper from '@/components/DoxenCodeSwapper.vue';

import {
  TREE_SHAKING_IMPORT_EXAMPLE,
  TREE_SHAKING_USING_OPTIONS_OPTIONS_API,
  TREE_SHAKING_USING_OPTIONS_COMPOSITION_API,
  TREE_SHAKING_USING_OPTIONS_SCRIPT_SETUP
} from '@@@/helpers/codeSnippets.js';

export default {
  name: 'TreeShaking',
  components: {
    DocumentationSection,
    DoxenCodeBox,
    DoxenCodeSwapper
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
