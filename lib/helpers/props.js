import {
  humanList,
  wrappedHumanList
} from '@/helpers/componentHelpers.js';

export const createDisabledProp = function (name) {
  return {
    type: Boolean,
    default: false,
    description: 'Prevents interacting with the ' + name + ' and visually indicates the field is disabled.'
  };
};
export const createErrorMessageProp = function (name) {
  return {
    type: String,
    default: undefined,
    description: 'Error message that appears below the ' + name + '.'
  };
};
export const createMessageProp = function (name) {
  return {
    type: String,
    default: undefined,
    description: 'Additional helpful information below the ' + name + '.'
  };
};
export const createModelValueProp = function (type) {
  return {
    type,
    default: undefined,
    description: 'You shouldn\'t actually use this prop directly, instead use v-model to recieve two way data-binding with this form field.'
  };
};
export const createOptionsProp = function (COMPONENT_NAME) {
  const allowedOptionValueTypes = ['string', 'number', 'boolean'];
  const isRadio = COMPONENT_NAME.toLowerCase().includes('radio');

  let description = [
    'Array of objects. Each object represents',
    isRadio ? 'a radio button' : 'an item in the dropdown',
    'and contains a',
    '<code>name</code> (string)',
    'and a',
    '<code>value</code> (' + humanList(allowedOptionValueTypes) + ').'
  ].join(' ');

  return {
    type: Array,
    required: false,
    default: function () {
      return [];
    },
    description,
    example: [
      '[',
      '  {',
      '    name: \'Kiva.org\',',
      '    value: \'kiva\'',
      '  },',
      '  {',
      '    name: \'Good.store\',',
      '    value: \'goodstore\'',
      '  }',
      ']'
    ].join('\n'),
    validator: function (options) {
      let valid = true;
      if (Array.isArray(options)) {
        options.forEach(function (option) {
          if (
            typeof(option) !== 'object' ||
            Array.isArray(option) ||
            !option.name ||
            (
              !allowedOptionValueTypes.includes(typeof(option.value)) &&
              option.value !== null
            )
          ) {
            console.warn('The ' + COMPONENT_NAME + ' options prop must be an array of objects with a name and a value that is a type of ' + wrappedHumanList(allowedOptionValueTypes));
            console.warn('Example:\n<' + COMPONENT_NAME + ' :options="[{ name: \'Foo\', value: 2 }]" />');
            valid = false;
          }
        });
      } else {
        valid = false;
      }
      return valid;
    }
  };
};
export const demos = {
  type: Object,
  default: function () {
    return {};
  },
  description: 'The group of components and/or demo objects representing each component to demo.'
};
export const label = {
  type: String,
  default: undefined,
  description: 'A legend placed above the form field.'
};
export const required = {
  type: Boolean,
  default: false,
  description: 'Indicates a field is required and prevents form submission.'
};
export const styleTokens = {
  type: Object,
  default: function () {
    return {};
  },
  description: 'An object of style token keys paired with class name values to be used for custom styling. The value can be a space-separated list of class names.'
};