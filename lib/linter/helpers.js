/**
 * @file Linter helper functions.
 */

/** @typedef {import('../../types').DEMO} DEMO */
/** @typedef {import('../../types').DEMOS} DEMOS */
/** @typedef {import('../../types').LINTERSETTINGS} LINTERSETTINGS */
/** @typedef {import('../../types').RULEDEFINITION} RULEDEFINITION */

import { nativeBuiltInToString } from '@/helpers/serializeJavaScript.js';

/**
 * Validates a key on a root object exists.
 *
 * @param  {object}  root  Any nested object
 * @param  {string}  key   A key to check on the object
 * @return {boolean}       True = valid, false = invalid
 */
export const keyExists = function (root, key) {
  return !!(
    root &&
    Object.hasOwn(root, key)
  );
};
/**
 * Validates a key on a root object exists and has a value of `true`.
 *
 * @param  {object}  root  Any nested object
 * @param  {string}  key   A key to check on the object
 * @return {boolean}       True = valid, false = invalid
 */
export const keyIsTrue = function (root, key) {
  return !!(
    keyExists(root, key) &&
    root[key] === true
  );
};
/**
 * Validates a key on the root object is a Vue prop "Type".
 *
 * @param  {object}  root  Any nested object
 * @param  {string}  key   A key to check on the object
 * @return {boolean}       True = valid, false = invalid
 */
export const validateTypeOrArrayOfTypes = function (root, key) {
  if (!keyExists(root, key)) {
    return false;
  }
  if (Array.isArray(root[key])) {
    return root[key].every((type) => {
      return nativeBuiltInToString(type);
    });
  }
  return !!nativeBuiltInToString(root[key]);
};
/**
 * Validates a key on a root object exists and is a string or undefined.
 *
 * @param  {object}  root  Any nested object
 * @param  {string}  key   A key to check on the object
 * @return {boolean}       True = valid, false = invalid
 */
export const validateStringOrUndefined = function (root, key) {
  return !!(
    keyExists(root, key) &&
    ['string', 'undefined'].includes(typeof(root[key]))
  );
};
/**
 * Validates a key on a root object exists and is a boolean.
 *
 * @param  {object}  root  Any nested object
 * @param  {string}  key   A key to check on the object
 * @return {boolean}       True = valid, false = invalid
 */
export const validateBoolean = function (root, key) {
  return !!(
    keyExists(root, key) &&
    typeof(root[key]) === 'boolean'
  );
};
/**
 * Validates a key on a root object exists, and is either undefined,
 * or is an array only containing primitives.
 *
 * @param  {object}  root  Any nested object
 * @param  {string}  key   A key to check on the object
 * @return {boolean}       True = valid, false = invalid
 */
export const validateArrayOfPrimitives = function (root, key) {
  const primitiveTypes = [
    'bigint',
    'boolean',
    'number',
    'string',
    'symbol',
    'undefined'
  ];
  return !!(
    keyExists(root, key) &&
    (
      root[key] === undefined ||
      (
        Array.isArray(root[key]) &&
        root[key].filter((item) => {
          let valid = (
            primitiveTypes.includes(typeof(item)) ||
            item === null
          );
          return !valid;
        }).length === 0
      )
    )
  );
};
/**
 * @callback VALIDATOR
 * @param    {object}  root  Any nested object
 * @param    {string}  key   A key to check on the object
 * @return   {boolean}       True = valid, false = invalid
 */
/**
 * Abstraction that checks the 4 locations where prop-related keys
 * are stored and runs the passed in validator on each.
 *
 * @param  {DEMO}      demo       The component or demo object for it.
 * @param  {string}    propName   The name of the prop to check.
 * @param  {string}    key        The key on the prop to check.
 * @param  {VALIDATOR} validator  The validation function to run.
 * @return {boolean}              If any of the validator checks passed.
 */
export const validateKeyAgainstProp = function (demo, propName, key, validator) {
  return (
    validator(demo?.props?.[propName], key) ||
    validator(demo?.propsToDemo?.[propName], key) ||
    validator(demo?.component?.props?.[propName], key) ||
    validator(demo?.component?.propsToDemo?.[propName], key)
  );
};

/**
 * Loops over all locations in the demo API to find props or emits
 * names.
 *
 * @param  {Array.<(Object|Array)>} locations  All the places on the demo object to check
 * @return {string[]}                          Array of de-duped emit/prop names
 */
export const getAllPropNamesOrEmitNames = function (locations) {
  const allNames = [];
  locations.forEach(function (location) {
    if (location) {
      if (Array.isArray(location)) {
        for (const name of location) {
          allNames.push(name);
        }
      } else if (typeof(location) === 'object') {
        for (const name in location) {
          allNames.push(name);
        }
      }
    }
  });
  return Array.from(new Set(allNames));
};

/**
 * Gets an array of all prop names for a given demo/component.
 *
 * @param  {DEMO}     demo  Any demo object or component.
 * @return {string[]}       Array of de-duped prop names.
 */
export const getAllPropNames = function (demo) {
  let allPropNames = [];
  if (demo && typeof(demo) === 'object') {
    allPropNames = getAllPropNamesOrEmitNames([
      demo.props,
      demo.propsToDemo,
      demo.component?.props,
      demo.component?.propsToDemo
    ]);
  }
  return allPropNames;
};

/**
 * Reusable function for the allEmistMustHave rules. They are all basically the same,
 * so this abstracts away their commonalities.
 *
 * @param  {DEMOS}          demos           Vue-Doxen demos object (to be linted).
 * @param  {LINTERSETTINGS} linterSettings  The user's desired settings for what linting rules should be enforced.
 * @param  {string[]}       errors          An array of demo/file names, each entry represents one violation of any rule.
 * @param  {string}         key             The specific key on the linterSettings object to validate.
 * @param  {string}         messageSuffix   Key specific text to put at the end of the console message.
 */
export const allEmitsMustHave = function (demos, linterSettings, errors, key, messageSuffix) {
  if (linterSettings.demos.allEmitsMustHave[key]) {
    for (const demoName in demos) {
      const demo = demos[demoName];
      const allEmitNames = getAllPropNamesOrEmitNames([
        demo?.emits,
        demo?.emitsToDemo,
        demo?.component?.emits,
        demo?.component?.emitsToDemo
      ]);

      for (const emitName of allEmitNames) {
        const valid = (
          validateStringOrUndefined(demo?.emitsToDemo?.[emitName], key) ||
          validateStringOrUndefined(demo?.component?.emitsToDemo?.[emitName], key)
        );
        if (!valid) {
          const message = 'The ' + demoName + ' emit ' + emitName + ' must have ' + messageSuffix + '.';
          console.info(message);
          errors.push(demoName);
        }
      }
    }
  }
};

/**
 * Takes in a string and removes the two spaces from the start
 * of every line and trims. Useful to have better code folding
 * in files, especially of code snippet strings.
 *
 * @param  {string} value  Snippet of code
 * @return {string}        Unindented snippet of code
 */
export const unindent = function (value) {
  if (
    !value.startsWith('  ') &&
    !value.startsWith('\n  ')
  ) {
    return value;
  }
  return value
    .split('\n')
    .map((line) => {
      if (line.startsWith('  ')) {
        return line.replace('  ', '');
      }
      return line;
    })
    .join('\n')
    .trim();
};

/**
 * Makes sure the shape and types of the documentation of a
 * linting rule matches expecations. Used by tests.
 *
 * @param  {RULEDEFINITION} ruleDefinition  An object containing a linting rule and its documentation.
 * @return {boolean}                        Returns true if shape and types are valid.
 */
export const validateRuleDocumentation = function (ruleDefinition) {
  const existsWithValue = (
    !!ruleDefinition.title.length &&
    !!ruleDefinition.description.length &&
    !!ruleDefinition.url.length &&
    !!Object.keys(ruleDefinition.examples).length &&
    !!ruleDefinition.examples['Demo File'].length &&
    !!ruleDefinition.examples.Options.length &&
    !!ruleDefinition.examples.Composition.length &&
    !!ruleDefinition.examples['Script Setup'].length
  );
  const hasCorrectTypes = (
    typeof(ruleDefinition.title) === 'string' &&
    typeof(ruleDefinition.description) === 'string' &&
    typeof(ruleDefinition.url) === 'string' &&
    typeof(ruleDefinition.examples) === 'object' &&
    !Array.isArray(ruleDefinition.examples) &&
    typeof(ruleDefinition.examples['Demo File']) === 'string' &&
    typeof(ruleDefinition.examples.Options) === 'string' &&
    typeof(ruleDefinition.examples.Composition) === 'string' &&
    typeof(ruleDefinition.examples['Script Setup']) === 'string'
  );
  return existsWithValue && hasCorrectTypes;
};
