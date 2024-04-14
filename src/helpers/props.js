import { USE_VMODEL_WARNING } from '@/helpers/componentHelpers.js';

export const createDisabledProp = function (type) {
  return {
    type: Boolean,
    default: false,
    description: 'Prevents interacting with the ' + type + ' and visually indicates the field is disabled.'
  };
};
export const createErrorMessageProp = function (type) {
  return {
    type: String,
    default: undefined,
    description: 'Error message that appears below the ' + type + '.'
  };
};
export const createMessageProp = function (type) {
  return {
    type: String,
    default: undefined,
    description: 'Additional helpful information below the ' + type + '.'
  };
};
export const demos = {
  type: Object,
  default: function () {
    return {};
  },
  description: 'The group of demo objects representing each component to demo.'
};
export const label = {
  type: String,
  default: undefined,
  description: 'A legend placed above the form field.'
};
export const modelValue = {
  type: String,
  default: undefined,
  description: USE_VMODEL_WARNING
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
