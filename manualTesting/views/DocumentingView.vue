<template>
  <div class="docs-page">
    <h1 class="docs-title">Documenting your components</h1>

    <nav>
      <ul>
        <li><a href="#name">Component Name</a></li>
        <li><a href="#description">Component Description</a></li>
        <li><a href="#import">Import Statements</a></li>
        <li><a href="#slots">Documenting Component Slots</a></li>
      </ul>
    </nav>

    <section>
      <h2 id="name" class="docs-title">Component Name</h2>

      <p>
        The name of the component is used at the top of a demo page, and also used for the tag and variable name in the code example below the props playground. If not provided on the demo object, we will use the name provided in the component (if available).
      </p>
      <p>
        Components written in <code>.vue</code> files, and processed by a bundler, may include the filename in the component. We will check for for this if the name is not explicitly defined in the demo object or component definition.
      </p>

      <CodeSwapper
        :codeTypes="{
          'Demo File': COMPONENT_NAME_DEMO_EXAMPLE,
          Options: COMPONENT_NAME_OPTIONS_EXAMPLE,
          Composition: COMPONENT_NAME_OPTIONS_EXAMPLE,
          'Script Setup': USE_DEMO
        }"
        :fileName="FILE_NAME"
        :styleTokens="styleTokens"
      />
    </section>

    <hr />

    <section>
      <h2 id="description" class="docs-title">Component Description</h2>

      <p>
        The component description is displayed under the component name on a demo page. If a description is not found in the demo file we will use the one in the component.
      </p>

      <p>
        For <code>&lt;script setup&gt;</code> components, you must define the description in the demo object.
      </p>

      <CodeSwapper
        :codeTypes="{
          'Demo File': COMPONENT_DESCRIPTION_DEMO_EXAMPLE,
          Options: COMPONENT_DESCRIPTION_OPTIONS_EXAMPLE,
          Composition: COMPONENT_DESCRIPTION_OPTIONS_EXAMPLE,
          'Script Setup': USE_DEMO
        }"
        :fileName="FILE_NAME"
        :styleTokens="styleTokens"
      />
    </section>

    <hr />

    <section>
      <h2 id="import" class="docs-title">Import Statements</h2>

      <p>
        If you want to add instructions for how people can import your component into their app, you can either pass in the import statement as a string, or use a custom component with your own props.
      </p>

      <h3>Import Statement &ndash; String example</h3>

      <CodeSwapper
        :codeTypes="{
          'Demo File': IMPORT_STATEMENT_STRING_DEMO_FILE_EXAMPLE,
          Options: IMPORT_STATEMENT_STRING_OPTIONS_EXAMPLE,
          Composition: IMPORT_STATEMENT_STRING_OPTIONS_EXAMPLE,
          'Script Setup': USE_DEMO
        }"
        :fileName="FILE_NAME"
        :styleTokens="styleTokens"
      />

      <h3>Import Statement &ndash; Custom component example</h3>

      <p>Though you <em>can</em> import a custom component inside the component you are going to demo and pass it through, it will impact the size of your component, so we do not recommend it.</p>

      <CodeSwapper
        :codeTypes="{
          'Demo File': IMPORT_STATEMENT_COMPONENT_DEMO_FILE_EXAMPLE
        }"
        :fileName="FILE_NAME"
        :styleTokens="styleTokens"
      />
    </section>

    <hr />

    <section>
      <h2 id="slots" class="docs-title">Documenting Component Slots</h2>

      <p>You can provide an array of slot names, or an object with slot names as keys and the default slot value to show in the demo as the value.</p>

      <h3>Documenting Slots &ndash; Array example</h3>

      <CodeSwapper
        :codeTypes="{
          'Demo File': SLOTS_DEMO_ARRAY_EXAMPLE,
          Options: SLOTS_OPTIONS_ARRAY_EXAMPLE,
          Composition: SLOTS_OPTIONS_ARRAY_EXAMPLE,
          'Script Setup': USE_DEMO
        }"
        :fileName="FILE_NAME"
        :styleTokens="styleTokens"
      />

      <h3>Documenting Slots &ndash; Object example</h3>

      <CodeSwapper
        :codeTypes="{
          'Demo File': SLOTS_DEMO_OBJECT_EXAMPLE,
          Options: SLOTS_OPTIONS_OBJECT_EXAMPLE,
          Composition: SLOTS_OPTIONS_OBJECT_EXAMPLE,
          'Script Setup': USE_DEMO
        }"
        :fileName="FILE_NAME"
        :styleTokens="styleTokens"
      />
    </section>
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import CodeSwapper from '@/components/CodeSwapper.vue';

import {
  COMPONENT_DESCRIPTION_OPTIONS_EXAMPLE,
  COMPONENT_DESCRIPTION_DEMO_EXAMPLE,
  COMPONENT_NAME_OPTIONS_EXAMPLE,
  COMPONENT_NAME_DEMO_EXAMPLE,
  IMPORT_STATEMENT_COMPONENT_DEMO_FILE_EXAMPLE,
  IMPORT_STATEMENT_STRING_DEMO_FILE_EXAMPLE,
  IMPORT_STATEMENT_STRING_OPTIONS_EXAMPLE,
  SLOTS_DEMO_ARRAY_EXAMPLE,
  SLOTS_DEMO_OBJECT_EXAMPLE,
  SLOTS_OPTIONS_ARRAY_EXAMPLE,
  SLOTS_OPTIONS_OBJECT_EXAMPLE
} from '@@@/helpers/codeSnippets.js';

export default {
  name: 'DocumentingView',
  components: {
    CodeSwapper
  },
  props: {
    styleTokens
  },
  constants: {
    COMPONENT_DESCRIPTION_OPTIONS_EXAMPLE,
    COMPONENT_DESCRIPTION_DEMO_EXAMPLE,
    COMPONENT_NAME_OPTIONS_EXAMPLE,
    COMPONENT_NAME_DEMO_EXAMPLE,
    FILE_NAME: {
      'Demo File': 'yourComponentDemo.js',
      Options: 'YourComponent.vue',
      Composition: 'YourComponent.vue',
      'Script Setup': 'YourComponent.vue'
    },
    IMPORT_STATEMENT_COMPONENT_DEMO_FILE_EXAMPLE,
    IMPORT_STATEMENT_STRING_DEMO_FILE_EXAMPLE,
    IMPORT_STATEMENT_STRING_OPTIONS_EXAMPLE,
    SLOTS_DEMO_ARRAY_EXAMPLE,
    SLOTS_DEMO_OBJECT_EXAMPLE,
    SLOTS_OPTIONS_ARRAY_EXAMPLE,
    SLOTS_OPTIONS_OBJECT_EXAMPLE,
    USE_DEMO: '// Use a demo file'
  }
};
</script>
