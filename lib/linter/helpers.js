/**
 * @file Linter helper functions.
 */

/** @typedef {import('../../types').DEMOS} DEMOS */
/** @typedef {import('../../types').LINTERSETTINGS} LINTERSETTINGS */

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
        let valid = false;
        if (demo) {
          if (
            demo.emitsToDemo &&
            demo.emitsToDemo[emitName] &&
            Object.hasOwn(demo.emitsToDemo[emitName], key) &&
            ['string', 'undefined'].includes(typeof(demo.emitsToDemo[emitName][key]))
          ) {
            valid = true;
          }
          if (
            demo.component &&
            demo.component.emitsToDemo &&
            demo.component.emitsToDemo[emitName] &&
            Object.hasOwn(demo.component.emitsToDemo[emitName], key) &&
            ['string', 'undefined'].includes(typeof(demo.component.emitsToDemo[emitName][key]))
          ) {
            valid = true;
          }
        }
        if (!valid) {
          const message = 'The ' + demoName + ' emit ' + emitName + ' must have ' + messageSuffix + '.';
          console.info(message);
          errors.push(demoName);
        }
      }
    }
  }
};
