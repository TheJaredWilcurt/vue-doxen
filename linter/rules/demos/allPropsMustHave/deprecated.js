import {
  getAllPropNames,
  unindent,
  validateBoolean,
  validateKeyAgainstProp
} from '../../../helpers.js';

const DEMO_EXAMPLE = unindent(`
  import MyComponent from '@/components/MyComponent.vue';

  export const myComponentDemo = {
    component: MyComponent,
    propsToDemo: {
      foo: {
        deprecated: false
      }
    }
  };
`);
const OPTIONS_EXAMPLE = unindent(`
  <script>
  export default {
    name: 'MyComponent',
    props: {
      foo: {
        deprecated: false
      }
    }
  };
  </script>
`);
const SCRIPT_SETUP_EXAMPLE = unindent(`
  <script setup>
  defineOptions({
    name: 'MyComponent'
  });
  defineProps({
    foo: {
      deprecated: false
    }
  });
  </script>
`);

const ruleName = 'demos.allPropsMustHave.deprecated';

/** @type {import('../../../../types').RULEDEFINITION} */
export const allPropsMustHaveDeprecated = {
  rule: function (demos, options, linterSettings, errors) {
    const key = 'deprecated';

    if (linterSettings.demos.allPropsMustHave[key]) {
      for (const demoName in demos) {
        const demo = demos[demoName];
        const allPropNames = getAllPropNames(demo);

        for (const propName of allPropNames) {
          const valid = validateKeyAgainstProp(demo, propName, key, validateBoolean);
          if (!valid) {
            const message = 'The ' + demoName + ' prop ' + propName + ' must have deprecated set to true or false.';
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
  description: 'Requires all props have a deprecation status (<code>boolean</code>) set on all demos and/or components. Must be set to <code>true</code> or <code>false</code>.',
  url: '/vue-doxen/documenting#props',
  examples: {
    'Demo File': DEMO_EXAMPLE,
    Options: OPTIONS_EXAMPLE,
    Composition: OPTIONS_EXAMPLE,
    'Script Setup': SCRIPT_SETUP_EXAMPLE
  }
};
