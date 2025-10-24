import { allEmitsMustHave } from '@/linter/helpers.js';

/** @type {import('../../../../../types').RULEDEFINITION} */
export const allEmitsMustHaveDescription = {
  rule: function (demos, options, linterSettings, errors) {
    allEmitsMustHave(demos, linterSettings, errors, 'description', 'a description');
  },
  description: 'Requires all emits have a description (string) on all demos and/or components. (can be set to undefined)',
  url: 'https://TheJaredWilcurt.com/vue-doxen/documenting#emits',
  examples: [
    {
      title: 'Add description to emit.',
      description: 'Your description can live in the demo object.',
      code: `
import MyComponent from '@/components/MyComponent.vue';

export const myComponentDemo = {
  component: MyComponent,
  emitsToDemo: {
    foo: {
      description: '<p>Detailed description of the emit.</p>'
    }
  }
};
`.trim()
    },
    {
      title: 'Add emit description to Options or Composition API component.',
      description: 'Your description can live in the component.',
      code: `
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
`.trim()
    },
    {
      title: 'Add emit description to a Script Setup component.',
      description: 'Your description can live in the component.',
      code: `
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
`.trim()
    }
  ]
};
