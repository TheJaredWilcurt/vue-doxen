/* eslint-disable no-useless-escape,import/no-extraneous-dependencies,import/no-unused-modules */

/**
 * All of the logic here was stolen from jest-serializer-vue-tjw
 * where it has 100% test coverage.
 */

import _cloneDeep from 'lodash.clonedeep';

/**
 * Same as JSON.stringify, but without quotes around object properties.
 *
 * @param  {object} obj  data to stringify
 * @return {string}      stringified string
 */
const stringify = function (obj) {
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
    return JSON.stringify([...obj]);
  }
  if (typeof(obj) === 'object' && typeof(obj.getTime) === 'function') {
    if (Number.isNaN(obj.getTime())) {
      return obj.toString(); // 'Invalid Date'
    } else {
      return obj.getTime() + ''; // '1583463154386'
    }
  }
  if (typeof(obj) === 'function') {
    return 'Function';
  }
  if (typeof(obj) !== 'object' || Array.isArray(obj)) {
    return JSON.stringify(obj) || '';
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
 * stringified name or undefined if not a native event. We call
 * this first because _cloneDeep converts native events to empty
 * objects.
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
    swapQuotes(stringify(_cloneDeep(value)))
  );
};
