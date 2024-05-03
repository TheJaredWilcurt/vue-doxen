<template>
  <div>
    <header aria-label="header">
      <div class="container">
        <VueDoxenLogo />
        <StyleSwapper v-model="styleTokens" />
      </div>
    </header>
    <div class="container">
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
      <main aria-label="main">
        <RouterView
          class="router-view"
          :styleTokens="styleTokens"
        />
      </main>
    </div>
    <footer class="docs-page" aria-label="footer">
      <a class="github" href="https://GitHub.com/TheJaredWilcurt/vue-doxen">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 33">
          <path
            fill="currentcolor"
            d="M16.499.613c-8.995 0-16.289 7.293-16.289 16.29 0 7.197 4.667 13.303 11.141 15.457.814.148 1.112-.354 1.112-.785l-.022-2.771c-4.531.984-5.487-2.184-5.487-2.184-.741-1.881-1.809-2.383-1.809-2.383-1.479-1.01.112-.99.112-.99 1.635.115 2.495 1.68 2.495 1.68 1.453 2.488 3.813 1.77 4.741 1.354.148-1.053.569-1.771 1.034-2.178-3.617-.412-7.42-1.809-7.42-8.051 0-1.778.635-3.232 1.677-4.371-.167-.412-.727-2.068.16-4.311 0 0 1.368-.438 4.479 1.67 1.299-.361 2.693-.542 4.078-.548 1.384.006 2.776.187 4.078.548 3.11-2.108 4.476-1.67 4.476-1.67.889 2.243.329 3.899.162 4.311 1.043 1.139 1.674 2.593 1.674 4.371 0 6.258-3.809 7.635-7.438 8.038.585.504 1.105 1.498 1.105 3.018 0 2.178-.02 3.934-.02 4.469 0 .436.293.941 1.12.783 6.468-2.158 11.13-8.26 11.13-15.455.001-8.999-7.292-16.292-16.289-16.292z"
          />
        </svg>
        GitHub
      </a>
    </footer>
  </div>
</template>

<script>
import { styleTokensBuiltIn } from '@/library.js';

import StyleSwapper from '@@@/components/StyleSwapper.vue';
import VueDoxenLogo from '@@@/components/VueDoxenLogo.vue';

import { componentsToListInSidebar } from '@@@/demos/index.js';

export default {
  name: 'App',
  components: {
    StyleSwapper,
    VueDoxenLogo
  },
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
header {
  display: flex;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
}
main {
  width: 100%;
}
footer {
  margin-top: 100px;
  margin-bottom: 20px;
  font-size: 20px;
  text-align: center;
}
footer svg {
  display: block;
  width: 33px;
  margin: 0px auto;
}
.github {
  display: inline-block;
}
</style>

<style>
html a {
  text-decoration: underline;
}
</style>
