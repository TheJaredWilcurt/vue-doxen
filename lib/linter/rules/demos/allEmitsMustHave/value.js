import {
  allEmitsMustHave,
  unindent
} from '@/linter/helpers.js';

const DEMO_EXAMPLE = unindent(`
  import MyComponent from '@/components/MyComponent.vue';

  export const myComponentDemo = {
    component: MyComponent,
    emitsToDemo: {
      foo: {
        value: '<p>Detailed description of what gets emitted.</p>'
      }
    }
  };
`);
const OPTIONS_EXAMPLE = unindent(`
  <script>
  export default {
    name: 'MyComponent',
    emitsToDemo: {
      foo: {
        value: '<p>Detailed description of what gets emitted.</p>'
      }
    }
  };
  </script>
`);
const SCRIPT_SETUP_EXAMPLE = unindent(`
  <script setup>
  defineOptions({
    name: 'MyComponent',
    emitsToDemo: {
      foo: {
        value: '<p>Detailed description of what gets emitted.</p>'
      }
    }
  });
  </script>
`);

/** @type {import('../../../../../types').RULEDEFINITION} */
export const allEmitsMustHaveValue = {
  rule: function (demos, options, linterSettings, errors) {
    allEmitsMustHave(demos, linterSettings, errors, 'value', 'a value defined');
  },
  description: 'Requires all emits have a value (string) on all demos and/or components. (can be set to undefined)',
  url: 'https://TheJaredWilcurt.com/vue-doxen/documenting#emits',
  examples: {
    'Demo File': DEMO_EXAMPLE,
    Options: OPTIONS_EXAMPLE,
    Composition: OPTIONS_EXAMPLE,
    'Script Setup': SCRIPT_SETUP_EXAMPLE
  }
};
