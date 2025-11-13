/** @typedef {import '../types'}.RULEDEFINITION} RULEDEFINITION */

import { allEmitsMustHaveDescription } from './rules/demos/allEmitsMustHave/description.js';
import { allEmitsMustHaveExample } from './rules/demos/allEmitsMustHave/example.js';
import { allEmitsMustHaveValue } from './rules/demos/allEmitsMustHave/value.js';
import { allPropsMustHaveAllowed } from './rules/demos/allPropsMustHave/allowed.js';
import { allPropsMustHaveDeprecated } from './rules/demos/allPropsMustHave/deprecated.js';
import { allPropsMustHaveDescription } from './rules/demos/allPropsMustHave/description.js';
import { allPropsMustHaveExample } from './rules/demos/allPropsMustHave/example.js';
import { allPropsMustHaveRequiredOrDefault } from './rules/demos/allPropsMustHave/requiredOrDefault.js';
import { allPropsMustHaveType } from './rules/demos/allPropsMustHave/type.js';
import { allPropsMustHaveValidator } from './rules/demos/allPropsMustHave/validator.js';
import { componentMustBeNamed } from './rules/demos/componentMustBeNamed.js';
import { demosMustHaveComponent } from './rules/demos/demosMustHaveComponent.js';
import { deprecatedMustBeSet } from './rules/demos/deprecatedMustBeSet.js';
import { descriptionMustEndInPeriod } from './rules/demos/descriptionMustEndInPeriod.js';
import { doNotViolateVueEmitApi } from './rules/demos/doNotViolateVueEmitApi.js';
import { mustHaveDescription } from './rules/demos/mustHaveDescription.js';
import { mustHaveImportStatement } from './rules/demos/mustHaveImportStatement.js';
import { noCustomComponentsInComponent } from './rules/demos/noCustomComponentsInComponent.js';
import { onlyAllowDemoObjects } from './rules/demos/onlyAllowDemoObjects.js';
import { allComponentsMustBeReplaced } from './rules/options/allComponentsMustBeReplaced.js';
import { noMissingComponents } from './rules/options/noMissingComponents.js';

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
