<template>
  <div class="docs-page">
    <h1 class="docs-title">Working with Vue-Router</h1>

    <p>
      This page covers how to setup Vue-Doxen with Vue-Router so it loads the correct demos based on the URL.
    </p>

    <nav>
      <ul>
        <li><a href="#demos">Make a reusable demos object</a></li>
        <li><a href="#adding-route">Adding a route for Vue-Doxen</a></li>
        <li><a href="#link-to-route">Linking to the Route</a></li>
      </ul>
    </nav>

    <section>
      <h2 id="demos" class="docs-title">Make a reusable demos object</h2>

      <p>I would recommend making a <code>demos</code> folder for your demo files with an <code>index.js</code> file in it to compose and export a <code>demos</code> object. This object can then be passed in to Vue-Doxen, but also used to dynamically create sidebar links.</p>

      <CodeSwapper
        :codeTypes="{
          JavaScript: COMPOSE_ALL_DEMOS_EXAMPLE
        }"
        fileName="/src/demos/index.js"
        :styleTokens="styleTokens"
      />
    </section>

    <section>
      <h2 id="adding-route" class="docs-title">Adding a route for Vue-Doxen</h2>

      <p>
        Here is an example of a router file for Vue-Router. It creates a route pointed at the main Vue-Doxen component and uses the URL to know which component to demo.
      </p>

      <CodeSwapper
        :codeTypes="{
          JavaScript: VUE_ROUTER_EXAMPLE
        }"
        fileName="/src/router/index.js"
        :styleTokens="styleTokens"
      />
    </section>

    <hr />

    <section>
      <h2 id="link-to-route" class="docs-title">Linking to the Route</h2>

      <p>
        Here is an example of the main <code>App.vue</code> file for a Vue project.
        We reuse the <code>demos</code> object to generate Vue-Router links.
        This approach means any time you want to demo a new component, you only need to update the <code>demos</code> object in the <code>/src/demos/index.js</code> file.
        Then the sidebar, routes, and Vue-Doxen will all be based on the same source of truth and not need modified.
      </p>

      <CodeSwapper
        :codeTypes="{
          Options: ROUTER_LINK_OPTIONS_EXAMPLE,
          Composition: ROUTER_LINK_COMPOSITION_EXAMPLE,
          'Script Setup': ROUTER_LINK_SCRIPT_SETUP_EXAMPLE
        }"
        fileName="/src/App.vue"
        :styleTokens="styleTokens"
      />
    </section>
  </div>
</template>

<script>
import CodeSwapper from '@/components/CodeSwapper.vue';

import { styleTokens } from '@/helpers/props.js';

import {
  COMPOSE_ALL_DEMOS_EXAMPLE,
  ROUTER_LINK_COMPOSITION_EXAMPLE,
  ROUTER_LINK_OPTIONS_EXAMPLE,
  ROUTER_LINK_SCRIPT_SETUP_EXAMPLE,
  VUE_ROUTER_EXAMPLE
} from '@@@/helpers/codeSnippets.js';

export default {
  name: 'VueRouterView',
  components: {
    CodeSwapper
  },
  props: {
    styleTokens
  },
  constants: {
    COMPOSE_ALL_DEMOS_EXAMPLE,
    ROUTER_LINK_COMPOSITION_EXAMPLE,
    ROUTER_LINK_OPTIONS_EXAMPLE,
    ROUTER_LINK_SCRIPT_SETUP_EXAMPLE,
    VUE_ROUTER_EXAMPLE
  }
};
</script>
