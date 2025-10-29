import {
  isComponent,
  unindent
} from '@/linter/helpers.js';

const DEMO_EXAMPLE = unindent(`
  import MyComponent from '@/components/MyComponent.vue';

  export const myComponentDemo = {
    component: MyComponent
  };
`);

/** @type {import('../../../../types').RULEDEFINITION} */
export const demosMustHaveComponent = {
  rule: function (demos, options, linterSettings, errors) {
    if (linterSettings.demos.demosMustHaveComponent) {
      for (const demoName in demos) {
        const demo = demos[demoName];
        const demoIsComponent = isComponent(demo);

        if (!demoIsComponent) {
          const demoHasComponent = (
            typeof(demo) === 'object' &&
            !Array.isArray(demo) &&
            Object.hasOwn(demo, 'component') &&
            isComponent(demo.component)
          );
          if (!demoHasComponent) {
            const message = 'The ' + demoName + ' demo must have a component.';
            console.info(message);
            errors.push(demoName);
          }
        }
      }
    }
  },
  title: 'demos.demosMustHaveComponent',
  description: 'Requires all demo objects contain a component (ignores components passed in directly).',
  url: '/vue-doxen/demo-files#demo-files',
  examples: {
    'Demo File': DEMO_EXAMPLE
  }
};
