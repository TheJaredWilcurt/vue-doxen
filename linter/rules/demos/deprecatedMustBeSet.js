import {
  undefinedOrIsComponentOrStringWithLength,
  unindent
} from '../../helpers.js';

const DEMO_EXAMPLE = unindent(`
  import MyComponent from '@/components/MyComponent.vue';

  export const myComponentDemo = {
    component: MyComponent,
    deprecationNotice: 'This component is deprecated.'
  };
`);
const OPTIONS_EXAMPLE = unindent(`
  <script>
  export default {
    name: 'MyComponent',
    deprecationNotice: 'This component is deprecated.'
  };
  </script>
`);
const SCRIPT_SETUP_EXAMPLE = unindent(`
  <script setup>
  defineOptions({
    name: 'MyComponent',
    deprecationNotice: 'This component is deprecated.'
  });
  </script>
`);

const ruleName = 'demos.deprecatedMustBeSet';

/** @type {import('../../../types').RULEDEFINITION} */
export const deprecatedMustBeSet = {
  rule: function (demos, options, linterSettings, errors) {
    if (linterSettings.demos.deprecatedMustBeSet) {
      for (const demoName in demos) {
        const demo = demos[demoName];
        const key = 'deprecationNotice';
        const hasValidDemoNotice = (
          Object.hasOwn(demo, key) &&
          undefinedOrIsComponentOrStringWithLength(demo[key])
        );
        const hasValidComponentNotice = (
          Object.hasOwn(demo, 'component') &&
          Object.hasOwn(demo.component, [key]) &&
          undefinedOrIsComponentOrStringWithLength(demo.component[key])
        );
        if (!hasValidDemoNotice && !hasValidComponentNotice) {
          const message = 'The ' + demoName + ' demo must have a deprecation notice (can be undefined).';
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
  description: [
    'Requires all components have a <code>deprecationNotice</code>',
    '(<code>string</code> or custom component)',
    'on all demos and/or components',
    '(can be set to <code>undefined</code>).'
  ].join(' '),
  url: '/vue-doxen/documenting#deprecation-notice',
  examples: {
    'Demo File': DEMO_EXAMPLE,
    Options: OPTIONS_EXAMPLE,
    Composition: OPTIONS_EXAMPLE,
    'Script Setup': SCRIPT_SETUP_EXAMPLE
  }
};
