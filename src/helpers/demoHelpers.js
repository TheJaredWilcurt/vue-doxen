/* eslint-disable import/no-unused-modules */

import _startCase from 'lodash.startcase';

import { humanList } from '@/helpers/componentHelpers.js';

import DoxenCheckbox from '@/components/formFields/DoxenCheckbox.vue';
import DoxenJsonTextarea from '@/components/formFields/DoxenJsonTextarea.vue';
import DoxenTextField from '@/components/formFields/DoxenTextField.vue';
import DoxenTextarea from '@/components/formFields/DoxenTextarea.vue';

/**
 * This JSON.stringify's a given value, then we clean up the formatting,
 * swap double and single quotes, etc.
 *
 * @param  {Array|Object} value   Any Object or Array
 * @param  {string}       indent  A string to use for indentation starting with a return
 * @return {string}               The formatted object as a string
 */
export const deJSONify = function (value, indent) {
  if (
    value &&
    (
      Array.isArray(value) ||
      typeof(value) === 'object'
    )
  ) {
    value = JSON.stringify(value, null, 2);
    // Remove quotes from keys
    value = value.replace(/"(\w+)"\s*:/g, '$1:');
    // Re-indent
    value = value.split('\n').join(indent);
    // Save escaped double-quotes
    value = value.split('\\"').join('SLASH_SLASH_DOUBLE_QUOTE');
    // Escape existing single-quotes
    value = value.split('\'').join('\\\'');
    // Convert double-quotes to single-quotes
    value = value.split('"').join('\'');
    // Re-insert unescaped double quotes
    value = value.split('SLASH_SLASH_DOUBLE_QUOTE').join('"');
  }
  return value;
};

/**
 * Creates a string of markup to be displayed on a component demo page
 * so the user can easily copy/paste the result of tinkering in the
 * playground into their code.
 *
 * @param  {string}   tag         The component name, like 'MyCoolCheckbox'
 * @param  {object[]} attributes  Array of objects representing Vue props with a name, value, and maybe required
 * @param  {string}   slot        The hand-typed markup passed in by the user in a textarea
 * @param  {String[]} emits       Array of strings for each emit name
 * @return {string}               The indented/formatted HTML generated from the props playground, ready for syntax highlighting
 */
export const createMarkupExample = function (tag, attributes, slot, emits) {
  const indent = '\n  ';
  if (slot) {
    slot = '  ' + slot.split('\n').join(indent);
  }

  attributes = [
    ...attributes,
    ...emits
      .filter(function (name) {
        // skip v-model
        return name.startsWith('update:');
      })
      .map(function (name) {
        return {
          name,
          type: 'emit',
          value: 'yourMethodName'
        };
      })
  ];

  const props = attributes.map(function (attribute) {
    const name = attribute.name;
    if (name === 'modelValue') {
      return indent + 'v-model="yourDataValue"';
    }

    if (!attribute.value && !attribute.required) {
      return '';
    }

    let value = attribute.value;

    let dynamic = '';
    if (typeof(attribute.value) !== 'string') {
      dynamic = ':';
    }
    if (attribute.type === 'emit') {
      dynamic = '@';
    }

    value = deJSONify(value, indent);

    return indent + dynamic + name + '="' + value + '"';
  }).filter(Boolean);

  let newLine = '';
  let closer = ' />';
  if (props.length) {
    newLine = '\n';
    closer = '/>';
  }

  if (slot) {
    return [
      '<' + tag + '' + props.join('') + newLine + '>',
      slot,
      '</' + tag + '>'
    ].filter(Boolean).join('\n');
  }
  return '<' + tag + '' + props.join('') + newLine + closer;
};

/**
 * Recursively convert arrays of Type Constructors to human lists
 * [String, Boolean] => 'String or Boolean'
 *
 * @param  {Array}  arr  Array of type constructors
 * @return {string}      Human list string
 */
const arrayTypeToString = function (arr) {
  if (Array.isArray(arr)) {
    const newArr = [];
    arr.forEach((item) => {
      newArr.push(typeToString(item));
    });
    return humanList(newArr);
  } else {
    return arr;
  }
};

/**
 * Converts a type constructor, or array of type constructors to a string.
 * Booelan => 'Boolean'
 * [Number, String] => ['Number', 'String']
 *
 * @param  {Function|Function[]} type  Type contructor or array of type constructors used in Vue's prop defintions
 * @return {string}                    Plain text string version, arrays become human lists
 */
export const typeToString = function (type) {
  const typeMap = {
    [Array]: 'Array',
    [Boolean]: 'Boolean',
    [Number]: 'Number',
    [Object]: 'Object',
    [String]: 'String'
  };
  type = arrayTypeToString(type);
  type = typeMap[type] || type;
  return type;
};

export const autoGeneratePlaygroundProps = function (props, styleTokens) {
  const playgroundProps = {};
  if (Array.isArray(props) || typeof(props) !== 'object' || !props) {
    return playgroundProps;
  }
  for (const propName in props) {
    const prop = props[propName];
    const typeConstructor = prop.type;
    const type = typeToString(typeConstructor);
    const name = _startCase(propName);

    if (type === 'Boolean') {
      playgroundProps[propName] = {
        component: DoxenCheckbox,
        props: {
          name,
          styleTokens
        }
      };
    } else if (['Object', 'Array'].includes(type)) {
      playgroundProps[propName] = {
        component: DoxenJsonTextarea,
        props: {
          label: name,
          styleTokens
        }
      };
    } else if (propName.toLowerCase().includes('message')) {
      playgroundProps[propName] = {
        component: DoxenTextarea,
        props: {
          label: name,
          styleTokens
        }
      };
    } else {
      playgroundProps[propName] = {
        component: DoxenTextField,
        props: {
          modelValue: name,
          label: name,
          styleTokens
        }
      };
    }
  }
  return playgroundProps;
};
