/** @typedef {import '../../types'}.RULEDEFINITION} RULEDEFINITION */

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
