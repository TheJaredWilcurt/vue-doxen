import {
  getAllPropNamesOrEmitNames,
  validateStringOrUndefined
} from '@/linter/helpers.js';

/** @type {import('../../../../../types').RULEDEFINITION} */
export const allPropsMustHaveDescription = {
  rule: function (demos, options, linterSettings, errors) {
    const key = 'description';

    if (linterSettings.demos.allPropsMustHave[key]) {
      for (const demoName in demos) {
        const demo = demos[demoName];
        const allPropNames = getAllPropNamesOrEmitNames([
          demo?.props,
          demo?.propsToDemo,
          demo?.component?.props,
          demo?.component?.propsToDemo
        ]);

        for (const propName of allPropNames) {
          const valid = (
            validateStringOrUndefined(demo?.props?.[propName], key) ||
            validateStringOrUndefined(demo?.propsToDemo?.[propName], key) ||
            validateStringOrUndefined(demo?.component?.props?.[propName], key) ||
            validateStringOrUndefined(demo?.component?.propsToDemo?.[propName], key)
          );
          if (!valid) {
            const message = 'The ' + demoName + ' prop ' + propName + ' must have a description.';
            console.info(message);
            errors.push(demoName);
          }
        }
      }
    }
  },
  description: 'Requires all props have a description (string) on all demos and/or components. (can be set to undefined)',
  url: 'https://TheJaredWilcurt.com/vue-doxen/documenting#props',
  examples: [
    {
      title: 'Add description for the prop.',
      description: 'Your description can live in the demo object.',
      code: `
import MyComponent from '@/components/MyComponent.vue';

export const myComponentDemo = {
  component: MyComponent,
  propsToDemo: {
    foo: {
      description: '<p>Detailed description of the prop.</p>'
    }
  }
};
`.trim()
    },
    {
      title: 'Add prop description to Options or Composition API component.',
      description: 'Your description can live in the component.',
      code: `
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
`.trim()
    },
    {
      title: 'Add prop description to a Script Setup component.',
      description: 'Your description can live in the component.',
      code: `
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
`.trim()
    }
  ]
};
