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
  const validOptions = {};
  validOptions.components = {};

  function setComponentOrFallback (componentName) {
    const component = options?.components?.[componentName];
    const componentExists = component && typeof(component) === 'object';
    if (componentExists) {
      validOptions.components[componentName] = component;
    } else {
      const WARNING = [
        'REQUIRED: options.components.' + componentName + ' is missing a custom component.',
        'One MUST be provided. No fallback will be used and errors will occur.'
      ].join(' ');
      console.info(WARNING);
      validOptions.components[componentName] = FallBack;
    }
  }

  setComponentOrFallback('checkbox');
  setComponentOrFallback('dropdown');
  setComponentOrFallback('emitLog');
  setComponentOrFallback('emitsDocumentation');
  setComponentOrFallback('header');
  setComponentOrFallback('jsonTextarea');
  setComponentOrFallback('plainText');
  setComponentOrFallback('propsDocumentation');
  setComponentOrFallback('radioDials');
  setComponentOrFallback('textField');
  setComponentOrFallback('textarea');

  return validOptions;
};
