/**
 * @file Linter helper functions.
 */

/** @typedef {import('../../types').DEMOS} DEMOS */
/** @typedef {import('../../types').LINTERSETTINGS} LINTERSETTINGS */

/**
 * Validates a key on a root object exists and is a string or undefined.
 *
 * @param  {object}  root  Any nested object
 * @param  {string}  key   A key to check on the object
 * @return {boolean}       True = valid, false = invalid
 */
export const validateStringOrUndefined = function (root, key) {
  return !!(
    root &&
    Object.hasOwn(root, key) &&
    ['string', 'undefined'].includes(typeof(root[key]))
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
