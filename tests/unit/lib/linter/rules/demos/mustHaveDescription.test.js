import { validateRuleDocumentation } from '@/linter/helpers.js';
import { mustHaveDescription } from '@/linter/rules/demos/mustHaveDescription.js';

import DoxenButton from '@/components/DoxenButton.vue';

describe('Demos must have a description', () => {
  const consoleInfo = console.info;
  const demoName = 'MyComponent';
  const key = 'description';
  const message = 'The ' + demoName + ' demo must have a component description.';
  let options;
  let linterSettings;
  let errors;

  beforeEach(() => {
    console.info = vi.fn();
    options = {};
    linterSettings = {
      demos: {
        mustHaveDescription: true
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
      mustHaveDescription.rule(demos, options, linterSettings, errors);

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
      mustHaveDescription.rule(demos, options, linterSettings, errors);

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
      mustHaveDescription.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([]);
    });

    test('Passes when key is a component', () => {
      const demos = {
        [demoName]: {
          [key]: DoxenButton
        }
      };
      mustHaveDescription.rule(demos, options, linterSettings, errors);

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
        mustHaveDescription.rule(demos, options, linterSettings, errors);

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
        mustHaveDescription.rule(demos, options, linterSettings, errors);

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
        mustHaveDescription.rule(demos, options, linterSettings, errors);

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
              [key]: DoxenButton
            }
          }
        };
        mustHaveDescription.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([]);
      });
    });
  });

  test('Documentation', () => {
    expect(validateRuleDocumentation(mustHaveDescription))
      .toEqual(true);
  });
});
