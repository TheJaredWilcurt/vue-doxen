/** @typedef {import('../types').DEMOS} DEMOS */
/** @typedef {import('../types').OPTIONS} OPTIONS */
/** @typedef {import('../types').LINTERSETTINGS} LINTERSETTINGS */

import prettyMilliseconds from 'pretty-ms';

import { createSettingsFromDefaults } from './defaultSettings.js';
import {
  generateErrorReport,
  summarizeErrorReport,
  wrapOutput
} from './errorReporting.js';
import {
  isComponentContainer,
  isComponent
} from './helpers.js';
import { ruleDefinitions } from './ruleDefinitions.js';

/**
 * The primary function used to evaluate and lint your Vue-Doxen demos.
 *
 * @param  {DEMOS}          demos    All the Component demos to lint.
 * @param  {OPTIONS}        options  Your Vue-Doxen options object.
 * @param  {LINTERSETTINGS}          linterSettings  Linting settings.
 */
const doxenLinter = function (demos, options, linterSettings) {
  const startTime = new Date();
  console.info(wrapOutput('Vue-Doxen Linter started'));
  /** @type {string[]} */
  let errors = [];
  /** @type {LINTERSETTINGS} */
  const normalizedSettings = createSettingsFromDefaults(linterSettings);
  const innerDemos = {};

  if (
    typeof(demos) === 'object' &&
    !Array.isArray(demos) &&
    Object.keys(demos).length
  ) {
    for (const demoName in demos) {
      const demo = demos[demoName];
      if (isComponentContainer(demo) || isComponent(demo)) {
        innerDemos[demoName] = demo;
      } else {
        console.info(wrapOutput('The ' + demoName + ' demo, is not a demo object or Vue component.'));
      }
    }
  } else {
    console.info(wrapOutput('Vue-Doxen Linter: The demos object is empty or invalid.'));
  }

  // Run rules
  for (const ruleDefinition of ruleDefinitions) {
    ruleDefinition.rule(innerDemos, options, normalizedSettings, errors);
  }

  /** @type {string} */
  const endTime = new Date();
  generateErrorReport(errors);
  summarizeErrorReport(errors);
  const timeTaken = prettyMilliseconds(endTime.getTime() - startTime.getTime());
  console.info(wrapOutput('Vue-Doxen Linter completed in ' + timeTaken + '.'));
  // Throw if errors occured
  if (errors.length) {
    if (errors.length === 1) {
      throw ('Vue-Doxen Linter: Found 1 error.');
    }
    throw ('Vue-Doxen Linter: Found ' + errors.length + ' errors.');
  }
};

export default doxenLinter;
