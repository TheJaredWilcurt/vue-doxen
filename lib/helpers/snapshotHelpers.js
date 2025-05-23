/* eslint-disable no-useless-escape */

/**
 * All of the logic here was stolen from jest-serializer-vue-tjw
 * where it has 100% test coverage.
 */

/**
 * Same as JSON.stringify, but without quotes around object
 * properties and more human readable names for weird types.
 *
 * @param  {object} obj  data to stringify
 * @return {string}      stringified string
 */
const stringify = function (obj) {
  let result = undefined;

  if (obj === null) {
    return 'null';
  }
  if (obj === undefined) {
    return 'undefined';
  }
  if (Number.isNaN(obj)) {
    return 'NaN';
  }
  if (obj === Infinity) {
    return 'Infinity';
  }
  if (obj === -Infinity) {
    return '-Infinity';
  }
  if (obj instanceof Error) {
    return 'Error: ' + obj.message;
  }
  if (obj instanceof Set) {
    try {
      result = JSON.stringify([...obj]);
    } catch {}
    return result || '';
  }
  const type = typeof(obj);
  if (
    type === 'object' &&
    typeof(obj.getTime) === 'function'
  ) {
    if (Number.isNaN(obj.getTime())) {
      return obj.toString(); // 'Invalid Date'
    } else {
      return obj.getTime() + ''; // '1583463154386'
    }
  }
  if (type === 'function') {
    return 'Function';
  }
  if (type !== 'object' || Array.isArray(obj)) {
    try {
      result = JSON.stringify(obj);
    } catch {}
    return result || '';
  }

  let props = Object
    .keys(obj)
    .map((key) => {
      return key + ':' + stringify(obj[key]);
    })
    .join(',');

  return '{' + props + '}';
};

/**
 * Swaps single and double quotes
 *
 * @param  {string} str  Input
 * @return {string}      Swapped output
 */
const swapQuotes = function (str) {
  return str.replace(/[\'\"]/g, function (match) {
    return match === '"' ? '\'' : '"';
  });
};

/**
 * Detects native browser events and returns a human-readable
 * stringified name or undefined if not a native event.
 *
 * @param  {object} obj  Any object, including native events
 * @return {string}      The human readble even type or undefined
 */
const handleNativeEvents = function (obj) {
  if (
    typeof(obj) === 'object' &&
    String(obj).startsWith('[object ') &&
    String(obj).endsWith('Event]')
  ) {
    const type = String(obj)
      .replace('[object ', '')
      .replace('Event]', '');
    return 'Native ' + type + ' Event';
  }
  return undefined;
};

/**
 * Takes in the value of a form element and prepares it to be
 * rendered as a string on an attribute in the DOM for snapshots.
 *
 *
 * @param  {any}    value  The value of the form field component
 * @return {string}        The stringified version for DOM snapshots
 */
export const dataValue = function (value) {
  return (
    handleNativeEvents(value) ||
    swapQuotes(stringify(value))
  );
};
