import {
  endsInPeriodOrNotAString,
  unindent
} from '@/linter/helpers.js';

const DEMO_EXAMPLE = unindent(`
  import MyComponent from '@/components/MyComponent.vue';

  export const myComponentDemo = {
    component: MyComponent,
    name: 'MyComponent',
    description: 'Component description, <strong>ending with a period.</strong>'
  };
`);
const OPTIONS_EXAMPLE = unindent(`
  <script>
  export default {
    name: 'MyComponent',
    description: 'Component description, <strong>ending with a period.</strong>'
  };
  </script>
`);
const SCRIPT_SETUP_EXAMPLE = unindent(`
  <script setup>
  defineOptions({
    name: 'MyComponent',
    description: 'Component description, <strong>ending with a period.</strong>'
  });
  </script>
`);

const ruleName = 'demos.descriptionMustEndInPeriod';

/** @type {import('../../../../types').RULEDEFINITION} */
export const descriptionMustEndInPeriod = {
  rule: function (demos, options, linterSettings, errors) {
    if (linterSettings.demos.descriptionMustEndInPeriod) {
      const key = 'description';
      for (const demoName in demos) {
        const demo = demos[demoName];
        const hasValidDemoDescription = (
          Object.hasOwn(demo, key) &&
          endsInPeriodOrNotAString(demo[key])
        );
        const hasValidComponentDescription = (
          Object.hasOwn(demo, 'component') &&
          Object.hasOwn(demo.component, key) &&
          endsInPeriodOrNotAString(demo.component[key])
        );
        if (!hasValidDemoDescription && !hasValidComponentDescription) {
          const message = 'The ' + demoName + ' demo\'s description must end in a period.';
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
  description: 'Requires all <code>string</code> component descriptions end in a period. Does not apply to custom components or <code>undefined</code>.',
  url: '/vue-doxen/documenting#description',
  examples: {
    'Demo File': DEMO_EXAMPLE,
    Options: OPTIONS_EXAMPLE,
    Composition: OPTIONS_EXAMPLE,
    'Script Setup': SCRIPT_SETUP_EXAMPLE
  }
};
