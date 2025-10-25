import {
  getAllPropNames,
  unindent,
  validateBoolean
} from '@/linter/helpers.js';

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

/** @type {import('../../../../../types').RULEDEFINITION} */
export const allPropsMustHaveDeprecated = {
  rule: function (demos, options, linterSettings, errors) {
    const key = 'deprecated';

    if (linterSettings.demos.allPropsMustHave[key]) {
      for (const demoName in demos) {
        const demo = demos[demoName];
        const allPropNames = getAllPropNames(demo);

        for (const propName of allPropNames) {
          const valid = (
            validateBoolean(demo?.props?.[propName], key) ||
            validateBoolean(demo?.propsToDemo?.[propName], key) ||
            validateBoolean(demo?.component?.props?.[propName], key) ||
            validateBoolean(demo?.component?.propsToDemo?.[propName], key)
          );
          if (!valid) {
            const message = 'The ' + demoName + ' prop ' + propName + ' must have deprecated set to true or false.';
            console.info(message);
            errors.push(demoName);
          }
        }
      }
    }
  },
  description: 'Requires all props have a deprecation status (boolean) set on all demos and/or components. (can be set to undefined)',
  url: 'https://TheJaredWilcurt.com/vue-doxen/documenting#props',
  examples: {
    'Demo File': DEMO_EXAMPLE,
    Options: OPTIONS_EXAMPLE,
    Composition: OPTIONS_EXAMPLE,
    'Script Setup': SCRIPT_SETUP_EXAMPLE
  }
};
