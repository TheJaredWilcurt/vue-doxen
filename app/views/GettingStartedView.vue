<template>
  <div class="docs-page">
    <h1
      id="getting-started"
      class="docs-title"
    >
      Getting Started
    </h1>

    <nav>
      <ul>
        <li><a href="#npm">npm install</a></li>
        <li><a href="#cdn">CDN Usage</a></li>
      </ul>
    </nav>

    <DocumentationSection id="npm" title="npm install">
      <h2>In just 2 steps!</h2>

      <ol>
        <li>
          Install the library
          <ul>
            <li><code>npm install --save vue-doxen</code></li>
          </ul>
        </li>
        <li>
          Create a Vue component similar to the one below.
        </li>
      </ol>
      <DoxenCodeSwapper
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
      </p>
      <p>
        To see examples of how Vue-Doxen documents components, click on any of
        <RouterLink to="/vue-doxen/components/DoxenCheckbox#components">the components</RouterLink>
        in the sidebar.
        Everything you see there is auto-generated from the data in the component itself.
      </p>
      <p>
        <strong>What do you want to learn next?</strong>
      </p>
      <ul>
        <li>
          How do I
          <RouterLink :to="{ name: 'documenting', hash: '#documenting' }">add additional documentation</RouterLink>
          about my component?
        </li>
        <li>
          How do I
          <RouterLink :to="{ name: 'styles', hash: '#styles' }">customize the styles</RouterLink>?
        </li>
        <li>
          How do I use my own
          <RouterLink :to="{ name: 'demoFiles', hash: '#demo-files' }">custom components</RouterLink>
          in the Props Playground?
        </li>
        <li>
          How do I
          <RouterLink :to="{ name: 'treeShaking', hash: '#tree-shaking' }">globally replace the built-in components</RouterLink>
          with my own custom components?
        </li>
        <li>
          How do I
          <RouterLink :to="{ name: 'vueRouter', hash: '#vue-router' }">dynamically create URL's</RouterLink>
          for each component demo?
        </li>
      </ul>
    </DocumentationSection>

    <DocumentationSection id="cdn" title="CDN Usage">
      <p>
        It is also possible to load Vue-Doxen via a CDN.
        Scripts loaded via a CDN cannot access local storage in browsers though, for security reasons.
        Because of this, Vue-Doxen will not remember which tab the user selected last (Vue or JavaScript) when loaded via CDN.
      </p>

      <ul>
        <li>
          <a href="https://jsfiddle.net/fosktr2v" target="_blank">JSFiddle Example</a>
        </li>
      </ul>

      <DoxenCodeSwapper
        :codeTypes="{
          'CDN Example': GETTING_STARTED_CDN
        }"
        fileName="documentation.html"
        :styleTokens="styleTokens"
      />
    </DocumentationSection>
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import DoxenCodeSwapper from '@/components/DoxenCodeSwapper.vue';
import DocumentationSection from '@@@/components/DocumentationSection.vue';

import {
  GETTING_STARTED_CDN,
  GETTING_STARTED_COMPOSITION_EXAMPLE,
  GETTING_STARTED_EXAMPLE,
  GETTING_STARTED_SCRIPT_SETUP_EXAMPLE
} from '@@@/helpers/codeSnippets.js';

export default {
  name: 'GettingStartedView',
  components: {
    DocumentationSection,
    DoxenCodeSwapper
  },
  props: {
    styleTokens
  },
  constants: {
    GETTING_STARTED_CDN,
    GETTING_STARTED_COMPOSITION_EXAMPLE,
    GETTING_STARTED_EXAMPLE,
    GETTING_STARTED_SCRIPT_SETUP_EXAMPLE
  }
};
</script>
