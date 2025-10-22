import prettyMilliseconds from 'pretty-ms';

import { createSettingsFromDefaults } from './defaultSettings.js';
import { generateErrorReport } from './errorReporting.js';
import { mustHaveDescription } from './rules/mustHaveDescription.js';

const ruleDefinitions = [
  mustHaveDescription
];
/**
 * The primary function used to evaluate and lint your Vue-Doxen demos.
 *
 * @param  {import('../../types').DEMOS}          demos           All the Component demos to lint.
 * @param  {import('../../types').OPTIONS}        options         Your Vue-Doxen options object.
 * @param  {import('../../types').LINTERSETTINGS} linterSettings  Linting settings.
 */
export const doxenLinter = function (demos, options, linterSettings) {
  const startTime = new Date();
  console.log('Vue-Doxen Linter started');
  let errors = [];
  const normalizedSettings = createSettingsFromDefaults(linterSettings);

  // Run rules
  for (const ruleDefinition of ruleDefinitions) {
    ruleDefinition.rule(demos, options, normalizedSettings, errors);
  }

  const errorReport = generateErrorReport(errors);
  const endTime = new Date();
  const timeTaken = prettyMilliseconds(endTime.getTime() - startTime.getTime());
  console.log('Vue-Doxen Linter completed in ' + timeTaken + '.');
  if (errorReport) {
    console.log('\n' + errorReport + '\n');
  }
  // Throw if errors occured
  if (errors.length === 1) {
    throw 'Found 1 error.';
  }
  if (errors.length > 1) {
    throw 'Found ' + errors.length + ' errors.';
  }
};
