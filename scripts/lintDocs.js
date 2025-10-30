import { doxenLinter } from '@/linter/index.js';

import { createDemos } from '@@@/demos/index.js';

const styleTokens = {};
const demos = createDemos(styleTokens);
const options = {};
const linterSettings = {
  demos: {
    mustHaveDescription: true,
    allPropsMustHave: {
      description: true
    }
  }
};

// If you want this script to cause your CI to stop,
// remove the try/catch and let it throw.
try {
  doxenLinter(demos, options, linterSettings);
} catch (error) {
  console.log(error);
}
