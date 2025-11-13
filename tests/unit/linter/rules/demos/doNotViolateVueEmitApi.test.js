import { doNotViolateVueEmitApi } from '@@@@/rules/demos/doNotViolateVueEmitApi.js';

describe('Components must not violate Vue\'s emits API', () => {
  const consoleInfo = console.info;
  const ruleName = doNotViolateVueEmitApi.title;
  const demoName = 'MyComponent';
  const key = 'emits';
  const message = 'The ' + demoName + ' emit violates Vue\'s official API.';
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
        doNotViolateVueEmitApi: true
      }
    };
    errors = [];
  });

  afterEach(() => {
    console.info = consoleInfo;
  });

  describe('Rule', () => {
    test('Fails when emit array contains non-strings', () => {
      const demos = {
        [demoName]: {
          [key]: [2]
        }
      };
      doNotViolateVueEmitApi.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([ERROR]);
    });

    test('Fails when emit object contains something other than null, undefined, or functions', () => {
      const demos = {
        [demoName]: {
          emits: {
            foo: {}
          }
        }
      };
      doNotViolateVueEmitApi.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([ERROR]);
    });

    test('Passes when key is missing', () => {
      const demos = {
        [demoName]: {}
      };
      doNotViolateVueEmitApi.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([]);
    });

    test('Passes when key is undefined', () => {
      const demos = {
        [demoName]: {
          [key]: undefined
        }
      };
      doNotViolateVueEmitApi.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([]);
    });

    test('Passes when key is array of strings', () => {
      const demos = {
        [demoName]: {
          [key]: ['foo', 'bar']
        }
      };
      doNotViolateVueEmitApi.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([]);
    });

    test('Passes when key is object of null', () => {
      const demos = {
        [demoName]: {
          [key]: {
            foo: null
          }
        }
      };
      doNotViolateVueEmitApi.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([]);
    });

    test('Passes when key is object of undefined', () => {
      const demos = {
        [demoName]: {
          [key]: {
            foo: undefined
          }
        }
      };
      doNotViolateVueEmitApi.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([]);
    });

    test('Passes when key is object of functions', () => {
      const demos = {
        [demoName]: {
          [key]: {
            foo: function () {}
          }
        }
      };
      doNotViolateVueEmitApi.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([]);
    });

    describe('In component', () => {
      test('Fails when emit array contains non-strings', () => {
        const demos = {
          [demoName]: {
            component: {
              emits: [2]
            }
          }
        };
        doNotViolateVueEmitApi.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([ERROR]);
      });

      test('Fails when emit object contains something other than null, undefined, or functions', () => {
        const demos = {
          [demoName]: {
            component: {
              emits: {
                foo: {}
              }
            }
          }
        };
        doNotViolateVueEmitApi.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([ERROR]);
      });

      test('Passes when key is missing', () => {
        const demos = {
          [demoName]: {
            component: {}
          }
        };
        doNotViolateVueEmitApi.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([]);
      });

      test('Passes when key is undefined', () => {
        const demos = {
          [demoName]: {
            component: {
              [key]: undefined
            }
          }
        };
        doNotViolateVueEmitApi.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([]);
      });

      test('Passes when key is array of strings', () => {
        const demos = {
          [demoName]: {
            component: {
              [key]: ['foo', 'bar']
            }
          }
        };
        doNotViolateVueEmitApi.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([]);
      });

      test('Passes when key is object of null', () => {
        const demos = {
          [demoName]: {
            component: {
              [key]: {
                foo: null
              }
            }
          }
        };
        doNotViolateVueEmitApi.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([]);
      });

      test('Passes when key is object of undefined', () => {
        const demos = {
          [demoName]: {
            component: {
              [key]: {
                foo: undefined
              }
            }
          }
        };
        doNotViolateVueEmitApi.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([]);
      });

      test('Passes when key is object of functions', () => {
        const demos = {
          [demoName]: {
            component: {
              [key]: {
                foo: function () {}
              }
            }
          }
        };
        doNotViolateVueEmitApi.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([]);
      });
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

    expect(validateRuleDocumentation(doNotViolateVueEmitApi))
      .toEqual(true);
  });
});
