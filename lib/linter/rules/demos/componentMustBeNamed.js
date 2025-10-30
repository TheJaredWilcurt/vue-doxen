import { unindent } from '@/linter/helpers.js';

const DEMO_EXAMPLE = unindent(`
  import MyComponent from '@/components/MyComponent.vue';

  export const myComponentDemo = {
    component: MyComponent,
    name: 'MyComponent'
  };
`);
const OPTIONS_EXAMPLE = unindent(`
  <script>
  export default {
    name: 'MyComponent'
  };
  </script>
`);
const SCRIPT_SETUP_EXAMPLE = unindent(`
  <script setup>
  defineOptions({
    name: 'MyComponent'
  });
  </script>
`);

/** @type {import('../../../../types').RULEDEFINITION} */
export const componentMustBeNamed = {
  rule: function (demos, options, linterSettings, errors) {
    if (linterSettings.demos.componentMustBeNamed) {
      const key = 'name';
      for (const demoName in demos) {
        const demo = demos[demoName];
        const hasValidDemoName = (
          Object.hasOwn(demo, key) &&
          typeof(demo[key]) === 'string'
        );
        const hasValidComponentName = (
          Object.hasOwn(demo, 'component') &&
          Object.hasOwn(demo.component, key) &&
          typeof(demo.component[key]) === 'string'
        );
        if (!hasValidDemoName && !hasValidComponentName) {
          const message = 'The ' + demoName + ' demo must have a component name.';
          console.info(message);
          errors.push(demoName);
        }
      }
    }
  },
  title: 'demos.componentMustBeNamed',
  description: 'Requires all components have a name (<code>string</code>).',
  url: '/vue-doxen/documenting#description',
  examples: {
    'Demo File': DEMO_EXAMPLE,
    Options: OPTIONS_EXAMPLE,
    Composition: OPTIONS_EXAMPLE,
    'Script Setup': SCRIPT_SETUP_EXAMPLE
  }
};
