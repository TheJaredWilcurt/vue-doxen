<template>
  <div
    :class="{
      'v-application': styles.startsWith('vuetify'),
      'v-theme--dark': styles === 'vuetifyDark',
      'v-theme--light': styles === 'vuetifyLight',
      'doxen-dark': ['water', 'vuetifyDark'].includes(styles)
    }"
    style="flex-direction: column;"
  >
    <header aria-label="header">
      <div class="docs-container">
        <VueDoxenLogo />
        <StyleSwapper
          v-model:tokens="styleTokens"
          v-model:styles="styles"
        />
      </div>
    </header>
    <div class="docs-container">
      <SideBar />
      <main aria-label="main">
        <RouterView
          class="router-view"
          :styleTokens="styleTokens"
        />
      </main>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { styleTokensBuiltIn } from '@/helpers/styleTokens.js';

import AppFooter from '@@@/components/AppFooter.vue';
import SideBar from '@@@/components/SideBar.vue';
import StyleSwapper from '@@@/components/StyleSwapper.vue';
import VueDoxenLogo from '@@@/components/VueDoxenLogo.vue';

export default {
  name: 'App',
  components: {
    AppFooter,
    SideBar,
    StyleSwapper,
    VueDoxenLogo
  },
  data: function () {
    return {
      styles: 'water',
      styleTokens: styleTokensBuiltIn
    };
  }
};
</script>

<style scoped>
.router-view {
  align-items: flex-start;
  width: 100%;
}
header {
  display: flex;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
}
main {
  /* Approximation of sidebar width which varies depending on font size of CSS loaded */
  width: calc(100% - 200px);
}
@media (width < 831px) {
  main {
    width: 100%;
  }
}
</style>

<style>
html a {
  text-decoration: underline;
}
</style>
