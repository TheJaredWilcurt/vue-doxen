/** @typedef {import('../../types').DEMOS} DEMOS */
/** @typedef {import('../../types').OPTIONS} OPTIONS */
/** @typedef {import('../../types').LINTERSETTINGS} LINTERSETTINGS */
/** @typedef {import '../../types'}.RULEDEFINITION} RULEDEFINITION */

import prettyMilliseconds from 'pretty-ms';

import { createSettingsFromDefaults } from '@/linter/defaultSettings.js';
import { generateErrorReport } from '@/linter/errorReporting.js';
import { allEmitsMustHaveDescription } from '@/linter/rules/demos/allEmitsMustHave/description.js';
import { allEmitsMustHaveExample } from '@/linter/rules/demos/allEmitsMustHave/example.js';
import { allEmitsMustHaveValue } from '@/linter/rules/demos/allEmitsMustHave/value.js';
import { allPropsMustHaveDeprecated } from '@/linter/rules/demos/allPropsMustHave/deprecated.js';
import { allPropsMustHaveDescription } from '@/linter/rules/demos/allPropsMustHave/description.js';
import { allPropsMustHaveExample } from '@/linter/rules/demos/allPropsMustHave/example.js';
import { allPropsMustHaveRequiredOrDefault } from '@/linter/rules/demos/allPropsMustHave/requiredOrDefault.js';
import { mustHaveDescription } from '@/linter/rules/demos/mustHaveDescription.js';

/** @type {RULEDEFINITION[]} */
export const ruleDefinitions = [
  allEmitsMustHaveDescription,
  allEmitsMustHaveExample,
  allEmitsMustHaveValue,
  allPropsMustHaveDeprecated,
  allPropsMustHaveDescription,
  allPropsMustHaveExample,
  allPropsMustHaveRequiredOrDefault,
  mustHaveDescription
];

/**
 * The primary function used to evaluate and lint your Vue-Doxen demos.
 *
 * @param  {DEMOS}          demos    All the Component demos to lint.
 * @param  {OPTIONS}        options  Your Vue-Doxen options object.
 * @param  {LINTERSETTINGS}          linterSettings  Linting settings.
 */
export const doxenLinter = function (demos, options, linterSettings) {
  const startTime = new Date();
  console.info('Vue-Doxen Linter started');
  /** @type {string[]} */
  let errors = [];
  /** @type {LINTERSETTINGS} */
  const normalizedSettings = createSettingsFromDefaults(linterSettings);

  // Run rules
  for (const ruleDefinition of ruleDefinitions) {
    ruleDefinition.rule(demos, options, normalizedSettings, errors);
  }

  /** @type {string} */
  const errorReport = generateErrorReport(errors);
  const endTime = new Date();
  const timeTaken = prettyMilliseconds(endTime.getTime() - startTime.getTime());
  console.info('Vue-Doxen Linter completed in ' + timeTaken + '.');
  if (errorReport) {
    console.info('\n' + errorReport + '\n');
  }
  // Throw if errors occured
  if (errors.length) {
    if (errors.length === 1) {
      throw 'Vue-Doxen Linter: Found 1 error.';
    }
    throw 'Vue-Doxen Linter: Found ' + errors.length + ' errors.';
  }
};
