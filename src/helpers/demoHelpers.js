/* eslint-disable import/no-unused-modules */

import _startCase from 'lodash.startcase';

import {
  deJSONify,
  humanList
} from '@/helpers/componentHelpers.js';

import DoxenCheckbox from '@/components/formFields/DoxenCheckbox.vue';
import DoxenDropdown from '@/components/formFields/DoxenDropdown.vue';
import DoxenJsonTextarea from '@/components/formFields/DoxenJsonTextarea.vue';
import DoxenPlainText from '@/components/formFields/DoxenPlainText.vue';
import DoxenRadioDials from '@/components/formFields/DoxenRadioDials.vue';
import DoxenTextField from '@/components/formFields/DoxenTextField.vue';
import DoxenTextarea from '@/components/formFields/DoxenTextarea.vue';

/**
 * Creates a string of markup to be displayed on a component demo page
 * so the user can easily copy/paste the result of tinkering in the
 * playground into their code.
 *
 * @param  {string}   tag         The component name, like 'MyCoolCheckbox'
 * @param  {object[]} attributes  Array of objects representing Vue props with a name, value, and maybe required
 * @param  {object}   slots       Keys are the slot names, values are the hand-typed markup passed in by the user in a textarea
 * @param  {String[]} emits       Array of strings for each emit name
 * @return {string}               The indented/formatted HTML generated from the props playground, ready for syntax highlighting
 */
export const createMarkupExample = function (tag, attributes, slots, emits) {
  const indent = '\n  ';

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

  if (slots) {
    const slotKeys = Object.keys(slots);
    const firstSlotKey = slotKeys[0];
    const slotMarkup = [];
    if (slotKeys.length) {
      const thereIsOnlyOneSlotAndItIsDefault = (
        slotKeys.length === 1 &&
        firstSlotKey === 'default'
      );
      if (thereIsOnlyOneSlotAndItIsDefault) {
        slotMarkup.push('  ' + slots[firstSlotKey].split('\n').join(indent));
      } else {
        for (const slotKey in slots) {
          slotMarkup.push('  <template #' + slotKey + '>');
          slotMarkup.push('    ' + slots[slotKey].split('\n').join(indent + '  '));
          slotMarkup.push('  </template>');
        }
      }
      return [
        '<' + tag + '' + props.join('') + newLine + '>',
        ...slotMarkup,
        '</' + tag + '>'
      ].filter(Boolean).join('\n');
    }
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

    if (propName === 'modelValue') {
      playgroundProps.modelValue = {
        component: DoxenPlainText,
        props: {
          label: 'Model Value',
          styleTokens
        }
      };
    } else if (
      props[propName]?.allowed &&
      Array.isArray(props[propName].allowed) &&
      props[propName].allowed.length
    ) {
      let component = DoxenDropdown;
      if (props[propName].allowed.length < 5) {
        component = DoxenRadioDials;
      }
      playgroundProps[propName] = {
        component,
        props: {
          label: name,
          modelValue: props[propName].default,
          options: props[propName].allowed.map((value) => {
            return {
              name: _startCase(value),
              value
            };
          }),
          styleTokens
        }
      };
    } else if (type === 'Boolean') {
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
