import { allEmitsMustHaveDescription } from '@/linter/rules/demos/allEmitsMustHave/description.js';

describe('Emits must have a description', () => {
  const consoleInfo = console.info;
  const demoName = 'MyComponent';
  const emitName = 'myEmit';
  let options;
  let linterSettings;
  let errors;

  beforeEach(() => {
    console.info = vi.fn();
    options = {};
    linterSettings = {
      demos: {
        allEmitsMustHave: {
          description: true
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
          .toHaveBeenCalledWith('The ' + demoName + ' emit ' + emitName + ' must have a description.');

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
          .toHaveBeenCalledWith('The ' + demoName + ' emit ' + emitName + ' must have a description.');

        expect(errors)
          .toEqual([demoName]);
      });

      test('Passes when description provided', () => {
        const demos = {
          [demoName]: {
            emitsToDemo: {
              [emitName]: {
                description: 'Text'
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
                description: undefined
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
            .toHaveBeenCalledWith('The ' + demoName + ' emit ' + emitName + ' must have a description.');

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
            .toHaveBeenCalledWith('The ' + demoName + ' emit ' + emitName + ' must have a description.');

          expect(errors)
            .toEqual([demoName]);
        });

        test('Passes when description provided', () => {
          const demos = {
            [demoName]: {
              component: {
                emitsToDemo: {
                  [emitName]: {
                    description: 'Text'
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
                    description: undefined
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
      test('Catches the missing description', () => {
        const demos = {
          [demoName]: {
            emitsToDemo: [emitName]
          }
        };
        allEmitsMustHaveDescription.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .toHaveBeenCalledWith('The ' + demoName + ' emit ' + emitName + ' must have a description.');

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
          .toHaveBeenCalledWith('The ' + demoName + ' emit ' + emitName + ' must have a description.');

        expect(errors)
          .toEqual([demoName]);
      });

      describe('Description inside component', () => {
        test('Catches the missing description', () => {
          const demos = {
            [demoName]: {
              component: {
                emitsToDemo: [emitName]
              }
            }
          };
          allEmitsMustHaveDescription.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .toHaveBeenCalledWith('The ' + demoName + ' emit ' + emitName + ' must have a description.');

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
            .toHaveBeenCalledWith('The ' + demoName + ' emit ' + emitName + ' must have a description.');

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
