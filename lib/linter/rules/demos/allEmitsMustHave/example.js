import { allEmitsMustHave } from '@/linter/helpers.js';

/** @type {import('../../../../../types').RULEDEFINITION} */
export const allEmitsMustHaveExample = {
  rule: function (demos, options, linterSettings, errors) {
    allEmitsMustHave(demos, linterSettings, errors, 'example', 'an example');
  },
  description: 'Requires all emits have an example (string) on all demos and/or components. (can be set to undefined)',
  url: 'https://TheJaredWilcurt.com/vue-doxen/documenting#emits',
  examples: [
    {
      title: 'Add example to emit.',
      description: 'Your example can live in the demo object.',
      code: `
import MyComponent from '@/components/MyComponent.vue';

export const myComponentDemo = {
  component: MyComponent,
  emitsToDemo: {
    foo: {
      example: '@foo="myMethod"'
    }
  }
};
`.trim()
    },
    {
      title: 'Add emit example to Options or Composition API component.',
      description: 'Your example can live in the component.',
      code: `
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
`.trim()
    },
    {
      title: 'Add emit example to a Script Setup component.',
      description: 'Your example can live in the component.',
      code: `
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
`.trim()
    }
  ]
};
