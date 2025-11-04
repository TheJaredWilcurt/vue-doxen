import { validateRuleDocumentation } from '@/linter/helpers.js';
import { mustHaveImportStatement } from '@/linter/rules/demos/mustHaveImportStatement.js';

import DoxenButton from '@/components/DoxenButton.vue';

describe('Demos must have an import statement', () => {
  const consoleInfo = console.info;
  const demoName = 'MyComponent';
  const key = 'importStatement';
  const message = 'The ' + demoName + ' demo must have an import statement.';
  let options;
  let linterSettings;
  let errors;

  beforeEach(() => {
    console.info = vi.fn();
    options = {};
    linterSettings = {
      demos: {
        mustHaveImportStatement: true
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
      mustHaveImportStatement.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .toHaveBeenCalledWith(message);

      expect(errors)
        .toEqual([demoName]);
    });

    test('Passes when key is string', () => {
      const demos = {
        [demoName]: {
          [key]: 'text'
        }
      };
      mustHaveImportStatement.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([]);
    });

    test('Passes when key is explicitly set to undefined', () => {
      const demos = {
        [demoName]: {
          [key]: undefined
        }
      };
      mustHaveImportStatement.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([]);
    });

    test('Passes when key is a component', () => {
      const demos = {
        [demoName]: {
          [key]: {
            component: DoxenButton
          }
        }
      };
      mustHaveImportStatement.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([]);
    });

    describe('Description inside component', () => {
      test('Catches the missing key', () => {
        const demos = {
          [demoName]: {
            component: {
              name: demoName
            }
          }
        };
        mustHaveImportStatement.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .toHaveBeenCalledWith(message);

        expect(errors)
          .toEqual([demoName]);
      });

      test('Passes when key is string', () => {
        const demos = {
          [demoName]: {
            component: {
              name: demoName,
              [key]: 'text'
            }
          }
        };
        mustHaveImportStatement.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([]);
      });

      test('Passes when key is explicitly set to undefined', () => {
        const demos = {
          [demoName]: {
            component: {
              name: demoName,
              [key]: undefined
            }
          }
        };
        mustHaveImportStatement.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([]);
      });

      test('Passes when key is a component', () => {
        const demos = {
          [demoName]: {
            component: {
              name: demoName,
              [key]: {
                component: DoxenButton
              }
            }
          }
        };
        mustHaveImportStatement.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([]);
      });
    });
  });

  test('Documentation', () => {
    expect(validateRuleDocumentation(mustHaveImportStatement))
      .toEqual(true);
  });
});
