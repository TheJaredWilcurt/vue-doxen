import { demosMustHaveComponent } from '@/linter/rules/demos/demosMustHaveComponent.js';

import DoxenButton from '@/components/DoxenButton.vue';

describe('Components must have a name', () => {
  const consoleInfo = console.info;
  const ruleName = demosMustHaveComponent.title;
  const demoName = 'MyComponent';
  const key = 'component';
  const message = 'The ' + demoName + ' demo must have a component.';
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
        demosMustHaveComponent: true
      }
    };
    errors = [];
  });

  afterEach(() => {
    console.info = consoleInfo;
  });

  describe('Rule', () => {
    test('Catches the missing key', () => {
      const demos = {
        [demoName]: {}
      };
      demosMustHaveComponent.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([ERROR]);
    });

    test('Fails when key is undefined', () => {
      const demos = {
        [demoName]: {
          [key]: undefined
        }
      };
      demosMustHaveComponent.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([ERROR]);
    });

    test('Passes when key is component', () => {
      const demos = {
        [demoName]: {
          [key]: DoxenButton
        }
      };
      demosMustHaveComponent.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([]);
    });

    test('Passes when demo is component', () => {
      const demos = {
        [demoName]: DoxenButton
      };
      demosMustHaveComponent.rule(demos, options, linterSettings, errors);

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
        !!ruleDefinition.examples['Demo File'].length
      );
      const hasCorrectTypes = (
        typeof(ruleDefinition.title) === 'string' &&
        typeof(ruleDefinition.description) === 'string' &&
        ruleDefinition.description.endsWith('.') &&
        typeof(ruleDefinition.url) === 'string' &&
        typeof(ruleDefinition.examples) === 'object' &&
        !Array.isArray(ruleDefinition.examples) &&
        typeof(ruleDefinition.examples['Demo File']) === 'string'
      );
      return existsWithValue && hasCorrectTypes;
    }

    expect(validateRuleDocumentation(demosMustHaveComponent))
      .toEqual(true);
  });
});
