<template>
  <div class="docs-page">
    <h1
      id="getting-started"
      class="docs-title"
    >
      Getting Started
    </h1>

    <h2>In just 2 steps!</h2>

    <ol>
      <li>
        Install the library
        <ul>
          <li><code>npm install --save vue-doxen</code></li>
        </ul>
      </li>
      <li>
        Create a Vue component to use the library in.
        <ul>
          <li>
            To swap the component being demo'd you can use the basic sidebar that ships with VueDoxen,
            or create your own sidebar.
          </li>
        </ul>
      </li>
    </ol>
    <CodeSwapper
      :codeTypes="{
        Options: GETTING_STARTED_EXAMPLE,
        Composition: GETTING_STARTED_COMPOSITION_EXAMPLE,
        'Script Setup': GETTING_STARTED_SCRIPT_SETUP_EXAMPLE
      }"
      fileName="DocumentationPage.vue"
      :styleTokens="styleTokens"
    />

    <p>
      <strong>That's it!</strong>
      If you want to customize the <RouterLink :to="{ name: 'styles', hash: '#styles' }">styles</RouterLink>,
      use your own <RouterLink :to="{ name: 'demoFiles', hash: '#demo-files' }">custom components</RouterLink>
      in the Props Playground, or
      <RouterLink :to="{ name: 'documenting', hash: '#documenting' }">add additional information</RouterLink>
      about your component, check out the other pages in the sidebar.
    </p>
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import CodeSwapper from '@/components/CodeSwapper.vue';

import {
  GETTING_STARTED_EXAMPLE,
  GETTING_STARTED_COMPOSITION_EXAMPLE,
  GETTING_STARTED_SCRIPT_SETUP_EXAMPLE
} from '@@@/helpers/codeSnippets.js';

export default {
  name: 'GettingStartedView',
  components: {
    CodeSwapper
  },
  props: {
    styleTokens
  },
  constants: {
    GETTING_STARTED_EXAMPLE,
    GETTING_STARTED_COMPOSITION_EXAMPLE,
    GETTING_STARTED_SCRIPT_SETUP_EXAMPLE
  }
};
</script>
