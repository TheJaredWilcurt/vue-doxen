/* eslint-disable import/no-unused-modules */

import _startCase from 'lodash.startcase';

import {
  getArrayFromValidator,
  humanList
} from '@/helpers/componentHelpers.js';
import { serializeJavaScript } from '@/helpers/serializeJavaScript.js';

export function getDefaultValue (value) {
  if (typeof(value) === 'function') {
    return value();
  }
  return value;
}

function isVModel (name) {
  return ['modelValue', 'model-value'].includes(name);
}

function guessAllowed (prop) {
  if (prop?.validator && typeof(prop.validator) === 'function') {
    return getArrayFromValidator(prop.validator);
  }
}

/**
 * Takes in a Vue component and returns an array of strings of
 * all the named slots (including 'default').
 *
 * @param  {object} component  Any import Vue component (including minified)
 * @return {array}             Array of named slots as strings (including 'default')
 */
export const getSlotNamesFromComponent = function (component) {
  return component
    // The template render function
    ?.render
    // As a sting
    ?.toString()
    // Look for all slots
    ?.split('$slots')
    // Ignore stuff before first slot
    ?.toSpliced(0, 1)
    // Convert each line to a single named slot
    ?.map((line) => {
      // Slots names will be the first item wrapped in double quotes following '$slots'
      const slotName = line.split('"')[1];
      return slotName;
    });
};

/**
 * Takes in a component, returns an object of slot related data for demos.
 * Object with "SlotsToDemo" key containing object with slot names as keys
 * and their documentation objects with optional slotProps equaling array
 * of strings of the prop names (see example).
 *
 * @example
 * {
 *   slotsToDemo: {
 *     counter: {
 *       slotProps: [
 *         'count',
 *         'message'
 *       ]
 *     },
 *     other: {},
 *     default: {}
 *   }
 * }
 * or
 * {
 *   slotsToDemo: {}
 * }
 *
 * @param  {object} component  A Vue component
 * @return {object}            See example
 */
export const getSlotDataFromComponent = function (component) {
  const slotData = {};
  component
    // The template render function
    ?.render
    // As a sting
    ?.toString()
    // Look for all slots
    ?.split('.$slots,')
    // Ignore stuff before first slot
    ?.toSpliced(0, 1)
    // Convert each line to an object with the slot name as the key
    ?.forEach((line) => {
      // Disregard anything on the line after the slot part
      const slotDetails = line?.split(')')[0];
      // Get the name of the slot
      const slotName = slotDetails
        ?.split('"')
        ?.[1];
      // Get the props provided to the slot
      const slotProps = slotDetails
        // Split on the arguments passed into $slots
        ?.split(',')
        // Remove the first argument (slot name)
        ?.toSpliced(0, 1)
        // Join back on commas
        ?.join(',')
        // Cleanup
        ?.trim()
        // '{ a: e.y, b: "asdf" }' => ' a: e.y, b: "asdf '
        ?.split('')
        ?.toSpliced(0, 1)
        ?.toSpliced(-1, 1)
        ?.join('')
        // ' a: e.y, b: "asdf ' => [' a: e.y', ' b: "asdf ']
        ?.split(',')
        ?.map((item) => {
          // ' a: e.y' => 'a'
          return item.split(':')[0].trim();
        })
        ?.filter(Boolean);

      if (slotName) {
        slotData.slotsToDemo = slotData.slotsToDemo || {};
        slotData.slotsToDemo[slotName] = {};
        if (slotProps.length) {
          slotData.slotsToDemo[slotName].slotProps = slotProps;
        }
      }
    });
  return slotData;
};

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
        return !name.startsWith('update:');
      })
      .map(function (name) {
        return {
          name,
          type: 'emit',
          value: 'yourMethodName'
        };
      })
  ];

  const allVModels = emits
    .filter(function (name) {
      return name.startsWith('update:');
    })
    .map(function (name) {
      return name.replace('update:', '');
    });

  const props = attributes
    .map(function (attribute) {
      const name = attribute.name;
      const defaultValue = getDefaultValue(attribute?.default);

      if (isVModel(name)) {
        return indent + 'v-model="yourDataValue"';
      }
      if (allVModels.includes(name)) {
        return indent + 'v-model:' + name + '="yourDataValue';
      }

      // Remove attribute from Vue Template code example
      if (
        (
          // If the value matches the default, no need to pass anything in
          attribute.value === defaultValue
        ) ||
        (
          // Booleans are exempt from this check, handled in the previous check
          typeof(attribute.value) !== 'boolean' &&
          // Required fields must always be passed in, so only skip if optional
          !attribute.required &&
          // If no value was passed, then we can skip
          !attribute.value &&
          // Unless passing no value changes the outcome because it deviates from the default
          (defaultValue !== attribute.value)
        )
      ) {
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

      if (typeof(value) !== 'string') {
        try {
          value = serializeJavaScript(value);
        } catch (error) {
          console.log({ error });
        }
      }
      value = value.split('\n').join(indent);
      value = value.replaceAll('"', '&quot;');

      return indent + dynamic + name + '="' + value + '"';
    })
    .filter(Boolean)
    .sort(function (a, b) {
      a = a.trim();
      b = b.trim();
      if (b.startsWith('v-')) {
        return 1;
      }
      if (b.startsWith('@')) {
        return -1;
      }
      // Change to 'z' to move dynamic attributes to the bottom
      const replacement = '';
      if (a.startsWith(':')) {
        a = a.replace(':', replacement);
      }
      if (b.startsWith(':')) {
        b = b.replace(':', replacement);
      }
      return a < b ? -1 : a > b ? 1 : 0;
    });

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
    [Function]: 'Function',
    [Number]: 'Number',
    [Object]: 'Object',
    [String]: 'String'
  };
  type = arrayTypeToString(type);
  type = typeMap[type] || type;
  return type;
};

/**
 * Mutates the "allProps" object.
 */
const mergeProps = function (allProps, props) {
  if (
    typeof(props) === 'object' &&
    !Array.isArray(props)
  ) {
    for (const propName in props) {
      allProps[propName] = {
        ...allProps[propName],
        ...props[propName]
      };
    }
  }
};

export const combinePropsAndPropsToDemo = function (propsToDemo, componentProps) {
  const props = {};

  // Last one wins
  mergeProps(props, componentProps);
  mergeProps(props, propsToDemo);

  if (props.modelModifiers) {
    props.modelModifiers.description = (
      props.modelModifiers.description ||
      'Automatically supplied prop from Vue to pass v-model modifiers to native HTML elements.'
    );
  }

  for (const propName in props) {
    // Auto-generate "allowed" from common validator function patterns
    const prop = props[propName];
    if (!prop.allowed) {
      const allowed = guessAllowed(prop);
      if (Array.isArray(allowed)) {
        prop.allowed = allowed;
      }
    }
  }

  return props;
};

export const autoGeneratePlaygroundProps = function (props, components, styleTokens) {
  const playgroundProps = {};
  if (Array.isArray(props) || typeof(props) !== 'object' || !props) {
    return playgroundProps;
  }
  for (const propName in props) {
    const prop = props[propName];
    const typeConstructor = prop.type;
    const isRequired = prop.required;
    const hasDefault = 'default' in prop;
    const type = typeToString(typeConstructor);
    const name = _startCase(propName);
    const defaultValue = getDefaultValue(prop?.default);

    if (prop.component) {
      playgroundProps[propName] = prop;
    } else if (isVModel(propName)) {
      playgroundProps[propName] = {
        component: components.plainText,
        props: {
          asCode: true,
          label: 'Model Value',
          styleTokens
        }
      };
    } else if (
      type === 'Number' &&
      typeof(prop.min) === 'number' &&
      typeof(prop.max) === 'number'
    ) {
      playgroundProps[propName] = {
        component: components.rangeSlider,
        props: {
          label: name,
          modelValue: defaultValue || undefined,
          min: prop.min,
          max: prop.max,
          styleTokens
        }
      };
    } else if (type === 'Number') {
      playgroundProps[propName] = {
        component: components.numberField,
        props: {
          label: name,
          modelValue: defaultValue || undefined,
          styleTokens
        }
      };
    } else if (
      props[propName]?.allowed &&
      Array.isArray(props[propName].allowed) &&
      props[propName].allowed.length
    ) {
      let component = components.dropdown;
      if (props[propName].allowed.length < 5) {
        component = components.radioDials;
      }
      playgroundProps[propName] = {
        component,
        props: {
          label: name,
          modelValue: defaultValue,
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
        component: components.checkbox,
        props: {
          modelValue: !!defaultValue,
          name,
          styleTokens
        }
      };
    } else if (
      propName === 'modelModifiers' ||
      ['Object', 'Array'].includes(type)
    ) {
      playgroundProps[propName] = {
        component: components.jsonTextarea,
        props: {
          label: name,
          styleTokens
        }
      };
      if (isRequired && !hasDefault) {
        // type: Array // []
        if (type === 'Array') {
          playgroundProps[propName].props.modelValue = [];
        }
        // type: Object // {}
        if (type === 'Object') {
          playgroundProps[propName].props.modelValue = {};
        }
        // type: [Array, Object] // {}
        // type: [Object, Array] // {}
        if (
          Array.isArray(type) &&
          type.length === 2 &&
          type.includes('Array') &&
          type.includes('Object')
        ) {
          playgroundProps[propName].props.modelValue = {};
        }
      }
    } else if (type === 'Function') {
      playgroundProps[propName] = {
        component: components.plainText,
        props: {
          label: name,
          styleTokens
        }
      };
      if (isRequired && !hasDefault) {
        // type: Function // () => {}
        if (type === 'Function') {
          playgroundProps[propName].props.modelValue = function () {};
        }
      }
    } else if (propName.toLowerCase().includes('message')) {
      playgroundProps[propName] = {
        component: components.textarea,
        props: {
          label: name,
          styleTokens
        }
      };
    } else {
      let modelValue = name;
      if (hasDefault) {
        modelValue = defaultValue || modelValue;
      }
      playgroundProps[propName] = {
        component: components.textField,
        props: {
          modelValue,
          label: name,
          styleTokens
        }
      };
    }
  }
  return playgroundProps;
};
