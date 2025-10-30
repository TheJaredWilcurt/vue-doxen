import { validateRuleDocumentation } from '@/linter/helpers.js';
import { descriptionMustEndInPeriod } from '@/linter/rules/demos/descriptionMustEndInPeriod.js';

import DoxenButton from '@/components/DoxenButton.vue';

describe('Description must end in period', () => {
  const consoleInfo = console.info;
  const demoName = 'MyComponent';
  const key = 'description';
  const message = 'The ' + demoName + ' demo\'s description must end in a period.';
  let options;
  let linterSettings;
  let errors;

  beforeEach(() => {
    console.info = vi.fn();
    options = {};
    linterSettings = {
      demos: {
        descriptionMustEndInPeriod: true
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
      descriptionMustEndInPeriod.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .toHaveBeenCalledWith(message);

      expect(errors)
        .toEqual([demoName]);
    });

    test('Passes when key is undefined', () => {
      const demos = {
        [demoName]: {
          [key]: undefined
        }
      };
      descriptionMustEndInPeriod.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([]);
    });

    test('Passes when key is string ending in period', () => {
      const demos = {
        [demoName]: {
          [key]: 'Text.'
        }
      };
      descriptionMustEndInPeriod.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([]);
    });

    test('Passes when key is string ending in period surrounded by markup', () => {
      const demos = {
        [demoName]: {
          [key]: '<p><span class="text"><strong>\n  Text.\n</strong></span></p>'
        }
      };
      descriptionMustEndInPeriod.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([]);
    });

    test('Passes when key is component', () => {
      const demos = {
        [demoName]: {
          [key]: DoxenButton
        }
      };
      descriptionMustEndInPeriod.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([]);
    });

    test('Fails when key is string not ending in period', () => {
      const demos = {
        [demoName]: {
          [key]: 'Text'
        }
      };
      descriptionMustEndInPeriod.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .toHaveBeenCalledWith(message);

      expect(errors)
        .toEqual([demoName]);
    });

    describe('Inside component', () => {
      test('Catches the missing key', () => {
        const demos = {
          [demoName]: {
            component: {}
          }
        };
        descriptionMustEndInPeriod.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .toHaveBeenCalledWith(message);

        expect(errors)
          .toEqual([demoName]);
      });

      test('Passes when key is undefined', () => {
        const demos = {
          [demoName]: {
            component: {
              [key]: undefined
            }
          }
        };
        descriptionMustEndInPeriod.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([]);
      });

      test('Passes when key is string ending in period', () => {
        const demos = {
          [demoName]: {
            component: {
              [key]: 'Text.'
            }
          }
        };
        descriptionMustEndInPeriod.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([]);
      });

      test('Passes when key is string ending in period surrounded by markup', () => {
        const demos = {
          [demoName]: {
            component: {
              [key]: '<p><span class="text"><strong>\n  Text.\n</strong></span></p>'
            }
          }
        };
        descriptionMustEndInPeriod.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([]);
      });

      test('Passes when key is component', () => {
        const demos = {
          [demoName]: {
            component: {
              [key]: DoxenButton
            }
          }
        };
        descriptionMustEndInPeriod.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([]);
      });

      test('Fails when key is string not ending in period', () => {
        const demos = {
          [demoName]: {
            component: {
              [key]: 'Text'
            }
          }
        };
        descriptionMustEndInPeriod.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .toHaveBeenCalledWith(message);

        expect(errors)
          .toEqual([demoName]);
      });
    });
  });

  test('Documentation', () => {
    expect(validateRuleDocumentation(descriptionMustEndInPeriod))
      .toEqual(true);
  });
});
