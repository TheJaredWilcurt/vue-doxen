import { validateRuleDocumentation } from '@/linter/helpers.js';
import { componentMustBeNamed } from '@/linter/rules/demos/componentMustBeNamed.js';

describe('Components must have a name', () => {
  const consoleInfo = console.info;
  const ruleName = componentMustBeNamed.title;
  const demoName = 'MyComponent';
  const key = 'name';
  const message = 'The ' + demoName + ' demo must have a component name.';
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
        componentMustBeNamed: true
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
      componentMustBeNamed.rule(demos, options, linterSettings, errors);

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
      componentMustBeNamed.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([ERROR]);
    });

    test('Passes when key is string', () => {
      const demos = {
        [demoName]: {
          [key]: demoName
        }
      };
      componentMustBeNamed.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([]);
    });

    describe('Inside component', () => {
      test('Catches the missing key', () => {
        const demos = {
          [demoName]: {
            component: {}
          }
        };
        componentMustBeNamed.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([ERROR]);
      });

      test('Fails when key is undefined', () => {
        const demos = {
          [demoName]: {
            component: {
              [key]: undefined
            }
          }
        };
        componentMustBeNamed.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([ERROR]);
      });

      test('Passes when key is string', () => {
        const demos = {
          [demoName]: {
            component: {
              [key]: demoName
            }
          }
        };
        componentMustBeNamed.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([]);
      });
    });
  });

  test('Documentation', () => {
    expect(validateRuleDocumentation(componentMustBeNamed))
      .toEqual(true);
  });
});
