/** @type {import('../../../../types').RULEDEFINITION} */
export const mustHaveDescription = {
  rule: function (demos, options, linterSettings, errors) {
    if (linterSettings.mustHaveDescription) {
      for (const demoName in demos) {
        const demo = demos[demoName];
        const hasValidDemoDescription = (
          Object.hasOwn(demo, 'description') &&
          ['undefined', 'string', 'object'].includes(typeof(demo.description))
        );
        const hasValidComponentDescription = (
          Object.hasOwn(demo, 'component') &&
          Object.hasOwn(demo.component, 'description') &&
          ['undefined', 'string', 'object'].includes(typeof(demo.component.description))
        );
        if (!hasValidDemoDescription && !hasValidComponentDescription) {
          const message = 'The ' + demoName + ' demo must have a component description.';
          console.info(message);
          errors.push(demoName);
        }
      }
    }
  },
  description: 'Requires all components have a description (string or custom component) on all demos and/or components. (can be set to undefined)',
  url: 'https://TheJaredWilcurt.com/vue-doxen/documenting#description',
  examples: [
    {
      title: 'Add description to demo.',
      description: 'Your description can live in the demo object.',
      code: `
import MyComponent from '@/components/MyComponent.vue';

export const myComponentDemo = {
  component: MyComponent,
  description: '<p>Detailed description of the component.</p>'
};
`.trim()
    },
    {
      title: 'Add description to Options or Composition API component.',
      description: 'Your description can live in the component.',
      code: `
<script>
export default {
  name: 'MyComponent',
  description: '<p>Detailed description of the component.</p>'
};
</script>
`.trim()
    },
    {
      title: 'Add description to a Script Setup component.',
      description: 'Your description can live in the component.',
      code: `
<script setup>
defineOptions({
  name: 'MyComponent',
  description: '<p>Detailed description of the component.</p>'
});
</script>
`.trim()
    }
  ]
};
