import doxenLinter from '@@@@/index.js';

import { createDemos } from '@@@/demos/index.js';

const styleTokens = {};
const demos = createDemos(styleTokens);
const options = {};
const preferredSettings = {
  demos: {
    mustHaveDescription: true,
    allPropsMustHave: {
      description: true
    }
  }
};
const allSettings = {
  demos: {
    allEmitsMustHave: {
      description: true,
      example: true,
      value: true
    },
    allPropsMustHave: {
      allowed: true,
      deprecated: true,
      description: true,
      example: true,
      requiredOrDefault: true,
      type: true,
      validator: true
    },
    componentMustBeNamed: true,
    demosMustHaveComponent: true,
    deprecatedMustBeSet: true,
    descriptionMustEndInPeriod: true,
    doNotViolateVueEmitApi: true,
    mustHaveDescription: true,
    mustHaveImportStatement: true,
    noCustomComponentsInComponent: true,
    onlyAllowDemoObjects: true
  },
  options: {
    allComponentsMustBeReplaced: true,
    noMissingComponents: true
  }
};

// If you want this script to cause your CI to stop,
// remove the try/catch and let it throw.
try {
  doxenLinter(demos, options, (allSettings || preferredSettings));
} catch (error) {
  console.log(error);
}
