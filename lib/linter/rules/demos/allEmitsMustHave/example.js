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
        example: '@foo="myMethod"'
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
        example: '@foo="myMethod"'
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
        example: '@foo="myMethod"'
      }
    }
  });
  </script>
`);

/** @type {import('../../../../../types').RULEDEFINITION} */
export const allEmitsMustHaveExample = {
  rule: function (demos, options, linterSettings, errors) {
    allEmitsMustHave(demos, linterSettings, errors, 'example', 'an example');
  },
  title: 'demos.allEmitsMustHave.example',
  description: 'Requires all emits have an example (<code>string</code>) on all demos and/or components (can be set to <code>undefined</code>).',
  url: '/vue-doxen/documenting#emits',
  examples: {
    'Demo File': DEMO_EXAMPLE,
    Options: OPTIONS_EXAMPLE,
    Composition: OPTIONS_EXAMPLE,
    'Script Setup': SCRIPT_SETUP_EXAMPLE
  }
};
