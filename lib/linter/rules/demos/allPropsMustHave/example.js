import {
  getAllPropNames,
  validateStringOrUndefined
} from '@/linter/helpers.js';

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
  description: 'Requires all props have an example (string) on all demos and/or components. (can be set to undefined)',
  url: 'https://TheJaredWilcurt.com/vue-doxen/documenting#props',
  examples: [
    {
      title: 'Add an example for the prop.',
      description: 'Your example can live in the demo object.',
      code: `
import MyComponent from '@/components/MyComponent.vue';

export const myComponentDemo = {
  component: MyComponent,
  propsToDemo: {
    foo: {
      example: ':foo="value"'
    }
  }
};
`.trim()
    },
    {
      title: 'Add a prop example to Options or Composition API component.',
      description: 'Your example can live in the component.',
      code: `
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
`.trim()
    },
    {
      title: 'Add a prop example to a Script Setup component.',
      description: 'Your example can live in the component.',
      code: `
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
`.trim()
    }
  ]
};
