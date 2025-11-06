import {
  undefinedOrIsComponentOrStringWithLength,
  unindent
} from '@/linter/helpers.js';

const DEMO_EXAMPLE = unindent(`
  import MyComponent from '@/components/MyComponent.vue';

  export const myComponentDemo = {
    component: MyComponent,
    description: '<p>Detailed description of the component.</p>'
  };
`);
const OPTIONS_EXAMPLE = unindent(`
  <script>
  export default {
    name: 'MyComponent',
    description: '<p>Detailed description of the component.</p>'
  };
  </script>
`);
const SCRIPT_SETUP_EXAMPLE = unindent(`
  <script setup>
  defineOptions({
    name: 'MyComponent',
    description: '<p>Detailed description of the component.</p>'
  });
  </script>
`);

const ruleName = 'demos.mustHaveDescription';

/** @type {import('../../../../types').RULEDEFINITION} */
export const mustHaveDescription = {
  rule: function (demos, options, linterSettings, errors) {
    if (linterSettings.demos.mustHaveDescription) {
      const key = 'description';
      for (const demoName in demos) {
        const demo = demos[demoName];
        const hasValidDemoDescription = (
          Object.hasOwn(demo, key) &&
          undefinedOrIsComponentOrStringWithLength(demo[key])
        );
        const hasValidComponentDescription = (
          Object.hasOwn(demo, 'component') &&
          Object.hasOwn(demo.component, key) &&
          undefinedOrIsComponentOrStringWithLength(demo.component[key])
        );
        if (!hasValidDemoDescription && !hasValidComponentDescription) {
          const message = 'The ' + demoName + ' demo must have a component description.';
          errors.push({
            ruleName,
            demoName,
            message
          });
        }
      }
    }
  },
  title: ruleName,
  description: 'Requires all components have a description (<code>string</code> or custom component) on all demos and/or components (can be set to <code>undefined</code>).',
  url: '/vue-doxen/documenting#description',
  examples: {
    'Demo File': DEMO_EXAMPLE,
    Options: OPTIONS_EXAMPLE,
    Composition: OPTIONS_EXAMPLE,
    'Script Setup': SCRIPT_SETUP_EXAMPLE
  }
};
