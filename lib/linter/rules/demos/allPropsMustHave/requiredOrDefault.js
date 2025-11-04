import {
  getAllPropNames,
  keyExists,
  keyIsTrue,
  unindent,
  validateKeyAgainstProp
} from '@/linter/helpers.js';

const DEMO_EXAMPLE = unindent(`
  import MyComponent from '@/components/MyComponent.vue';

  export const myComponentDemo = {
    component: MyComponent,
    propsToDemo: {
      foo: {
        required: true,
        // or
        default: 'value'
      }
    }
  };
`);
const OPTIONS_EXAMPLE = unindent(`
  <script>
  export default {
    name: 'MyComponent',
    props: {
      foo: {
        required: true,
        // or
        default: 'value'
      }
    }
  };
  </script>
`);
const SCRIPT_SETUP_EXAMPLE = unindent(`
  <script setup>
  defineOptions({
    name: 'MyComponent'
  });
  defineProps({
    foo: {
      required: true,
      // or
      default: 'value'
    }
  });
  </script>
`);

const ruleName = 'demos.allPropsMustHave.requiredOrDefault';

/** @type {import('../../../../../types').RULEDEFINITION} */
export const allPropsMustHaveRequiredOrDefault = {
  rule: function (demos, options, linterSettings, errors) {
    if (linterSettings.demos.allPropsMustHave.requiredOrDefault) {
      for (const demoName in demos) {
        const demo = demos[demoName];
        const allPropNames = getAllPropNames(demo);

        for (const propName of allPropNames) {
          const requiredTrue = validateKeyAgainstProp(demo, propName, 'required', keyIsTrue);
          const defaultSupplied = validateKeyAgainstProp(demo, propName, 'default', keyExists);
          const valid = requiredTrue || defaultSupplied;
          if (!valid) {
            const message = 'The ' + demoName + ' prop ' + propName + ' must have either `required: true` or a `default` value set.';
            errors.push({
              ruleName,
              demoName,
              message
            });
          }
        }
      }
    }
  },
  title: ruleName,
  description: 'Requires all props have either <code>required: true</code> or a <code>default</code> value set on all demos and/or components (can be set to <code>undefined</code>).',
  url: '/vue-doxen/documenting#props',
  examples: {
    'Demo File': DEMO_EXAMPLE,
    Options: OPTIONS_EXAMPLE,
    Composition: OPTIONS_EXAMPLE,
    'Script Setup': SCRIPT_SETUP_EXAMPLE
  }
};
