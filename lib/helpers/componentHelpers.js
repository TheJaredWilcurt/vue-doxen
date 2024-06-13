/* eslint-disable import/no-unused-modules */

/**
 * Takes in a list and joins it like you would in English class.
 * Courtesy of your friends at StackOverflow.
 *
 * @example
 * humanList(['a', 'b', 'c'], 'and'); // 'a, b, and c'
 *
 * @param  {String[]} arr            List of strings
 * @param  {String}   [conjunction]  Joining word for last element, defaults to 'or'
 * @return {String}                  The humanized version of the list as a string
 */
export const humanList = function (arr, conjunction) {
  if (!Array.isArray(arr)) {
    return arr;
  }
  if (conjunction && typeof conjunction !== 'string') {
    conjunction = undefined;
  }
  conjunction = conjunction || 'or';
  return (
    [arr.slice(0, -1).join(', '), arr.slice(-1)[0]]
      .join(arr.length < 2 ? '' : arr.length < 3 ? (' ' + conjunction + ' ') : (', ' + conjunction + ' '))
  );
};

/**
 * Wraps a string in quotes.
 *
 * @param  {Any}    value    A string to be wrapped in quotes
 * @param  {String} [quote]  Optional token to wrap around string, defaults to double quotes
 * @return {Any}             Returns the value in quotes, or the original value if it wasn't a string
 */
export const wrapString = function (value, quote) {
  quote = quote || '"';
  if (typeof(value) === 'string') {
    return quote + value + quote;
  }
  return value;
};

export const wrappedHumanList = function (arr, conjunction, quote) {
  const newArr = arr.map(function (value) {
    return wrapString(value, quote);
  });
  return humanList(newArr, conjunction);
};

/**
 * Console warns a helpful, human readable message if a prop recieved a value
 * that is not permitted.
 *
 * @param  {Any}     value          Any primitive, like a String or Number
 * @param  {String}  componentName  The name of the component, used in the warning message
 * @param  {String}  propName       The name of the prop, used in the warning message
 * @param  {Array}   allowed        List of permitted values to check against
 * @return {Boolean}                true = value was valid
 */
export const allowedPropWarning = function (value, componentName, propName, allowed) {
  const valid = allowed.includes(value);
  if (!valid) {
    setTimeout(() => {
      const warning = [
        'The',
        componentName,
        propName,
        'prop received',
        wrapString(value),
        'but only allows',
        wrappedHumanList(allowed) + '.'
      ].join(' ');
      console.warn(warning);
    }, 0);
  }
  return valid;
};

/**
 * Creates a props definition object with a validator method that warns if
 * a value was recieved that is not allowed.
 *
 * @param  {object} options                    Container object
 * @param  {string} options.COMPONENT_NAME     The name of the component, used in the warning message
 * @param  {string} options.propName           The name of the prop, used in the warning message
 * @param  {object} options.props              Container object
 * @param  {array}  options.props.allowed      List of permitted values
 * @param  {string} options.props.description  A human readable description of the prop used by the docs site
 * @return {object}                            The props object with a validator method added
 */
export const propsDocumentation = function (options) {
  const props = { ...options.props };
  const COMPONENT_NAME = options.COMPONENT_NAME;
  const allowed = options.props?.allowed;
  const propName = options.propName;

  if (allowed && COMPONENT_NAME && propName) {
    props.validator = function (value) {
      return allowedPropWarning(value, COMPONENT_NAME, propName, allowed);
    };
  }

  return props;
};

/**
 * Converts any letter that is not a-z,A-Z,0-9 or hypen or underscore to
 * a hypen in a given string. For use in HTML attributes, classnames, etc.
 *
 * @param  {string} str  Any string, ex: 'Pokémon'
 * @return {string}      Modified string. ex: 'Pok-mon'
 */
export const replaceWeirdCharacters = function (str) {
  const allowedIDCharacters = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '_', '-'
  ];
  str = str.split('').map(function (character) {
    if (allowedIDCharacters.includes(character)) {
      return character;
    }
    return '-';
  }).join('');
  return str;
};

/**
 * Creates a temporary ID for use in the UI.
 *
 * @return {string}  A unique ID, such as 'n97dox_39529'
 */
export const generateRandomId = function () {
  // Get 6 random letters and numbers (a-z,0-9).
  // 0.41443261745317206 => '0.ex3rnl4u2dn' => 'l4u2dn'
  const random = Math.random().toString(36).substr(-6, 9);
  // Get the current time in ms since epoch.
  // Trim off the starting 8 digits that are always
  // going to be the same when ran in the UI.
  // 1718291957591 => '57591'
  const date = String((new Date()).getTime()).substr(8);

  return [
    random,
    date
  ].join('_');
};

/**
 * Creates an ID to be used by form elements for the "id" and "for" attributes.
 *
 * @param  {string}        options.name        Used in composing ID
 * @param  {any}           options.value       Used in composing ID
 * @param  {number|string} [options.uniqueId]  Used in composing ID
 * @param  {string}        options.label       Used in composing ID
 * @return {string}                            A, hopefully, suffiently unique ID
 */
export const createIdFor = function ({ name, value, uniqueId, label }) {
  let id = [
    'VueDoxen',
    label,
    name,
    value,
    uniqueId
  ].filter(Boolean).join('_');
  return replaceWeirdCharacters(id);
};

export const createRadioIdFor = function (option, label) {
  let id = [
    'VueDoxen',
    String(label),
    String(option.name),
    String(option.value),
    option.uniqueId
  ].filter(Boolean).join('_');
  return replaceWeirdCharacters(id);
};

export const processDemos = function (demos) {
  const processed = {};
  if (!demos || typeof(demos) !== 'object' || Array.isArray(demos)) {
    return processed;
  }
  for (const demoName in demos) {
    const demo = demos[demoName];
    const demoType = typeof(demo) === 'object';
    if (demoType) {
      if (demo.component && typeof(demo.component) === 'object') {
        processed[demoName] = demo;
      } else {
        processed[demoName] = { component: demo };
      }
    }
  }
  return processed;
};

export const createImportStatement = function (COMPONENT_NAME) {
  return {
    importStatement: 'import { ' + COMPONENT_NAME + ' } from \'vue-doxen\';'
  };
};
