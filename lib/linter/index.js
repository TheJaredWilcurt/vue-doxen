/** @typedef {import('../../types').DEMOS} DEMOS */
/** @typedef {import('../../types').OPTIONS} OPTIONS */
/** @typedef {import('../../types').LINTERSETTINGS} LINTERSETTINGS */
/** @typedef {import '../../types'}.RULEDEFINITION} RULEDEFINITION */

import prettyMilliseconds from 'pretty-ms';

import { createSettingsFromDefaults } from '@/linter/defaultSettings.js';
import {
  generateErrorReport,
  summarizeErrorReport,
  wrapOutput
} from '@/linter/errorReporting.js';
import {
  isComponentContainer,
  isComponent
} from '@/linter/helpers.js';
import { allEmitsMustHaveDescription } from '@/linter/rules/demos/allEmitsMustHave/description.js';
import { allEmitsMustHaveExample } from '@/linter/rules/demos/allEmitsMustHave/example.js';
import { allEmitsMustHaveValue } from '@/linter/rules/demos/allEmitsMustHave/value.js';
import { allPropsMustHaveAllowed } from '@/linter/rules/demos/allPropsMustHave/allowed.js';
import { allPropsMustHaveDeprecated } from '@/linter/rules/demos/allPropsMustHave/deprecated.js';
import { allPropsMustHaveDescription } from '@/linter/rules/demos/allPropsMustHave/description.js';
import { allPropsMustHaveExample } from '@/linter/rules/demos/allPropsMustHave/example.js';
import { allPropsMustHaveRequiredOrDefault } from '@/linter/rules/demos/allPropsMustHave/requiredOrDefault.js';
import { allPropsMustHaveType } from '@/linter/rules/demos/allPropsMustHave/type.js';
import { allPropsMustHaveValidator } from '@/linter/rules/demos/allPropsMustHave/validator.js';
import { componentMustBeNamed } from '@/linter/rules/demos/componentMustBeNamed.js';
import { demosMustHaveComponent } from '@/linter/rules/demos/demosMustHaveComponent.js';
import { deprecatedMustBeSet } from '@/linter/rules/demos/deprecatedMustBeSet.js';
import { descriptionMustEndInPeriod } from '@/linter/rules/demos/descriptionMustEndInPeriod.js';
import { doNotViolateVueEmitApi } from '@/linter/rules/demos/doNotViolateVueEmitApi.js';
import { mustHaveDescription } from '@/linter/rules/demos/mustHaveDescription.js';
import { mustHaveImportStatement } from '@/linter/rules/demos/mustHaveImportStatement.js';
import { noCustomComponentsInComponent } from '@/linter/rules/demos/noCustomComponentsInComponent.js';
import { onlyAllowDemoObjects } from '@/linter/rules/demos/onlyAllowDemoObjects.js';
import { allComponentsMustBeReplaced } from '@/linter/rules/options/allComponentsMustBeReplaced.js';
import { noMissingComponents } from '@/linter/rules/options/noMissingComponents.js';

/** @type {RULEDEFINITION[]} */
export const ruleDefinitions = [
  // Emits
  allEmitsMustHaveDescription,
  allEmitsMustHaveExample,
  allEmitsMustHaveValue,
  // Props
  allPropsMustHaveAllowed,
  allPropsMustHaveDeprecated,
  allPropsMustHaveDescription,
  allPropsMustHaveExample,
  allPropsMustHaveRequiredOrDefault,
  allPropsMustHaveType,
  allPropsMustHaveValidator,
  // Demos
  componentMustBeNamed,
  demosMustHaveComponent,
  deprecatedMustBeSet,
  descriptionMustEndInPeriod,
  doNotViolateVueEmitApi,
  mustHaveDescription,
  mustHaveImportStatement,
  noCustomComponentsInComponent,
  onlyAllowDemoObjects,
  // Options
  allComponentsMustBeReplaced,
  noMissingComponents
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
