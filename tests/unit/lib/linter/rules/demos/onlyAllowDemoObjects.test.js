import { onlyAllowDemoObjects } from '@/linter/rules/demos/onlyAllowDemoObjects.js';

import DoxenButton from '@/components/DoxenButton.vue';

describe('Demos must not have top level components passed in', () => {
  const consoleInfo = console.info;
  const ruleName = onlyAllowDemoObjects.title;
  const demoName = 'MyComponent';
  const message = 'The ' + demoName + ' component must be wrapped in a demo object.';
  const ERROR = {
    ruleName,
    demoName,
    message
  };
  let options;
  let linterSettings;
  let errors;

  beforeEach(() => {
    console.info = vi.fn();
    options = {};
    linterSettings = {
      demos: {
        onlyAllowDemoObjects: true
      }
    };
    errors = [];
  });

  afterEach(() => {
    console.info = consoleInfo;
  });

  describe('Rule', () => {
    test('Fails when a component is passed in', () => {
      const demos = {
        [demoName]: DoxenButton
      };
      onlyAllowDemoObjects.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([ERROR]);
    });

    test('Passes when component is wrapped in a demo object', () => {
      const demos = {
        [demoName]: {
          component: DoxenButton
        }
      };
      onlyAllowDemoObjects.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([]);
    });
  });

  test('Documentation', () => {
    function validateRuleDocumentation (ruleDefinition) {
      const existsWithValue = (
        !!ruleDefinition.title.length &&
        !!ruleDefinition.description.length &&
        !!ruleDefinition.url.length &&
        !!Object.keys(ruleDefinition.examples).length &&
        !!ruleDefinition.examples.Options.length &&
        !!ruleDefinition.examples.Composition.length &&
        !!ruleDefinition.examples['Script Setup'].length
      );
      const hasCorrectTypes = (
        typeof(ruleDefinition.title) === 'string' &&
        typeof(ruleDefinition.description) === 'string' &&
        ruleDefinition.description.endsWith('.') &&
        typeof(ruleDefinition.url) === 'string' &&
        typeof(ruleDefinition.examples) === 'object' &&
        !Array.isArray(ruleDefinition.examples) &&
        typeof(ruleDefinition.examples.Options) === 'string' &&
        typeof(ruleDefinition.examples.Composition) === 'string' &&
        typeof(ruleDefinition.examples['Script Setup']) === 'string'
      );
      return existsWithValue && hasCorrectTypes;
    }

    expect(validateRuleDocumentation(onlyAllowDemoObjects))
      .toEqual(true);
  });
});
