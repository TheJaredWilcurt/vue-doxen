<template>
  <div class="docs-page">
    <h1
      id="vue-router"
      class="docs-title"
    >
      Working with Vue-Router
    </h1>

    <p>
      This page covers how to setup Vue-Doxen with Vue-Router so it loads the correct demos based on the URL.
    </p>

    <nav>
      <ul>
        <li>
          <a href="#recommended">Recommended Approach</a>
          <ul>
            <li><a href="#demos">Make a reusable demos object</a></li>
            <li><a href="#adding-route">Adding a route for Vue-Doxen</a></li>
            <li><a href="#link-to-route">Linking to the Route</a></li>
          </ul>
        </li>
        <li>
          <a href="#alternate">Alternate Approach</a>
          <ul>
            <li><a href="#alternate-demos">Demo Components</a></li>
            <li><a href="#alternative-router">Lazy load demos</a></li>
          </ul>
        </li>
      </ul>
    </nav>

    <DocumentationSection id="recommended" title="Recommended Approach">
      <p>
        In this first approach we organize the code to require the lease amount of maintenance.
        As you add more demos files, you only need to create the demo and reference it in one file.
      </p>

      <SubDocumentationSection id="demos" title="Make a reusable demos object">
        <p>
          I would recommend making a <code>demos</code> folder for your demo files with an <code>index.js</code> file in it to compose and export a <code>demos</code> object. This object can then be passed in to Vue-Doxen, but also used to dynamically create sidebar links.
        </p>

        <CodeSwapper
          :codeTypes="{
            JavaScript: COMPOSE_ALL_DEMOS_EXAMPLE
          }"
          fileName="/src/demos/index.js"
          :styleTokens="styleTokens"
        />
      </SubDocumentationSection>

      <SubDocumentationSection id="adding-route" title="Adding a route for Vue-Doxen">
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
      </SubDocumentationSection>

      <SubDocumentationSection id="link-to-route" title="Linking to the Route">
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
      </SubDocumentationSection>
    </DocumentationSection>

    <DocumentationSection id="alternate" title="Alternate approach">
      <p>
        In this approch could we optimize for lazy loading demos per-route.
      </p>

      <SubDocumentationSection id="alternate-demos" title="Demo Components">
        <p>
          Instead of creating <code>.js</code> demo files and then one main <code>src/demos/index.js</code>
          file to manage producing a reusable <code>demos</code> object, we create one <code>.vue</code>
          file per demo.
        </p>

        <CodeSwapper
          :codeTypes="{
            Options: ALTERNATE_OPTIONS_DEMO_EXAMPLE,
            Composition: ALTERNATE_COMPOSITION_DEMO_EXAMPLE,
            'Script Setup': ALTERNATE_SCRIPT_SETUP_DEMO_EXAMPLE
          }"
          fileName="/src/demos/MyComponentDemo.vue"
          :styleTokens="styleTokens"
        />

        <p>
          Although the <code>VueDoxen</code> component is designed to handle many demos, we can also just pass in
          one, like the above example.
        </p>
      </SubDocumentationSection>

      <SubDocumentationSection id="alternative-router" title="Lazy load demos">
        <p>
          Now that each demo file is a component, they can be code split via their routes.
        </p>

        <CodeSwapper
          :codeTypes="{
            JavaScript: ALTERNATE_VUE_ROUTER_EXAMPLE
          }"
          fileName="/src/router/index.js"
          :styleTokens="styleTokens"
        />

        <p>
          When a bundler, like Vite, sees <code>() => import('file/path')</code> in your routes it knows that
          the code required for that route should be bundled in a way that it can load just the code needed
          for that route, and not to load it until you try to access that URL. This lazy loading/code-splitting
          approach may be needed in some projects.
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
  ALTERNATE_COMPOSITION_DEMO_EXAMPLE,
  ALTERNATE_OPTIONS_DEMO_EXAMPLE,
  ALTERNATE_SCRIPT_SETUP_DEMO_EXAMPLE,
  ALTERNATE_VUE_ROUTER_EXAMPLE,
  COMPOSE_ALL_DEMOS_EXAMPLE,
  ROUTER_LINK_COMPOSITION_EXAMPLE,
  ROUTER_LINK_OPTIONS_EXAMPLE,
  ROUTER_LINK_SCRIPT_SETUP_EXAMPLE,
  VUE_ROUTER_EXAMPLE
} from '@@@/helpers/codeSnippets.js';

export default {
  name: 'VueRouterView',
  components: {
    CodeSwapper,
    DocumentationSection,
    SubDocumentationSection
  },
  props: {
    styleTokens
  },
  constants: {
    ALTERNATE_COMPOSITION_DEMO_EXAMPLE,
    ALTERNATE_OPTIONS_DEMO_EXAMPLE,
    ALTERNATE_SCRIPT_SETUP_DEMO_EXAMPLE,
    ALTERNATE_VUE_ROUTER_EXAMPLE,
    COMPOSE_ALL_DEMOS_EXAMPLE,
    ROUTER_LINK_COMPOSITION_EXAMPLE,
    ROUTER_LINK_OPTIONS_EXAMPLE,
    ROUTER_LINK_SCRIPT_SETUP_EXAMPLE,
    VUE_ROUTER_EXAMPLE
  }
};
</script>
