import {
  getAllPropNames,
  unindent,
  validateStringOrUndefined
} from '@/linter/helpers.js';

const DEMO_EXAMPLE = unindent(`
  import MyComponent from '@/components/MyComponent.vue';

  export const myComponentDemo = {
    component: MyComponent,
    propsToDemo: {
      foo: {
        example: ':foo="value"'
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
        example: ':foo="value"'
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
      example: ':foo="value"'
    }
  });
  </script>
`);

/** @type {import('../../../../../types').RULEDEFINITION} */
export const allPropsMustHaveExample = {
  rule: function (demos, options, linterSettings, errors) {
    const key = 'example';

    if (linterSettings.demos.allPropsMustHave[key]) {
      for (const demoName in demos) {
        const demo = demos[demoName];
        const allPropNames = getAllPropNames(demo);

        for (const propName of allPropNames) {
          const valid = (
            validateStringOrUndefined(demo?.props?.[propName], key) ||
            validateStringOrUndefined(demo?.propsToDemo?.[propName], key) ||
            validateStringOrUndefined(demo?.component?.props?.[propName], key) ||
            validateStringOrUndefined(demo?.component?.propsToDemo?.[propName], key)
          );
          if (!valid) {
            const message = 'The ' + demoName + ' prop ' + propName + ' must have an example.';
            console.info(message);
            errors.push(demoName);
          }
        }
      }
    }
  },
  title: 'demos.allPropsMustHave.example',
  description: 'Requires all props have an example (<code>string</code>) on all demos and/or components (can be set to <code>undefined</code>).',
  url: '/vue-doxen/documenting#props',
  examples: {
    'Demo File': DEMO_EXAMPLE,
    Options: OPTIONS_EXAMPLE,
    Composition: OPTIONS_EXAMPLE,
    'Script Setup': SCRIPT_SETUP_EXAMPLE
  }
};
