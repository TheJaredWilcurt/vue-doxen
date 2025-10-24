/** @type {import('../../../../../types').RULEDEFINITION} */
export const allPropsMustHaveDescription = {
  rule: function (demos, options, linterSettings, errors) {
    const key = 'description';
    /**
     * Loops over all emit related sections of a demo and
     * adds the emit names to a de-duped array.
     *
     * @param  {import('../../types').DEMO} demo  A single demo object (or component)
     * @return {string[]}                         Array of de-duped emit names
     */
    function combineProps (demo) {
      const combinedProps = [];

      function appendPropNames (collection) {
        if (collection) {
          if (Array.isArray(collection)) {
            for (const propName of collection) {
              combinedProps.push(propName);
            }
          } else if (typeof(collection) === 'object') {
            for (const propName in collection) {
              combinedProps.push(propName);
            }
          }
        }
      }

      if (demo && typeof(demo) === 'object') {
        appendPropNames(demo.props);
        appendPropNames(demo.propsToDemo);
        if (demo.component) {
          appendPropNames(demo.component.props);
          appendPropNames(demo.component.propsToDemo);
        }
      }

      return Array.from(new Set(combinedProps));
    }

    if (linterSettings.demos.allPropsMustHave[key]) {
      for (const demoName in demos) {
        const demo = demos[demoName];
        const combinedProps = combineProps(demo);

        const validate = function (root) {
          return (
            root &&
            Object.hasOwn(root, key) &&
            ['string', 'undefined'].includes(typeof(root[key]))
          );
        };

        for (const propName of combinedProps) {
          let valid = false;
          if (
            validate(demo?.props?.[propName]) ||
            validate(demo?.propsToDemo?.[propName]) ||
            validate(demo?.component?.props?.[propName]) ||
            validate(demo?.component?.propsToDemo?.[propName])
          ) {
            valid = true;
          }
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
