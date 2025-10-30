import { validateRuleDocumentation } from '@/linter/helpers.js';
import { allEmitsMustHaveValue } from '@/linter/rules/demos/allEmitsMustHave/value.js';

describe('Emits must have a value defined', () => {
  const consoleInfo = console.info;
  const demoName = 'MyComponent';
  const emitName = 'myEmit';
  const key = 'value';
  const message = 'The ' + demoName + ' emit ' + emitName + ' must have a value defined.';
  let options;
  let linterSettings;
  let errors;

  beforeEach(() => {
    console.info = vi.fn();
    options = {};
    linterSettings = {
      demos: {
        allEmitsMustHave: {
          [key]: true
        }
      }
    };
    errors = [];
  });

  afterEach(() => {
    console.info = consoleInfo;
  });

  describe('Rule', () => {
    describe('Emits and emitsToDemo as objects', () => {
      test('Catches the missing value', () => {
        const demos = {
          [demoName]: {
            emitsToDemo: {
              [emitName]: {}
            }
          }
        };
        allEmitsMustHaveValue.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .toHaveBeenCalledWith(message);

        expect(errors)
          .toEqual([demoName]);
      });

      test('Catches missing emit from emitstoDemo', () => {
        const demos = {
          [demoName]: {
            emits: {
              [emitName]: {}
            }
          }
        };
        allEmitsMustHaveValue.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .toHaveBeenCalledWith(message);

        expect(errors)
          .toEqual([demoName]);
      });

      test('Passes when value provided', () => {
        const demos = {
          [demoName]: {
            emitsToDemo: {
              [emitName]: {
                [key]: 'Text'
              }
            }
          }
        };
        allEmitsMustHaveValue.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([]);
      });

      test('Passes when value is explicitly set to undefined', () => {
        const demos = {
          [demoName]: {
            emitsToDemo: {
              [emitName]: {
                [key]: undefined
              }
            }
          }
        };
        allEmitsMustHaveValue.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([]);
      });

      describe('Description inside component', () => {
        test('Catches the missing value', () => {
          const demos = {
            [demoName]: {
              component: {
                emitsToDemo: {
                  [emitName]: {}
                }
              }
            }
          };
          allEmitsMustHaveValue.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .toHaveBeenCalledWith(message);

          expect(errors)
            .toEqual([demoName]);
        });

        test('Catches missing emit from emitstoDemo', () => {
          const demos = {
            [demoName]: {
              component: {
                emits: {
                  [emitName]: {}
                }
              }
            }
          };
          allEmitsMustHaveValue.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .toHaveBeenCalledWith(message);

          expect(errors)
            .toEqual([demoName]);
        });

        test('Passes when value provided', () => {
          const demos = {
            [demoName]: {
              component: {
                emitsToDemo: {
                  [emitName]: {
                    [key]: 'Text'
                  }
                }
              }
            }
          };
          allEmitsMustHaveValue.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Passes when value is explicitly set to undefined', () => {
          const demos = {
            [demoName]: {
              component: {
                emitsToDemo: {
                  [emitName]: {
                    [key]: undefined
                  }
                }
              }
            }
          };
          allEmitsMustHaveValue.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });
      });
    });

    describe('Emits and emitsToDemo as arrays', () => {
      test('Catches the missing prop', () => {
        const demos = {
          [demoName]: {
            emitsToDemo: [emitName]
          }
        };
        allEmitsMustHaveValue.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .toHaveBeenCalledWith(message);

        expect(errors)
          .toEqual([demoName]);
      });

      test('Catches missing emit from emitstoDemo', () => {
        const demos = {
          [demoName]: {
            emits: [emitName]
          }
        };
        allEmitsMustHaveValue.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .toHaveBeenCalledWith(message);

        expect(errors)
          .toEqual([demoName]);
      });

      describe('Description inside component', () => {
        test('Catches the missing prop', () => {
          const demos = {
            [demoName]: {
              component: {
                emitsToDemo: [emitName]
              }
            }
          };
          allEmitsMustHaveValue.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .toHaveBeenCalledWith(message);

          expect(errors)
            .toEqual([demoName]);
        });

        test('Catches missing emit from emitstoDemo', () => {
          const demos = {
            [demoName]: {
              component: {
                emits: [emitName]
              }
            }
          };
          allEmitsMustHaveValue.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .toHaveBeenCalledWith(message);

          expect(errors)
            .toEqual([demoName]);
        });
      });
    });
  });

  test('Documentation', () => {
    expect(validateRuleDocumentation(allEmitsMustHaveValue))
      .toEqual(true);
  });
});
