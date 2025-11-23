import { unindent } from '../../helpers.js';

const OPTIONS_EXAMPLE = unindent(`
  <script>
  export default {
    name: 'MyComponent',
    emits: ['foo']
  };
  </script>
`);
const SCRIPT_SETUP_EXAMPLE = unindent(`
  <script setup>
  defineOptions({
    name: 'MyComponent',
    emits: ['foo']
  });
  </script>
`);

function validateVuesEmitApi (emits) {
  return (
    emits === undefined ||
    (
      Array.isArray(emits) &&
      emits.every((emitName) => {
        return typeof(emitName) === 'string';
      })
    ) ||
    (
      !Array.isArray(emits) &&
      typeof(emits) === 'object' &&
      Object.keys(emits).every((emitName) => {
        const emitValue = emits[emitName];
        return (
          [null, undefined].includes(emitValue) ||
          typeof(emitValue) === 'function'
        );
      })
    )
  );
}

const ruleName = 'demos.doNotViolateVueEmitApi';

/** @type {import('../../../types').RULEDEFINITION} */
export const doNotViolateVueEmitApi = {
  rule: function (demos, options, linterSettings, errors) {
    if (linterSettings.demos.doNotViolateVueEmitApi) {
      const key = 'emits';
      for (const demoName in demos) {
        const demo = demos[demoName];
        const hasValidDemoEmit = (
          !Object.hasOwn(demo, key) ||
          validateVuesEmitApi(demo[key])
        );
        const hasValidComponentEmit = (
          !Object.hasOwn(demo, 'component') ||
          !Object.hasOwn(demo.component, key) ||
          validateVuesEmitApi(demo.component[key])
        );
        if (!hasValidDemoEmit || !hasValidComponentEmit) {
          const message = 'The ' + demoName + ' emit violates Vue\'s official API.';
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
    'Requires all components with emits defined follow Vue\'s API.',
    '<code>emits</code> must be an array of strings,',
    'or an object with key values that are <code>null</code> or functions.'
  ].join(' '),
  url: '/vue-doxen/documenting#emits',
  examples: {
    Options: OPTIONS_EXAMPLE,
    Composition: OPTIONS_EXAMPLE,
    'Script Setup': SCRIPT_SETUP_EXAMPLE
  }
};
