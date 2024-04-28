<template>
  <div class="docs-page">
    <h1 class="docs-title">Styling Vue-Doxen</h1>

    <nav>
      <ul>
        <li><a href="#syntax">Code Syntax Highlighting</a></li>
      </ul>
    </nav>

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
        label="Code Themes"
        :options="codeThemesOptions"
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
import DoxenDropdown from '@/components/formFields/DoxenDropdown.vue';

import { codeThemesOptions } from '@@@/helpers/codeThemes.js';

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
    DoxenDropdown
  },
  props: {
    styleTokens
  },
  constants: {
    codeThemesOptions,
    JAVASCRIPT_EXAMPLE,
    VUE_EXAMPLE
  },
  data: function () {
    return {
      selectedTheme: ''
    };
  },
  computed: {
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
