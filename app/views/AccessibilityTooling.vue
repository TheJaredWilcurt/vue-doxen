<template>
  <div class="docs-page">
    <h1 class="docs-title">Accessibility Tooling</h1>

    <p>
      Rather than build a custom plugin for Vue-Doxen, we belive the best options for accessibility
      tooling is to use what already exists in the
      <a
        v-text="'Vue ecosystem'"
        href="https://github.com/vuejs/awesome-vue?tab=readme-ov-file#a11y"
        target="_blank"
      ></a>.
    </p>

    <p>
      Here are two tools I recommend:
    </p>

    <nav>
      <ul>
        <li><a href="#eslint">Vue.js Accessibility ESLint Plugin</a></li>
        <li>
          <a href="#axe">Vue-Axe</a>
          <ul>
            <li><a href="#install-vue-axe">Installing Vue-Axe</a></li>
          </ul>
        </li>
      </ul>
    </nav>

    <DocumentationSection id="eslint" title="Vue.js Accessibility ESLint Plugin">
      <p>
        This is a great ESLint plugin for Vue projects to detect common accessibility issues in your
        source code and help to enforce best practices.
      </p>

      <ol>
        <li><code>npm install --save-dev eslint@8 eslint-plugin-vuejs-accessibility</code></li>
        <li>
          Create an <code>.eslintrc.js</code> file in the root of your project
          <CodeBox
            :code="ESLINT_EXAMPLE"
            :styleTokens="styleTokens"
          />
        </li>
        <li>
          In the <code>scripts</code> section of your <code>package.json</code>,
          add a <code>lint</code> script.
          <CodeBox
            :code="LINT_SCRIPT_EXAMPLE"
            :styleTokens="styleTokens"
          />
          The "<code>src vite.config.js</code>" part can be changed to any files or
          folders you want to lint in your project.
        </li>
        <li>
          <a
            v-text="'Additional Documentation'"
            href="https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility"
          ></a>
        </li>
      </ol>
    </DocumentationSection>

    <DocumentationSection id="axe" title="Vue-Axe">
      <p>
        Axe is a commonly used open source rule set for automated accessibility validation.
        It use generally ran against the actual rendered DOM of a page and can catch things
        that a linter cannot, like color contrast issues.
      </p>

      <p>
        Vue-Axe is actually running in the bottom right corner of this page. It's hooked into my
        Vue app's main render function. This means any time Vue updates the DOM, it automatically
        re-runs to look for issues. Click the button below to trigger a DOM update with intentional
        accessibility issues to see Vue-Axe in action.
      </p>

      <DoxenButton
        :selected="showBadDom"
        :styleTokens="styleTokens"
        @click="showBadDom = !showBadDom"
      >
        {{ showBadDom ? 'Hide' : 'Show' }} example that fails accessibility
      </DoxenButton>

      <template v-if="showBadDom">
        <hr />

        <div class="bad-dom">
          <!-- eslint-disable -->
          <input :value="'input needs label'" />
          <img
            src="@@@/assets/vue-doxen-logo-small.png"
            @click="bark"
          />
          <img
            v-show="barking"
            src="@@@/assets/bork-face.png"
          />

          <h4 style="background: #5D7DA2; color: #435A75;">Low contrast</h4>
          <!-- eslint-enable -->
        </div>

        <p>
          The above example also results in the following linting errors when using the linter plugin:
        </p>

        <ul>
          <li>
            <code>vuejs-accessibility/alt-text</code>
            <ul>
              <li>
                <code>img</code> elements must have an <code>alt</code> prop, either with meaningful text, or an empty string for decorative images
              </li>
            </ul>
          </li>
          <li>
            <code>vuejs-accessibility/click-events-have-key-events</code>
            <ul>
              <li>
                Visible, non-interactive elements with click handlers must have at least one keyboard listener
              </li>
            </ul>
          </li>
          <li>
            <code>vuejs-accessibility/no-static-element-interactions</code>
            <ul>
              <li>
                Visible, non-interactive elements should not have an interactive handler
              </li>
            </ul>
          </li>
        </ul>

        <CodeSwapper
          :codeTypes="{
            'Fails Linter': BAD_IMAGE,
            'Passes Linter': GOOD_IMAGE
          }"
          fileName="ExampleComponent.vue"
          :styleTokens="styleTokens"
        />
      </template>

      <hr />

      <h3 id="install-vue-axe">Installing Vue-Axe</h3>

      <ol>
        <li>
          <code>npm install --save-dev axe-core@4 vue-axe@3</code>
          <ul>
            <li>
              <strong>The version numbers are important.</strong> By default it will install the
              Vue 2 version of <code>vue-axe</code> if you don't include <code>@3</code>. If you think
              the Vue 3 version should be the default, go thumbs up this
              <a href="https://github.com/vue-a11y/vue-axe/issues/62" target="_blank">GitHub issue</a>.
            </li>
          </ul>
        </li>
        <li>
          In your app's <code>main.js</code> file:
          <CodeBox
            :code="VUE_AXE_MAIN_JS"
            :styleTokens="styleTokens"
          />
        </li>
        <li>
          In your <code>vite.config.js</code>:
          <CodeBox
            :code="VUE_AXE_VITE_CONFIG"
            :styleTokens="styleTokens"
          />
        </li>
        <li>
          <a
            v-text="'Additional Documentation'"
            href="https://github.com/vue-a11y/vue-axe/tree/next"
            target="_blank"
          ></a>
        </li>
      </ol>
    </DocumentationSection>
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import CodeBox from '@/components/CodeBox.vue';
import CodeSwapper from '@/components/CodeSwapper.vue';
import DoxenButton from '@/components/DoxenButton.vue';
import DocumentationSection from '@@@/components/DocumentationSection.vue';

const ESLINT_EXAMPLE = `
module.exports = {
  root: true,
  plugins: [
    'vuejs-accessibility'
  ],
  extends: [
    'plugin:vuejs-accessibility/recommended'
  ],
  rules: {
    'vuejs-accessibility/label-has-for': [
      'error',
      {
        components: ['Label'],
        required: {
          some: ['nesting', 'id']
        },
        allowChildren: false
      }
    ]
  }
};
`.trim();
const LINT_SCRIPT_EXAMPLE = `
{
  "scripts": {
    "lint": "eslint --ext .js,.vue --config=.eslintrc.js src vite.config.js"
  }
}
`.trim();
const BAD_IMAGE = `
<template>
  <img
    src="@/assets/vue-doxen-dog.png"
    @click="bark"
  />
</template>
`.trim();
const GOOD_IMAGE = `
<template>
  <img
    alt="A doxen dog with a green chest in the shape of the Vue logo"
    src="@/assets/vue-doxen-dog.png"
    role="button"
    tabindex="0"
    @click="bark"
    @keyup.enter="bark"
    @keydown.space.prevent="bark"
  />
</template>
`.trim();
const VUE_AXE_MAIN_JS = `
// Import Vue and VueAxe
import {
  createApp,
  Fragment,
  h as hyperscript
} from 'vue';
import VueAxe, { VueAxePopup } from 'vue-axe';

// Import your top-most Vue file
import App from './App.vue';

let app;

// If we are running locally
if (process.env.NODE_ENV === 'development') {
  // Inject VueAxe into your app
  app = createApp({
    render: function () {
      return hyperscript(
        Fragment,
        [
          hyperscript(App),
          hyperscript(VueAxePopup)
        ]
      );
    }
  });
  app.use(VueAxe);
} else {
  // Otherwise if we are building for production,
  // skip VueAxe to have a smaller build.
  app = createApp(App);
}

// Mount your Vue app to the page
app.mount('#app');
`.trim();
const VUE_AXE_VITE_CONFIG = `
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    // Ensures this doesn't get shipped to prod
    include: ['axe-core']
  }
});
`.trim();

export default {
  name: 'AccessibilityOptions',
  components: {
    CodeBox,
    CodeSwapper,
    DocumentationSection,
    DoxenButton
  },
  props: {
    styleTokens
  },
  constants: {
    BAD_IMAGE,
    ESLINT_EXAMPLE,
    GOOD_IMAGE,
    LINT_SCRIPT_EXAMPLE,
    VUE_AXE_MAIN_JS,
    VUE_AXE_VITE_CONFIG
  },
  data: function () {
    return {
      barking: false,
      showBadDom: false
    };
  },
  methods: {
    bark: async function () {
      const bark = new Audio('/vue-doxen/bark.mp3');
      await bark.play();
      setTimeout(() => { this.barking = true; }, 100);
      setTimeout(() => { this.barking = false; }, 250);
      setTimeout(() => { this.barking = true; }, 600);
      setTimeout(() => { this.barking = false; }, 800);
    }
  }
};
</script>

<style scoped>
.bad-dom {
  position: relative;
  border: 4px dashed #700;
  padding: 10px 100px 10px 10px;
}
img {
  position: absolute;
  top: 10px;
  right: 10px;
  max-width: fit-content;
  height: 106px;
  z-index: 1;
}
</style>
