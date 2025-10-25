import { allEmitsMustHave } from '@/linter/helpers.js';

/** @type {import('../../../../../types').RULEDEFINITION} */
export const allEmitsMustHaveValue = {
  rule: function (demos, options, linterSettings, errors) {
    allEmitsMustHave(demos, linterSettings, errors, 'value', 'a value defined');
  },
  description: 'Requires all emits have a value (string) on all demos and/or components. (can be set to undefined)',
  url: 'https://TheJaredWilcurt.com/vue-doxen/documenting#emits',
  examples: [
    {
      title: 'Add emitted value information.',
      description: 'Your value definition can live in the demo object.',
      code: `
import MyComponent from '@/components/MyComponent.vue';

export const myComponentDemo = {
  component: MyComponent,
  emitsToDemo: {
    foo: {
      value: '<p>Detailed description of what gets emitted.</p>'
    }
  }
};
`.trim()
    },
    {
      title: 'Add emitted value information to Options or Composition API component.',
      description: 'Your value definition can live in the component.',
      code: `
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
`.trim()
    },
    {
      title: 'Add emitted value information to a Script Setup component.',
      description: 'Your value definition can live in the component.',
      code: `
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
`.trim()
    }
  ]
};
