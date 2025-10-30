import {
  getAllPropNames,
  unindent,
  validateFunctionOrUndefined,
  validateKeyAgainstProp
} from '@/linter/helpers.js';

const DEMO_EXAMPLE = unindent(`
  import MyComponent from '@/components/MyComponent.vue';

  export const myComponentDemo = {
    component: MyComponent,
    propsToDemo: {
      foo: {
        validator: function (value) {
          return value.startsWith('foo');
        }
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
        validator: function (value) {
          return value.startsWith('foo');
        }
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
      validator: function (value) {
        return value.startsWith('foo');
      }
    }
  });
  </script>
`);

/** @type {import('../../../../../types').RULEDEFINITION} */
export const allPropsMustHaveValidator = {
  rule: function (demos, options, linterSettings, errors) {
    const key = 'validator';

    if (linterSettings.demos.allPropsMustHave[key]) {
      for (const demoName in demos) {
        const demo = demos[demoName];
        const allPropNames = getAllPropNames(demo);

        for (const propName of allPropNames) {
          const valid = validateKeyAgainstProp(demo, propName, key, validateFunctionOrUndefined);
          if (!valid) {
            const message = 'The ' + demoName + ' prop ' + propName + ' must have a validator function (can be set to undefined).';
            console.info(message);
            errors.push(demoName);
          }
        }
      }
    }
  },
  title: 'demos.allPropsMustHave.validator',
  description: 'Requires all props have a validator function set on all demos and/or components (can be set to <code>undefined</code>).',
  url: '/vue-doxen/documenting#props',
  examples: {
    'Demo File': DEMO_EXAMPLE,
    Options: OPTIONS_EXAMPLE,
    Composition: OPTIONS_EXAMPLE,
    'Script Setup': SCRIPT_SETUP_EXAMPLE
  }
};
