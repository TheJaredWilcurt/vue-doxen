import { USE_VMODEL_WARNING } from '@/helpers/componentHelpers.js';

export const demos = {
  type: Object,
  default: function () {
    return {};
  },
  description: 'The group of demo objects representing each component to demo.'
};

export const modelValue = {
  type: String,
  default: undefined,
  description: USE_VMODEL_WARNING
};

export const styleTokens = {
  type: Object,
  default: function () {
    return {};
  },
  description: 'An object of style token keys paired with class name values to be used for custom styling. The value can be a space-separated list of class names.'
};
