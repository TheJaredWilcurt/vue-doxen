/**
 * @file This file is kept separate from default options so VueDoxenCustom can import just
 * this function and not also get all the default component imports, only FallBack.vue.
 */

import FallBack from '@/components/FallBack.vue';

/**
 * Validates that all required components are passed in to VueDoxenCustom. If anything is
 * missing, it console logs to inform the developer of issues to address.
 *
 * @param  {object} options  User provided options object containing custom components
 * @return {object}          A new object composed of what was passed in if valid
 */
export const validateOptions = function (options) {
  function customOrFallback (name, component) {
    const componentExists = (
      component &&
      typeof(component) === 'object'
    );
    if (componentExists) {
      return component;
    }
    const WARNING = [
      'REQUIRED: ' + name + ' is missing a custom component.',
      'One MUST be provided. No fallback will be used and errors will occur.'
    ].join(' ');
    console.info(WARNING);
    return FallBack;
  }

  const validOptions = {};
  validOptions.components = {};
  validOptions.components.textarea = customOrFallback(
    'options.components.textarea',
    options?.components?.textarea
  );
  return validOptions;
};
