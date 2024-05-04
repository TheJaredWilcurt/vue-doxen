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
function stringify (obj) {
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
}

/**
 * Swaps single and double quotes
 *
 * @param  {string} str  Input
 * @return {string}      Swapped output
 */
function swapQuotes (str) {
  return str.replace(/[\'\"]/g, function (match) {
    return match === '"' ? '\'' : '"';
  });
}

/**
 * Takes in the value of a form element and prepares it to be
 * rendered as a string on an attribute in the DOM for snapshots.
 *
 *
 * @param  {any}    value  The value of the form field component
 * @return {string}        The stringified version for DOM snapshots
 */
export const dataValue = function (value) {
  return swapQuotes(stringify(_cloneDeep(value)));
};
