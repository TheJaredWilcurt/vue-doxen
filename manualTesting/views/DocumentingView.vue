<template>
  <div class="docs-paragraph">
    <h1 class="docs-title">Documenting your components</h1>

    <nav>
      <ul>
        <li><a href="#slots">Documenting Component Slots</a></li>
      </ul>
    </nav>


    <h2 id="">Import Statements</h2>

    <p>
      If you want to add instructions for how people can import your component into your app, you can either pass in the import statement as a string, or use a custom component with your own props.
    </p>

    <ol></ol>

    <h2 id="slots">Documenting Component Slots</h2>

    <p>There are <strong>4 approaches</strong> you can pick from:</p>

    <ol>
      <DocumentationApproach
        :code="SLOTS_OPTIONS_ARRAY_EXAMPLE"
        language="xml"
        :styleTokens="styleTokens"
      >
        Using the <strong>Options API</strong>, you can list the names of the props as an array of strings:
      </DocumentationApproach>
      <DocumentationApproach
        :code="SLOTS_OPTIONS_OBJECT_EXAMPLE"
        language="xml"
        :styleTokens="styleTokens"
      >
        Using the <strong>Options API</strong>, you can pass in an object with the slot names as keys, and the value as the default text to demo:
      </DocumentationApproach>
      <DocumentationApproach
        :code="SLOTS_DEMO_ARRAY_EXAMPLE"
        :styleTokens="styleTokens"
      >
        In the component's <strong>demo object</strong>, you can define an array of strings for the names of the slots to demo:
      </DocumentationApproach>
      <DocumentationApproach
        :code="SLOTS_DEMO_OBJECT_EXAMPLE"
        :styleTokens="styleTokens"
      >
        In the component's <strong>demo object</strong>, pass in an object with the slot names as keys, and the value as the default text to demo:
      </DocumentationApproach>
    </ol>
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import CodeBox from '@/components/CodeBox.vue';
import DocumentationApproach from '@@@/components/DocumentationApproach.vue';

import {
  SLOTS_DEMO_ARRAY_EXAMPLE,
  SLOTS_DEMO_OBJECT_EXAMPLE,
  SLOTS_OPTIONS_ARRAY_EXAMPLE,
  SLOTS_OPTIONS_OBJECT_EXAMPLE
} from '@@@/helpers/codeSnippets.js';

export default {
  name: 'DocumentingView',
  components: {
    CodeBox,
    DocumentationApproach
  },
  props: {
    styleTokens
  },
  constants: {
    SLOTS_DEMO_ARRAY_EXAMPLE,
    SLOTS_DEMO_OBJECT_EXAMPLE,
    SLOTS_OPTIONS_ARRAY_EXAMPLE,
    SLOTS_OPTIONS_OBJECT_EXAMPLE
  }
};
</script>
