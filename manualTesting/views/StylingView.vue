<template>
  <div class="docs-page">
    <h1 class="docs-title">Styling Vue-Doxen</h1>

    <nav>
      <ul>
        <li><a href="#intent">Intent</a></li>
        <li><a href="#supplied-css">Using the supplied CSS file</a></li>
        <li><a href="#why-tokens">Why use style tokens?</a></li>
        <li><a href="#what-tokens">What are style tokens?</a></li>
        <li><a href="#using-tokens">Using style tokens</a></li>
        <li><a href="#built-in-tokens">Built in token maps</a></li>
        <li><a href="#syntax">Code Syntax Highlighting</a></li>
        <li><a href="#contributing">Contributing tokens</a></li>
      </ul>
    </nav>


    <hr />


    <h2 id="intent" class="docs-title">Intent</h2>

    <p>
      It is our intent to allow full customization of the styles on your docs site, and to not <strong>require</strong> any styling be included.
      Below we cover many different approaches of how to style Vue-Doxen.
    </p>

    <ul>
      <li>
        Some may be creating their own <strong>Design System</strong> and don't want any 3rd party CSS to affect the pixels on the screen.
        <em>A fairly reasonable request</em> in my opinion. One which is flatly ignored by <em>other</em> component documentation tools.
      </li>
      <li>
        Some may want some basic styling provided by the library to help with <strong>layout and affordance</strong>. So we provide a stylesheet for this.
      </li>
      <li>
        Some may want each HTML element to have a class they can target and style themselves. So we provide a built in token map for this.
      </li>
      <li>
        Some may want the ability to apply their own classes to any HTML element, so we allow passing in your own token map.
      </li>
      <li>
        Some may want to use a popular library, like Bootstrap, and to use a pre-made token map provided by others in the community.
        Which we also allow, however will need help from contributors to flesh out support for more libraries.
      </li>
    </ul>


    <hr />


    <h2 id="supplied-css" class="docs-title">Using the supplied CSS file</h2>

    <p>
      Vue-Doxen ships with a <em>very tiny</em> (&lt;1KB gzipped) CSS file that applies <em>very simple</em> styling to the page using the lowest specificity possible (<code>:where([data-style-token-name]){}</code>), so your styles should always win out if targeting the same thing. The styling is just gentle nudges to make Vue-Doxen look a little better in most scenarios. You can toggle it on this website by clicking the <strong>"Doxen Stylesheet: Include"</strong> checkbox at the top of the page. This file is <strong>COMPLETELY OPTIONAL</strong>, if your app looks better without these nudges, don't apply them. You can always customize the styling of anything in Vue-Doxen using Style Tokens.
    </p>

    <CodeSwapper
      :codeTypes="{
        JavaScript: SUPPLIED_CSS_EXAMPLE,
        HTML: SUPPLIED_CSS_CDN_EXAMPLE
      }"
      :fileName="{
        JavaScript: 'main.js',
        HTML: 'index.html'
      }"
      :styleTokens="styleTokens"
    />


    <hr />


    <h2 id="why-tokens" class="docs-title">Why use style tokens?</h2>

    <h3>Style tokens solve the following scenarios:</h3>

    <ul>
      <li>Provide optional basic built in CSS</li>
      <li>Allow overriding basic built-in classes</li>
      <li>The CSS is externalized and can be skipped if not needed</li>
      <li>You can remove all classes from all elements if not needed</li>
      <li>Allows customizing the class names to whatever you want</li>
      <li>Allows having many classes applied on a single element (<strong>Tailwind</strong>)</li>
      <li>Can use existing CSS class names (<strong>Bootstrap</strong>)</li>
      <li>Can use existing CSS component classes (<strong>Vuetify</strong>)</li>
    </ul>

    <p>
      Though style tokens are not the best solution to many of these problems taken individually, they are the best solution that handles <strong>ALL</strong> of these scenarios.
    </p>


    <hr />


    <h2 id="what-tokens" class="docs-title">What are style tokens?</h2>

    <p>
      Every single HTML element in a Vue-Doxen component has the following HTML attributes:
    </p>

    <ul>
      <li>
        <code>data-style-tokens=""</code>
        <ul>
          <li>This lists every token that can be applied to the element.</li>
        </ul>
      </li>
      <li>
        <code>data-applied-style-tokens=""</code>
        <ul>
          <li>This lists the currently applied tokens. For example, in a series of tabs, a tab button may have a token applied only when it is active/selected.</li>
        </ul>
      </li>
    </ul>

    <p>
      All Vue-Doxen components accept a <code>styleTokens</code> prop of an object to add class names to elements when the associated token is applied.
    </p>


    <hr />


    <h2 id="using-tokens" class="docs-title">Using style tokens</h2>

    <p>To apply your own classes to an HTML element in Vue-Doxen:</p>

    <ol>
      <li>Right-Click &gt; Inspect Element</li>
      <li>Copy the list of <code>data-style-tokens</code> on the element</li>
      <li>Put the tokens in an object as keys, with the values for each being the classes you want to apply.</li>
    </ol>

    <p><strong>Example:</strong></p>

    <CodeBox
      :code="STYLE_TOKEN_USAGE_EXAMPLE"
      :styleTokens="styleTokens"
    />

    <p>
      Notice how a token can have as many classes applied to it as you want. So if you want to use atomic CSS classes (like in Tailwind), you can!
    </p>

    <p>
      Classes will be dynamically applied based on component state. For example, if the <code>:disabled="true"</code> prop is passed in to a form field component it will have a <code>formFieldLegend</code> token and also a <code>formFieldLegendDisabled</code>. To see a list of all class names used by this built in token map, <a href="https://github.com/TheJaredWilcurt/vue-doxen/blob/main/src/helpers/styleTokens.js#L21" target="_blank">consult the source code</a>.
    </p>

    <p>
      Since components only check for the existence of the tokens they care about, you can actually store all tokens in one large object and pass that same object into any Vue-Doxen provided component.
    </p>


    <hr />


    <h2 id="built-in-tokens" class="docs-title">Using the built in token maps</h2>

    <p>
      Instead of passing your own classes in as tokens, you can use one of the pre-made token maps that ships with Vue-Doxen. At the top of this page there is a dropdown to switch between them so you can preview them on this website.
    </p>

    <h3>Usage:</h3>

    <p>Import the pre-made tokens you want to use (and any components):</p>

    <CodeBox
      :code="BUILT_IN_TOKEN_IMPORT_EXAMPLE"
      :styleTokens="styleTokens"
    />

    <p>Then pass them in to the component:</p>

    <CodeBox
      :code="BUILT_IN_TOKEN_USAGE_EXAMPLE"
      :styleTokens="styleTokens"
    />

    <p>
      The <code>styleTokensBuiltIn</code> is a special map. Each token has a name-spaced class name with no styling applied to it. So you can use these class names to add your styles in a predictable manner. The pattern they follow is, convert the token to <code>kebab-case</code>, lowercase it, and prefix with <code>doxen-</code>. So the token <code>formFieldRadioDial</code> would have a <code>doxen-form-field-radio-dial</code> class associated to it when using this token map. You can then target that class and set it to have whatever CSS you want.
    </p>


    <hr />


    <h2 id="syntax" class="docs-title">Code Syntax Highlighting</h2>

    <p>
      Component demos include Vue and JavaScript code examples (see below) that are updated as you interact with the Props Playground.
      We use <strong>HighlightJS</strong> to apply syntax highlighting classes to the code, but do not style these classes.
    </p>

    <p>
      You can style these classes yourself, or select from this list of pre-made themes,
      then copy the <code>&lt;link&gt;</code> code to use in your project.
    </p>

    <div class="doxen-form-field-dropdown">
      <DoxenDropdown
        v-model="selectedTheme"
        :label="codeThemesLabel"
        :options="codeThemesOptions"
        :styleTokens="styleTokens"
      />
      <DoxenDropdown
        v-model="lightDarkThemes"
        label="Light/Dark"
        :options="lightDarkOptions"
        :styleTokens="styleTokens"
      />
      <DoxenCheckbox
        v-model="onlyA11yThemes"
        label="WCGA 2 AA"
        name="Passes"
        :styleTokens="styleTokens"
      />
    </div>

    <link
      v-if="selectedTheme"
      :href="'https://unpkg.com/highlightjs@9.16.2/styles/' + selectedTheme + '.css'"
      rel="stylesheet"
      type="text/css"
    />

    <CodeBox
      :code="linkThemeCode"
      :styleTokens="styleTokens"
    />

    <CodeSwapper
      :codeTypes="{
        Vue: VUE_EXAMPLE,
        JavaScript: JAVASCRIPT_EXAMPLE
      }"
      fileName="ExampleComponent.vue"
      :styleTokens="styleTokens"
    />


    <hr />


    <h2 id="contributing" class="docs-title">Contributing Style Tokens</h2>

    <p>
      As you can see at the top of this page, we have two dropdowns, one for loading different CSS libraries, and one for loading different Style Tokens. The tokens demo'd in the dropdown ship with the Vue-Doxen as a time saver for those using those CSS libraries. If you're going to use Vue-Doxen with a popular CSS or Component library not already supported, you can submit your Style Tokens map in a <a href="https://GitHub.com/TheJaredWilcurt/vue-doxen/issues" target="_blank">GitHub issue</a>, or <a href="https://GitHub.com/TheJaredWilcurt/vue-doxen" target="_blank">PR</a>, this allows others to save time when using Vue-Doxen with that library.
    </p>

    <ul>
      <li>Style token objects live in <code>/src/helpers/styleTokens.js</code></li>
      <li>They are exported out from <code>/src/library.js</code></li>
      <li>They are demo'd in <code>/manualTesting/components/StyleSwapper.vue</code></li>
    </ul>
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import CodeBox from '@/components/CodeBox.vue';
import CodeSwapper from '@/components/CodeSwapper.vue';
import DoxenCheckbox from '@/components/formFields/DoxenCheckbox.vue';
import DoxenDropdown from '@/components/formFields/DoxenDropdown.vue';

import { codeThemesOptions } from '@@@/helpers/codeThemes.js';

const SUPPLIED_CSS_EXAMPLE = `
// If using a bundler like Vite or Webpack
import 'vue-doxen/dist/vue-doxen.css';
`.trim();
const SUPPLIED_CSS_CDN_EXAMPLE = `
<!-- Or import via CDN in your index.html -->
<link
  href="https://unpkg.com/vue-doxen/dist/vue-doxen.css"
  rel="stylesheet"
  type="text/css"
/>
`.trim();
const STYLE_TOKEN_USAGE_EXAMPLE = `
<DoxenRadioDials
  :styleTokens="{
    formFieldRadioDialContainer: 'form-radio',
    formFieldRadioDial: 'form-radio-input',
    formFieldRadioDialNameLabel: 'form-radio-label form-label'
  }"
/>
`.trim();
const BUILT_IN_TOKEN_IMPORT_EXAMPLE = `
import {
  styleTokensBootstrap5,
  styleTokensBuiltIn,
  styleTokensEmpty,
  VueDoxen
} from 'vue-doxen';
`.trim();
const BUILT_IN_TOKEN_USAGE_EXAMPLE = `
<VueDoxen
  v-model="selectedDemo"
  :demos="demos"
  :styleTokens="styleTokensBootstrap5"
/>
`.trim();
const VUE_EXAMPLE = `
<ExampleComponent
  v-model="myValue"
  :amount="5"
  label="Label"
  :required="true"
  :styleTokens="{}"
  @click="submit"
>
  <template #footer>
    <strong>Slot Contents</strong>
  </footer>
</ExampleComponent>
`.trim();
const JAVASCRIPT_EXAMPLE = `
/* Example Comment */
const exampleComponentProps = {
  amount: 5,
  label: 'Label',
  modelValue: myValue,
  required: true,
  styleTokens: {},
};
const exampleComponentProps = {
  click: submit
};
const exampleComponentSlots = {
  footer: '<strong>Slot Contents</strong>'
};
`.trim();

export default {
  name: 'StylingView',
  components: {
    CodeBox,
    CodeSwapper,
    DoxenCheckbox,
    DoxenDropdown
  },
  props: {
    styleTokens
  },
  constants: {
    BUILT_IN_TOKEN_IMPORT_EXAMPLE,
    BUILT_IN_TOKEN_USAGE_EXAMPLE,
    JAVASCRIPT_EXAMPLE,
    STYLE_TOKEN_USAGE_EXAMPLE,
    SUPPLIED_CSS_EXAMPLE,
    SUPPLIED_CSS_CDN_EXAMPLE,
    VUE_EXAMPLE
  },
  data: function () {
    return {
      onlyA11yThemes: false,
      lightDarkThemes: 'both',
      selectedTheme: 'ir-black'
    };
  },
  computed: {
    codeThemesLabel: function () {
      return [
        'Code Themes (',
        this.codeThemesOptions.length,
        '/',
        codeThemesOptions.length,
        ')'
      ].join('');
    },
    lightDarkOptions: function () {
      const options = [
        'Both',
        'Light',
        'Dark'
      ];
      return options.map((name) => {
        return {
          name,
          value: name.toLowerCase()
        };
      });
    },
    codeThemesOptions: function () {
      return codeThemesOptions
        .filter((theme) => {
          if (this.onlyA11yThemes) {
            return theme.a11y;
          }
          return true;
        })
        .filter((theme) => {
          if (this.lightDarkThemes === 'light') {
            return theme.name.endsWith('(Light)');
          } else if (this.lightDarkThemes === 'dark') {
            return theme.name.endsWith('(Dark)');
          }
          return true;
        });
    },
    linkThemeCode: function () {
      if (!this.selectedTheme) {
        return '';
      }
      return [
        '<link',
        '  href="https://unpkg.com/highlightjs@9.16.2/styles/' + this.selectedTheme + '.css"',
        '  rel="stylesheet"',
        '  type="text/css"',
        '/>'
      ].join('\n');
    }
  }
};
</script>

<style scoped>
.doxen-form-field-dropdown {
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif;
}
</style>
