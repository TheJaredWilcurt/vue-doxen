/* @typedef {import('../../types').LINTERSETTINGS} LINTERSETTINGS */

import prettyMilliseconds from 'pretty-ms';

import { createSettingsFromDefaults } from './defaultSettings.js';
import { generateErrorReport } from './errorReporting.js';
import { mustHaveDescription } from './rules/demos/mustHaveDescription.js';

const ruleDefinitions = [
  mustHaveDescription
];

/**
 * The primary function used to evaluate and lint your Vue-Doxen demos.
 *
 * @param  {import('../../types').DEMOS}    demos           All the Component demos to lint.
 * @param  {import('../../types').OPTIONS}  options         Your Vue-Doxen options object.
 * @param  {LINTERSETTINGS}                 linterSettings  Linting settings.
 */
export const doxenLinter = function (demos, options, linterSettings) {
  const startTime = new Date();
  console.info('Vue-Doxen Linter started');
  let errors = [];
  /** @type {LINTERSETTINGS} */
  const normalizedSettings = createSettingsFromDefaults(linterSettings);

  // Run rules
  for (const ruleDefinition of ruleDefinitions) {
    ruleDefinition.rule(demos, options, normalizedSettings, errors);
  }

  const errorReport = generateErrorReport(errors);
  const endTime = new Date();
  const timeTaken = prettyMilliseconds(endTime.getTime() - startTime.getTime());
  console.info('Vue-Doxen Linter completed in ' + timeTaken + '.');
  if (errorReport) {
    console.info('\n' + errorReport + '\n');
  }
  // Throw if errors occured
  if (errors.length === 1) {
    throw 'Found 1 error.';
  }
  if (errors.length > 1) {
    throw 'Found ' + errors.length + ' errors.';
  }
};
