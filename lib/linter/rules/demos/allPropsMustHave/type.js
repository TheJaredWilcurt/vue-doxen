import {
  getAllPropNames,
  unindent,
  validateKeyAgainstProp,
  validateTypeOrArrayOfTypes
} from '@/linter/helpers.js';

const DEMO_EXAMPLE = unindent(`
  import MyComponent from '@/components/MyComponent.vue';

  export const myComponentDemo = {
    component: MyComponent,
    propsToDemo: {
      foo: {
        type: String
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
        type: String
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
      type: String
    }
  });
  </script>
`);

/** @type {import('../../../../../types').RULEDEFINITION} */
export const allPropsMustHaveType = {
  rule: function (demos, options, linterSettings, errors) {
    if (linterSettings.demos.allPropsMustHave.type) {
      for (const demoName in demos) {
        const demo = demos[demoName];
        const allPropNames = getAllPropNames(demo);

        for (const propName of allPropNames) {
          const valid = validateKeyAgainstProp(demo, propName, 'type', validateTypeOrArrayOfTypes);
          if (!valid) {
            const message = 'The ' + demoName + ' prop ' + propName + ' must have a type set.';
            console.info(message);
            errors.push(demoName);
          }
        }
      }
    }
  },
  title: 'demos.allPropsMustHave.type',
  description: 'Requires all props have a <code>type</code> set on all demos and/or components (can be set to an array of types).',
  url: '/vue-doxen/documenting#props',
  examples: {
    'Demo File': DEMO_EXAMPLE,
    Options: OPTIONS_EXAMPLE,
    Composition: OPTIONS_EXAMPLE,
    'Script Setup': SCRIPT_SETUP_EXAMPLE
  }
};
