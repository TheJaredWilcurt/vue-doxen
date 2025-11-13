import {
  undefinedOrIsComponentOrStringWithLength,
  unindent
} from '../../helpers.js';

const DEMO_EXAMPLE = unindent(`
  import MyComponent from '@/components/MyComponent.vue';

  export const myComponentDemo = {
    component: MyComponent,
    importStatement: 'import { MyComponent } from \\'my-component-library\\';'
  };
`);
const OPTIONS_EXAMPLE = unindent(`
  <script>
  export default {
    name: 'MyComponent',
    importStatement: 'import { MyComponent } from \\'my-component-library\\';'
  };
  </script>
`);
const SCRIPT_SETUP_EXAMPLE = unindent(`
  <script setup>
  defineOptions({
    name: 'MyComponent',
    importStatement: 'import { MyComponent } from \\'my-component-library\\';'
  });
  </script>
`);

const ruleName = 'demos.mustHaveImportStatement';

/** @type {import('../../../types').RULEDEFINITION} */
export const mustHaveImportStatement = {
  rule: function (demos, options, linterSettings, errors) {
    if (linterSettings.demos.mustHaveImportStatement) {
      const key = 'importStatement';
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
          const message = 'The ' + demoName + ' demo must have an import statement.';
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
  description: 'Requires all components have an import statement (<code>string</code> or custom component) on all demos and/or components (can be set to <code>undefined</code>).',
  url: '/vue-doxen/documenting#description',
  examples: {
    'Demo File': DEMO_EXAMPLE,
    Options: OPTIONS_EXAMPLE,
    Composition: OPTIONS_EXAMPLE,
    'Script Setup': SCRIPT_SETUP_EXAMPLE
  }
};
