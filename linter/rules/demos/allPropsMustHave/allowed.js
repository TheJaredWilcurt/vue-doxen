import {
  getAllPropNames,
  unindent,
  validateArrayOfPrimitives,
  validateKeyAgainstProp
} from '../../../helpers.js';

const DEMO_EXAMPLE = unindent(`
  import MyComponent from '@/components/MyComponent.vue';

  export const myComponentDemo = {
    component: MyComponent,
    propsToDemo: {
      foo: {
        allowed: ['bar', 'baz', 'quux']
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
        allowed: ['bar', 'baz', 'quux']
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
      allowed: ['bar', 'baz', 'quux']
    }
  });
  </script>
`);

const ruleName = 'demos.allPropsMustHave.allowed';

/** @type {import('../../../../types').RULEDEFINITION} */
export const allPropsMustHaveAllowed = {
  rule: function (demos, options, linterSettings, errors) {
    const key = 'allowed';

    if (linterSettings.demos.allPropsMustHave[key]) {
      for (const demoName in demos) {
        const demo = demos[demoName];
        const allPropNames = getAllPropNames(demo);

        for (const propName of allPropNames) {
          const valid = validateKeyAgainstProp(demo, propName, key, validateArrayOfPrimitives);
          if (!valid) {
            const message = 'The ' + demoName + ' prop ' + propName + ' must have an allowed key set to undefined or an array of primitives.';
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
  description: 'Requires all props have a allowed (<code>array</code> of primitives) on all demos and/or components (can be set to <code>undefined</code>).',
  url: '/vue-doxen/documenting#props',
  examples: {
    'Demo File': DEMO_EXAMPLE,
    Options: OPTIONS_EXAMPLE,
    Composition: OPTIONS_EXAMPLE,
    'Script Setup': SCRIPT_SETUP_EXAMPLE
  }
};
