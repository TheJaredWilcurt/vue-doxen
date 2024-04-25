<template>
  <div class="docs-paragraph">
    <h1 class="docs-title">Getting Started</h1>

    <p>In just 2 steps!</p>

    <ol>
      <li>
        Install the library
        <ul>
          <li><code>npm install --save vue-doxen</code></li>
        </ul>
      </li>
      <li>
        Create Vue component to use the library in. You can use the basic sidebar that ships with VueDoxen, or create your own.
        <ul>
          <li>
            <CodeBox
              :code="GETTING_STARTED_EXAMPLE"
              language="xml"
              :styleTokens="styleTokens"
            />
          </li>
        </ul>
      </li>
    </ol>

    <p>
      <strong>That's it!</strong>
      If you want to customize the <RouterLink :to="{ name: 'styles' }">styles</RouterLink>,
      use your own <RouterLink :to="{ name: 'demoFiles' }">custom components</RouterLink> in the Props Playground,
      or <RouterLink :to="{ name: 'documenting' }">add additional information</RouterLink> about your component,
      check out the other pages in the sidebar.
    </p>
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import CodeBox from '@/components/CodeBox.vue';

import { GETTING_STARTED_EXAMPLE } from '@@@/helpers/codeSnippets.js';

export default {
  name: 'GettingStartedView',
  components: {
    CodeBox
  },
  props: {
    styleTokens
  },
  constants: {
    GETTING_STARTED_EXAMPLE
  }
};
</script>
