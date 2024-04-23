<template>
  <div>
    <header>
      <div class="container">
        <div class="logo-container">
          <h1 class="docs-title">Vue<br />Doxen</h1>
          <img
            src="@@@/assets/vue-doxen-logo-small.png"
            alt="A doxen dog with a green chest in the shape of the Vue logo"
          />
        </div>
        <StyleSwapper v-model="styleTokens" />
      </div>
    </header>
    <div class="container">
      <div class="sidebar">
        <RouterLink
          v-for="(linkText, linkName) in links"
          :to="{ name: linkName }"
          :key="'link' + linkName"
        >
          {{ linkText }}
        </RouterLink>

        <h2 class="docs-sub-title">Components</h2>

        <RouterLink
          v-for="(demo, demoName) in componentsToDemo"
          :to="{
            name: 'components',
            params: { component: demoName }
          }"
          :key="'demo-link-' + demoName"
        >
          {{ demoName }}
        </RouterLink>
      </div>
      <RouterView
        class="router-view"
        :styleTokens="styleTokens"
      />
    </div>
  </div>
</template>

<script>
import { styleTokensBuiltIn } from '@/library.js';

import StyleSwapper from '@@@/components/StyleSwapper.vue';

import { componentsToDemo } from '@@@/helpers/index.js';

export default {
  name: 'App',
  components: {
    StyleSwapper
  },
  constants: {
    componentsToDemo,
    links: {
      home: 'Home',
      gettingStarted: 'Getting Started',
      demoFiles: 'Demo Files',
      documenting: 'Documenting',
      styles: 'Styling'
    }
  },
  data: function () {
    return {
      styleTokens: styleTokensBuiltIn
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0px auto;
}
.sidebar {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}
.sidebar .docs-sub-title {
  margin-top: 30px;
}
.router-view {
  align-items: flex-start;
  width: 100%;
}
.logo-container {
  position: relative;
}
header {
  display: flex;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
}
h1 {
  position: relative;
  top: 6px;
  left: 10px;
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  width: auto;
  margin-right: auto;
  margin-bottom: 0px;
  z-index: 2;
}
img {
  position: absolute;
  top: -3px;
  left: 121px;
  height: 106px;
  z-index: 1;
}
</style>
