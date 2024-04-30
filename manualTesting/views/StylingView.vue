<template>
  <div class="docs-page">
    <h1 class="docs-title">Styling Vue-Doxen</h1>

    <nav>
      <ul>
        <li><a href="#why-tokens">Why use style tokens?</a></li>
        <li><a href="#what-tokens">What are style tokens?</a></li>
        <li><a href="#using-tokens">Using style tokens</a></li>
        <li><a href="#built-in-tokens">Built in token maps</a></li>
        <li><a href="#syntax">Code Syntax Highlighting</a></li>
      </ul>
    </nav>


    <h2 id="why-tokens">Why use style tokens?</h2>

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


    <h2 id="what-tokens">What are style tokens?</h2>

    <p>Every single HTML element in a Vue-Doxen component has the following HTML attributes:
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


    <h2 id="using-tokens">Using style tokens</h2>

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
      Classes will be dynamically applied based on component state. For example, if the `:disabled="true"` prop is passed in to a form field component it will have a <code>formFieldLegend</code> token and also a <code>formFieldLegendDisabled</code>.
    </p>


    <h2 id="built-in-tokens">Using the built in token maps</h2>

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

    <p>The <code>styleTokensBuiltIn</code> is a special map. Each token has a name-spaced class name with no styling applied to it. So you can use these class names to add your styles in a predictable manner. The pattern they follow is, convert the token to <code>kebab-case</code>, lowercase it, and prefix with <code>doxen-</code>. So the token <code>formFieldRadioDial</code> would have a <code>doxen-form-field-radio-dial</code> class associated to it when using this token map. You can then target that class and set it to have whatever CSS you want.</p>


    <h2 id="syntax">Code Syntax Highlighting</h2>

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
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import CodeBox from '@/components/CodeBox.vue';
import CodeSwapper from '@/components/CodeSwapper.vue';
import DoxenCheckbox from '@/components/formFields/DoxenCheckbox.vue';
import DoxenDropdown from '@/components/formFields/DoxenDropdown.vue';

import { codeThemesOptions } from '@@@/helpers/codeThemes.js';

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
const exampleComponentProps = {
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
