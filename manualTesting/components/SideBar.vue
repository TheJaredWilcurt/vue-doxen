<template>
  <nav aria-label="sidebar" class="sidebar">
    <RouterLink
      v-for="(linkText, linkName) in links"
      :to="{ name: linkName }"
      :key="'link' + linkName"
    >
      {{ linkText }}
    </RouterLink>

    <h2 class="docs-sub-title">Components</h2>

    <RouterLink
      v-for="(demo, demoName) in componentsToListInSidebar"
      :to="{
        name: 'components',
        params: { component: demoName }
      }"
      :key="'demo-link-' + demoName"
    >
      {{ demoName }}
    </RouterLink>
  </nav>
</template>

<script>
import { componentsToListInSidebar } from '@@@/demos/index.js';

export default {
  name: 'SideBar',
  constants: {
    componentsToListInSidebar,
    links: {
      home: 'Home',
      gettingStarted: 'Getting Started',
      documenting: 'Documenting',
      styles: 'Styling',
      demoFiles: 'Demo Files',
      vueRouter: 'Vue-Router'
    }
  }
};
</script>
