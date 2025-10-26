import { allEmitsMustHaveDescription } from '@/linter/rules/demos/allEmitsMustHave/description.js';

describe('Emits must have a description', () => {
  const consoleInfo = console.info;
  const demoName = 'MyComponent';
  const emitName = 'myEmit';
  const key = 'description';
  const message = 'The ' + demoName + ' emit ' + emitName + ' must have a description.';
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
      test('Catches the missing description', () => {
        const demos = {
          [demoName]: {
            emitsToDemo: {
              [emitName]: {}
            }
          }
        };
        allEmitsMustHaveDescription.rule(demos, options, linterSettings, errors);

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
        allEmitsMustHaveDescription.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .toHaveBeenCalledWith(message);

        expect(errors)
          .toEqual([demoName]);
      });

      test('Passes when description provided', () => {
        const demos = {
          [demoName]: {
            emitsToDemo: {
              [emitName]: {
                [key]: 'Text'
              }
            }
          }
        };
        allEmitsMustHaveDescription.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([]);
      });

      test('Passes when description is explicitly set to undefined', () => {
        const demos = {
          [demoName]: {
            emitsToDemo: {
              [emitName]: {
                [key]: undefined
              }
            }
          }
        };
        allEmitsMustHaveDescription.rule(demos, options, linterSettings, errors);

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
                emitsToDemo: {
                  [emitName]: {}
                }
              }
            }
          };
          allEmitsMustHaveDescription.rule(demos, options, linterSettings, errors);

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
          allEmitsMustHaveDescription.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .toHaveBeenCalledWith(message);

          expect(errors)
            .toEqual([demoName]);
        });

        test('Passes when description provided', () => {
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
          allEmitsMustHaveDescription.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Passes when description is explicitly set to undefined', () => {
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
          allEmitsMustHaveDescription.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });
      });
    });

    describe('Emits and emitsToDemo as arrays', () => {
      test('Catches the missing key', () => {
        const demos = {
          [demoName]: {
            emitsToDemo: [emitName]
          }
        };
        allEmitsMustHaveDescription.rule(demos, options, linterSettings, errors);

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
        allEmitsMustHaveDescription.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .toHaveBeenCalledWith(message);

        expect(errors)
          .toEqual([demoName]);
      });

      describe('Description inside component', () => {
        test('Catches the missing key', () => {
          const demos = {
            [demoName]: {
              component: {
                emitsToDemo: [emitName]
              }
            }
          };
          allEmitsMustHaveDescription.rule(demos, options, linterSettings, errors);

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
          allEmitsMustHaveDescription.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .toHaveBeenCalledWith(message);

          expect(errors)
            .toEqual([demoName]);
        });
      });
    });
  });

  test('Documentation', () => {
    expect(!!allEmitsMustHaveDescription.description)
      .toEqual(true);

    expect(!!allEmitsMustHaveDescription.url)
      .toEqual(true);

    expect(!!Object.keys(allEmitsMustHaveDescription.examples).length)
      .toEqual(true);
  });
});
