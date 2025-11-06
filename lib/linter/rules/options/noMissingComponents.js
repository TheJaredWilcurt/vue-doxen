import {
  isComponent,
  unindent
} from '@/linter/helpers.js';

import defaultOptions from '@/helpers/defaultOptions.js';

const OPTIONS_EXAMPLE = unindent(`
  <template>
    <VueDoxenCustom :options="options" />
  </template>

  <script>
  import {
    DoxenDeprecationBanner,
    DoxenEmitsDocumentation,
    DoxenHeader,
    DoxenPropsDocumentation,
    DoxenCheckbox,
    DoxenDeprecatedProp,
    DoxenDropdown,
    DoxenEmitLog,
    DoxenJsonTextarea,
    DoxenNumberField,
    DoxenPlainText,
    DoxenRadioDials,
    DoxenRangeSlider,
    DoxenTextField,
    DoxenTextarea,
    VueDoxenCustom
  } from 'vue-doxen';

  export default {
    components: { VueDoxenCustom },
    computed: {
      options: function () {
        return {
          components: {
            checkbox: DoxenCheckbox,
            deprecationBanner: DoxenDeprecationBanner,
            deprecatedProp: DoxenDeprecatedProp,
            dropdown: DoxenDropdown,
            emitLog: DoxenEmitLog,
            emitsDocumentation: DoxenEmitsDocumentation,
            header: DoxenHeader,
            jsonTextarea: DoxenJsonTextarea,
            numberField: DoxenNumberField,
            plainText: DoxenPlainText,
            propsDocumentation: DoxenPropsDocumentation,
            radioDials: DoxenRadioDials,
            rangeSlider: DoxenRangeSlider,
            textField: DoxenTextField,
            textarea: DoxenTextarea
          }
        };
      }
    }
  };
  </script>
`);
const COMPOSITION_EXAMPLE = unindent(`
  <template>
    <VueDoxenCustom :options="options" />
  </template>

  <script>
  import {
    DoxenDeprecationBanner,
    DoxenEmitsDocumentation,
    DoxenHeader,
    DoxenPropsDocumentation,
    DoxenCheckbox,
    DoxenDeprecatedProp,
    DoxenDropdown,
    DoxenEmitLog,
    DoxenJsonTextarea,
    DoxenNumberField,
    DoxenPlainText,
    DoxenRadioDials,
    DoxenRangeSlider,
    DoxenTextField,
    DoxenTextarea,
    VueDoxenCustom
  } from 'vue-doxen';
  import { computed } from 'vue';

  export default {
    components: { VueDoxenCustom },
    setup: function () {
      const options = computed(() => {
        return {
          components: {
            checkbox: DoxenCheckbox,
            deprecationBanner: DoxenDeprecationBanner,
            deprecatedProp: DoxenDeprecatedProp,
            dropdown: DoxenDropdown,
            emitLog: DoxenEmitLog,
            emitsDocumentation: DoxenEmitsDocumentation,
            header: DoxenHeader,
            jsonTextarea: DoxenJsonTextarea,
            numberField: DoxenNumberField,
            plainText: DoxenPlainText,
            propsDocumentation: DoxenPropsDocumentation,
            radioDials: DoxenRadioDials,
            rangeSlider: DoxenRangeSlider,
            textField: DoxenTextField,
            textarea: DoxenTextarea
          }
        };
      });

      return {
        options
      };
    }
  };
  </script>
`);
const SCRIPT_SETUP_EXAMPLE = unindent(`
  <template>
    <VueDoxenCustom :options="options" />
  </template>

  <script setup>
  import {
    DoxenDeprecationBanner,
    DoxenEmitsDocumentation,
    DoxenHeader,
    DoxenPropsDocumentation,
    DoxenCheckbox,
    DoxenDeprecatedProp,
    DoxenDropdown,
    DoxenEmitLog,
    DoxenJsonTextarea,
    DoxenNumberField,
    DoxenPlainText,
    DoxenRadioDials,
    DoxenRangeSlider,
    DoxenTextField,
    DoxenTextarea,
    VueDoxenCustom
  } from 'vue-doxen';
  import { computed } from 'vue';

  const options = computed(() => {
    return {
      components: {
        checkbox: DoxenCheckbox,
        deprecationBanner: DoxenDeprecationBanner,
        deprecatedProp: DoxenDeprecatedProp,
        dropdown: DoxenDropdown,
        emitLog: DoxenEmitLog,
        emitsDocumentation: DoxenEmitsDocumentation,
        header: DoxenHeader,
        jsonTextarea: DoxenJsonTextarea,
        numberField: DoxenNumberField,
        plainText: DoxenPlainText,
        propsDocumentation: DoxenPropsDocumentation,
        radioDials: DoxenRadioDials,
        rangeSlider: DoxenRangeSlider,
        textField: DoxenTextField,
        textarea: DoxenTextarea
      }
    };
  });
  </script>
`);

const ruleName = 'options.noMissingComponents';
const demoName = 'Options';

/** @type {import('../../../../types').RULEDEFINITION} */
export const noMissingComponents = {
  rule: function (demos, options, linterSettings, errors) {
    if (linterSettings.options.noMissingComponents) {
      if (
        options &&
        typeof(options) === 'object' &&
        options.components &&
        typeof(options.components) === 'object'
      ) {
        for (const componentName in defaultOptions.components) {
          if (
            !options.components[componentName] ||
            !isComponent(options.components[componentName])
          ) {
            const message = 'You must supply a ' + componentName + ' component in your Vue-Doxen options object.';
            errors.push({
              ruleName,
              demoName,
              message
            });
          }
        }
      }
    }
  },
  title: ruleName,
  description: 'Warns about missing required components in the Vue-Doxen options object (strongly recommended if using <code>&lt;VueDoxenCustom&gt;</code>).',
  url: '/vue-doxen/tree-shaking#import',
  examples: {
    Options: OPTIONS_EXAMPLE,
    Composition: COMPOSITION_EXAMPLE,
    'Script Setup': SCRIPT_SETUP_EXAMPLE
  }
};
