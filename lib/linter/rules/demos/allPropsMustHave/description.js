import {
  getAllPropNames,
  unindent,
  validateKeyAgainstProp,
  validateStringOrUndefined
} from '@/linter/helpers.js';

const DEMO_EXAMPLE = unindent(`
  import MyComponent from '@/components/MyComponent.vue';

  export const myComponentDemo = {
    component: MyComponent,
    propsToDemo: {
      foo: {
        description: '<p>Detailed description of the prop.</p>'
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
        description: '<p>Detailed description of the prop.</p>'
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
      description: '<p>Detailed description of the prop.</p>'
    }
  });
  </script>
`);

/** @type {import('../../../../../types').RULEDEFINITION} */
export const allPropsMustHaveDescription = {
  rule: function (demos, options, linterSettings, errors) {
    const key = 'description';

    if (linterSettings.demos.allPropsMustHave[key]) {
      for (const demoName in demos) {
        const demo = demos[demoName];
        const allPropNames = getAllPropNames(demo);

        for (const propName of allPropNames) {
          const valid = validateKeyAgainstProp(demo, propName, key, validateStringOrUndefined);
          if (!valid) {
            const message = 'The ' + demoName + ' prop ' + propName + ' must have a description.';
            console.info(message);
            errors.push(demoName);
          }
        }
      }
    }
  },
  title: 'demos.allPropsMustHave.description',
  description: 'Requires all props have a description (<code>string</code>) on all demos and/or components (can be set to <code>undefined</code>).',
  url: '/vue-doxen/documenting#props',
  examples: {
    'Demo File': DEMO_EXAMPLE,
    Options: OPTIONS_EXAMPLE,
    Composition: OPTIONS_EXAMPLE,
    'Script Setup': SCRIPT_SETUP_EXAMPLE
  }
};
