import { mustHaveDescription } from '@/linter/rules/demos/mustHaveDescription.js';

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
    test('Catches the missing description', () => {
      const demos = {
        [demoName]: {}
      };
      mustHaveDescription.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .toHaveBeenCalledWith(message);

      expect(errors)
        .toEqual([demoName]);
    });

    test('Passes when description is string', () => {
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

    test('Passes when description is explicitly set to undefined', () => {
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

    test('Passes when description is a component', () => {
      const demos = {
        [demoName]: {
          [key]: {
            name: demoName
          }
        }
      };
      mustHaveDescription.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([]);
    });

    describe('Description inside component', () => {
      test('Catches the missing description', () => {
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

      test('Passes when description is string', () => {
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

      test('Passes when description is explicitly set to undefined', () => {
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

      test('Passes when description is a component', () => {
        const demos = {
          [demoName]: {
            component: {
              name: demoName,
              [key]: {
                name: demoName
              }
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
    expect(!!mustHaveDescription.description)
      .toEqual(true);

    expect(!!mustHaveDescription.url)
      .toEqual(true);

    expect(!!Object.keys(mustHaveDescription.examples).length)
      .toEqual(true);
  });
});
