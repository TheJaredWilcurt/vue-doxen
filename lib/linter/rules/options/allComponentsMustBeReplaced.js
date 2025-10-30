import { unindent } from '@/linter/helpers.js';

import defaultOptions from '@/helpers/defaultOptions.js';

const OPTIONS_EXAMPLE = unindent(`
  <template>
    <VueDoxenCustom :options="options" />
  </template>

  <script>
  import { VueDoxenCustom } from 'vue-doxen';

  import MyDeprecationBanner from '../components/MyDeprecationBanner.vue';
  import MyEmitsDocumentation from '../components/MyEmitsDocumentation.vue';
  import MyHeader from '../components/MyHeader.vue';
  import MyPropsDocumentation from '../components/MyPropsDocumentation.vue';
  import MyCheckbox from '../components/formFields/MyCheckbox.vue';
  import MyDeprecatedProp from '../components/formFields/MyDeprecatedProp.vue';
  import MyDropdown from '../components/formFields/MyDropdown.vue';
  import MyEmitLog from '../components/formFields/MyEmitLog.vue';
  import MyJsonTextarea from '../components/formFields/MyJsonTextarea.vue';
  import MyNumberField from '../components/formFields/MyNumberField.vue';
  import MyPlainText from '../components/formFields/MyPlainText.vue';
  import MyRadioDials from '../components/formFields/MyRadioDials.vue';
  import MyRangeSlider from '../components/formFields/MyRangeSlider.vue';
  import MyTextField from '../components/formFields/MyTextField.vue';
  import MyTextarea from '../components/formFields/MyTextarea.vue';

  export default {
    components: { VueDoxenCustom },
    computed: {
      options: function () {
        return {
          components: {
            checkbox: MyCheckbox,
            deprecationBanner: MyDeprecationBanner,
            deprecatedProp: MyDeprecatedProp,
            dropdown: MyDropdown,
            emitLog: MyEmitLog,
            emitsDocumentation: MyEmitsDocumentation,
            header: MyHeader,
            jsonTextarea: MyJsonTextarea,
            numberField: MyNumberField,
            plainText: MyPlainText,
            propsDocumentation: MyPropsDocumentation,
            radioDials: MyRadioDials,
            rangeSlider: MyRangeSlider,
            textField: MyTextField,
            textarea: MyTextarea
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
  import { VueDoxenCustom } from 'vue-doxen';
  import { computed } from 'vue';

  import MyDeprecationBanner from '../components/MyDeprecationBanner.vue';
  import MyEmitsDocumentation from '../components/MyEmitsDocumentation.vue';
  import MyHeader from '../components/MyHeader.vue';
  import MyPropsDocumentation from '../components/MyPropsDocumentation.vue';
  import MyCheckbox from '../components/formFields/MyCheckbox.vue';
  import MyDeprecatedProp from '../components/formFields/MyDeprecatedProp.vue';
  import MyDropdown from '../components/formFields/MyDropdown.vue';
  import MyEmitLog from '../components/formFields/MyEmitLog.vue';
  import MyJsonTextarea from '../components/formFields/MyJsonTextarea.vue';
  import MyNumberField from '../components/formFields/MyNumberField.vue';
  import MyPlainText from '../components/formFields/MyPlainText.vue';
  import MyRadioDials from '../components/formFields/MyRadioDials.vue';
  import MyRangeSlider from '../components/formFields/MyRangeSlider.vue';
  import MyTextField from '../components/formFields/MyTextField.vue';
  import MyTextarea from '../components/formFields/MyTextarea.vue';

  export default {
    components: { VueDoxenCustom },
    setup: function () {
      const options = computed(() => {
        return {
          components: {
            checkbox: MyCheckbox,
            deprecationBanner: MyDeprecationBanner,
            deprecatedProp: MyDeprecatedProp,
            dropdown: MyDropdown,
            emitLog: MyEmitLog,
            emitsDocumentation: MyEmitsDocumentation,
            header: MyHeader,
            jsonTextarea: MyJsonTextarea,
            numberField: MyNumberField,
            plainText: MyPlainText,
            propsDocumentation: MyPropsDocumentation,
            radioDials: MyRadioDials,
            rangeSlider: MyRangeSlider,
            textField: MyTextField,
            textarea: MyTextarea
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
  import { VueDoxenCustom } from 'vue-doxen';
  import { computed } from 'vue';

  import MyDeprecationBanner from '../components/MyDeprecationBanner.vue';
  import MyEmitsDocumentation from '../components/MyEmitsDocumentation.vue';
  import MyHeader from '../components/MyHeader.vue';
  import MyPropsDocumentation from '../components/MyPropsDocumentation.vue';
  import MyCheckbox from '../components/formFields/MyCheckbox.vue';
  import MyDeprecatedProp from '../components/formFields/MyDeprecatedProp.vue';
  import MyDropdown from '../components/formFields/MyDropdown.vue';
  import MyEmitLog from '../components/formFields/MyEmitLog.vue';
  import MyJsonTextarea from '../components/formFields/MyJsonTextarea.vue';
  import MyNumberField from '../components/formFields/MyNumberField.vue';
  import MyPlainText from '../components/formFields/MyPlainText.vue';
  import MyRadioDials from '../components/formFields/MyRadioDials.vue';
  import MyRangeSlider from '../components/formFields/MyRangeSlider.vue';
  import MyTextField from '../components/formFields/MyTextField.vue';
  import MyTextarea from '../components/formFields/MyTextarea.vue';

  const options = computed(() => {
    return {
      components: {
        checkbox: MyCheckbox,
        deprecationBanner: MyDeprecationBanner,
        deprecatedProp: MyDeprecatedProp,
        dropdown: MyDropdown,
        emitLog: MyEmitLog,
        emitsDocumentation: MyEmitsDocumentation,
        header: MyHeader,
        jsonTextarea: MyJsonTextarea,
        numberField: MyNumberField,
        plainText: MyPlainText,
        propsDocumentation: MyPropsDocumentation,
        radioDials: MyRadioDials,
        rangeSlider: MyRangeSlider,
        textField: MyTextField,
        textarea: MyTextarea
      }
    };
  });
  </script>
`);

/** @type {import('../../../../types').RULEDEFINITION} */
export const allComponentsMustBeReplaced = {
  rule: function (demos, options, linterSettings, errors) {
    if (linterSettings.options.allComponentsMustBeReplaced) {
      if (
        !options ||
        typeof(options) !== 'object' ||
        !options.components ||
        typeof(options.components) !== 'object'
      ) {
        const noOptionsMessage = 'Your Vue-Doxen options object is missing components.';
        console.info(noOptionsMessage);
        errors.push('Options');
      } else {
        for (const componentName in defaultOptions.components) {
          const component = defaultOptions.components[componentName];
          const replacement = options.components[componentName];
          if (
            component === replacement ||
            component?.name === replacement?.name
          ) {
            const message = 'The ' + componentName + ' component in your Vue-Doxen options object is not a custom component.';
            console.info(message);
            errors.push('Options');
          }
        }
      }
    }
  },
  title: 'options.allComponentsMustBeReplaced',
  description: 'Requires all built-in components are replaced with custom ones. This is only applicable when using <code>&lt;VueDoxenCustom&gt;</code>. Must users will not have a need for this rule to be enforced.',
  url: '/vue-doxen/tree-shaking#import',
  examples: {
    Options: OPTIONS_EXAMPLE,
    Composition: COMPOSITION_EXAMPLE,
    'Script Setup': SCRIPT_SETUP_EXAMPLE
  }
};
