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
        description: '<p>Detailed description of the emit.</p>'
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
        description: '<p>Detailed description of the component.</p>'
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
        description: '<p>Detailed description of the component.</p>'
      }
    }
  });
  </script>
`);

/** @type {import('../../../../../types').RULEDEFINITION} */
export const allEmitsMustHaveDescription = {
  rule: function (demos, options, linterSettings, errors) {
    allEmitsMustHave(demos, linterSettings, errors, 'description', 'a description');
  },
  description: 'Requires all emits have a description (string) on all demos and/or components. (can be set to undefined)',
  url: 'https://TheJaredWilcurt.com/vue-doxen/documenting#emits',
  examples: {
    'Demo File': DEMO_EXAMPLE,
    Options: OPTIONS_EXAMPLE,
    Composition: OPTIONS_EXAMPLE,
    'Script Setup': SCRIPT_SETUP_EXAMPLE
  }
};
