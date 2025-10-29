import { validateRuleDocumentation } from '@/linter/helpers.js';
import { deprecatedMustBeSet } from '@/linter/rules/demos/deprecatedMustBeSet.js';

import DoxenButton from '@/components/DoxenButton.vue';

describe('Demos must have a deprecationNotice', () => {
  const consoleInfo = console.info;
  const demoName = 'MyComponent';
  const key = 'deprecationNotice';
  const message = 'The ' + demoName + ' demo must have a deprecation notice (can be undefined).';
  let options;
  let linterSettings;
  let errors;

  beforeEach(() => {
    console.info = vi.fn();
    options = {};
    linterSettings = {
      demos: {
        deprecatedMustBeSet: true
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
      deprecatedMustBeSet.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .toHaveBeenCalledWith(message);

      expect(errors)
        .toEqual([demoName]);
    });

    test('Fails if key is empty string', () => {
      const demos = {
        [demoName]: {
          [key]: ''
        }
      };
      deprecatedMustBeSet.rule(demos, options, linterSettings, errors);

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
      deprecatedMustBeSet.rule(demos, options, linterSettings, errors);

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
      deprecatedMustBeSet.rule(demos, options, linterSettings, errors);

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
      deprecatedMustBeSet.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([]);
    });

    describe('Description inside component', () => {
      test('Catches the missing key', () => {
        const demos = {
          [demoName]: {
            component: {}
          }
        };
        deprecatedMustBeSet.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .toHaveBeenCalledWith(message);

        expect(errors)
          .toEqual([demoName]);
      });

      test('Fails if key is empty string', () => {
        const demos = {
          [demoName]: {
            component: {
              [key]: ''
            }
          }
        };
        deprecatedMustBeSet.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .toHaveBeenCalledWith(message);

        expect(errors)
          .toEqual([demoName]);
      });

      test('Passes when key is string', () => {
        const demos = {
          [demoName]: {
            component: {
              [key]: 'text'
            }
          }
        };
        deprecatedMustBeSet.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([]);
      });

      test('Passes when key is explicitly set to undefined', () => {
        const demos = {
          [demoName]: {
            component: {
              [key]: undefined
            }
          }
        };
        deprecatedMustBeSet.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([]);
      });

      test('Passes when key is a component', () => {
        const demos = {
          [demoName]: {
            component: {
              [key]: DoxenButton
            }
          }
        };
        deprecatedMustBeSet.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([]);
      });
    });
  });

  test('Documentation', () => {
    expect(validateRuleDocumentation(deprecatedMustBeSet))
      .toEqual(true);
  });
});
