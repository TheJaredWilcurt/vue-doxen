<template>
  <nav aria-label="sidebar" class="docs-sidebar">
    <RouterLink
      v-for="(linkText, linkName) in links"
      :to="{ name: linkName, hash: hash(linkName) }"
      :key="'link' + linkName"
    >
      {{ linkText }}
    </RouterLink>

    <h2 class="docs-sub-title">Components</h2>

    <RouterLink
      v-for="(demo, demoName) in componentsToListInSidebar"
      :to="{
        name: 'components',
        hash: '#components',
        params: { component: demoName }
      }"
      :key="'demo-link-' + demoName"
    >
      {{ demoName }}
    </RouterLink>
  </nav>
</template>

<script>
import _kebabCase from 'lodash.kebabcase';

import { componentsToListInSidebar } from '@@@/demos/index.js';

export default {
  name: 'SideBar',
  constants: {
    componentsToListInSidebar
  },
  methods: {
    hash: function (string) {
      if (string !== string.toLowerCase()) {
        return '#' + _kebabCase(string);
      }
      return '#' + string;
    }
  },
  computed: {
    links: function () {
      const links = {
        home: 'Home',
        gettingStarted: 'Getting Started',
        documenting: 'Documenting',
        styles: 'Styling',
        demoFiles: 'Demo Files',
        vueRouter: 'Vue-Router',
        treeShaking: 'Tree Shaking',
        linter: 'Linting',
        branding: 'Press Kit/Branding',
        a11y: 'Accessibility'
      };
      if (window.location.href.includes('localhost')) {
        links.devTestingPage = 'Dev Testing Page';
      }
      return links;
    }
  }
};
</script>
