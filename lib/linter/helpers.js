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
  /**
   * Loops over all emit related sections of a demo and
   * adds the emit names to a de-duped array.
   *
   * @param  {import('../../types').DEMO} demo  A single demo object (or component)
   * @return {string[]}                         Array of de-duped emit names
   */
  function combineEmits (demo) {
    const combinedEmits = [];

    function appendEmitNames (collection) {
      if (collection) {
        if (Array.isArray(collection)) {
          for (const emitName of collection) {
            combinedEmits.push(emitName);
          }
        } else if (typeof(collection) === 'object') {
          for (const emitName in collection) {
            combinedEmits.push(emitName);
          }
        }
      }
    }

    if (demo && typeof(demo) === 'object') {
      appendEmitNames(demo.emits);
      appendEmitNames(demo.emitsToDemo);
      if (demo.component) {
        appendEmitNames(demo.component.emits);
        appendEmitNames(demo.component.emitsToDemo);
      }
    }

    return Array.from(new Set(combinedEmits));
  }

  if (linterSettings.demos.allEmitsMustHave[key]) {
    for (const demoName in demos) {
      const demo = demos[demoName];
      const combinedEmits = combineEmits(demo);

      for (const emitName of combinedEmits) {
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
