import { allPropsMustHaveDescription } from '@/linter/rules/demos/allPropsMustHave/description.js';

describe('Props must have a description', () => {
  const consoleInfo = console.info;
  const demoName = 'MyComponent';
  const propName = 'myProp';
  const key = 'description';
  const message = 'The ' + demoName + ' prop ' + propName + ' must have a description.';
  let options;
  let linterSettings;
  let errors;

  beforeEach(() => {
    console.info = vi.fn();
    options = {};
    linterSettings = {
      demos: {
        allPropsMustHave: {
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
    describe('Props and propsToDemo as objects', () => {
      describe('Props', () => {
        test('Catches the missing description', () => {
          const demos = {
            [demoName]: {
              props: {
                [propName]: {}
              }
            }
          };
          allPropsMustHaveDescription.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .toHaveBeenCalledWith(message);

          expect(errors)
            .toEqual([demoName]);
        });

        test('Passes when description provided', () => {
          const demos = {
            [demoName]: {
              props: {
                [propName]: {
                  [key]: 'Text'
                }
              }
            }
          };
          allPropsMustHaveDescription.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Passes when description is explicitly set to undefined', () => {
          const demos = {
            [demoName]: {
              props: {
                [propName]: {
                  [key]: undefined
                }
              }
            }
          };
          allPropsMustHaveDescription.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });
      });

      describe('PropsToDemo', () => {
        test('Catches missing prop description', () => {
          const demos = {
            [demoName]: {
              propsToDemo: {
                [propName]: {}
              }
            }
          };
          allPropsMustHaveDescription.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .toHaveBeenCalledWith(message);

          expect(errors)
            .toEqual([demoName]);
        });

        test('Passes when description provided', () => {
          const demos = {
            [demoName]: {
              propsToDemo: {
                [propName]: {
                  [key]: 'Text'
                }
              }
            }
          };
          allPropsMustHaveDescription.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Passes when description is explicitly set to undefined', () => {
          const demos = {
            [demoName]: {
              propsToDemo: {
                [propName]: {
                  [key]: undefined
                }
              }
            }
          };
          allPropsMustHaveDescription.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });
      });

      describe('Description inside component', () => {
        describe('Props', () => {
          test('Catches the missing description', () => {
            const demos = {
              [demoName]: {
                component: {
                  props: {
                    [propName]: {}
                  }
                }
              }
            };
            allPropsMustHaveDescription.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .toHaveBeenCalledWith(message);

            expect(errors)
              .toEqual([demoName]);
          });

          test('Passes when description provided', () => {
            const demos = {
              [demoName]: {
                component: {
                  props: {
                    [propName]: {
                      [key]: 'Text'
                    }
                  }
                }
              }
            };
            allPropsMustHaveDescription.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });

          test('Passes when description is explicitly set to undefined', () => {
            const demos = {
              [demoName]: {
                component: {
                  props: {
                    [propName]: {
                      [key]: undefined
                    }
                  }
                }
              }
            };
            allPropsMustHaveDescription.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });
        });

        describe('PropsToDemo', () => {
          test('Catches missing prop description', () => {
            const demos = {
              [demoName]: {
                component: {
                  propsToDemo: {
                    [propName]: {}
                  }
                }
              }
            };
            allPropsMustHaveDescription.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .toHaveBeenCalledWith(message);

            expect(errors)
              .toEqual([demoName]);
          });

          test('Passes when description provided', () => {
            const demos = {
              [demoName]: {
                component: {
                  propsToDemo: {
                    [propName]: {
                      [key]: 'Text'
                    }
                  }
                }
              }
            };
            allPropsMustHaveDescription.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });

          test('Passes when description is explicitly set to undefined', () => {
            const demos = {
              [demoName]: {
                component: {
                  propsToDemo: {
                    [propName]: {
                      [key]: undefined
                    }
                  }
                }
              }
            };
            allPropsMustHaveDescription.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });
        });
      });
    });

    describe('Props and propsToDemo as arrays', () => {
      test('Catches the missing prop', () => {
        const demos = {
          [demoName]: {
            props: [propName]
          }
        };
        allPropsMustHaveDescription.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .toHaveBeenCalledWith(message);

        expect(errors)
          .toEqual([demoName]);
      });

      test('Catches missing prop from propsToDemo', () => {
        const demos = {
          [demoName]: {
            propsToDemo: [propName]
          }
        };
        allPropsMustHaveDescription.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .toHaveBeenCalledWith(message);

        expect(errors)
          .toEqual([demoName]);
      });

      describe('Inside component', () => {
        test('Catches the missing prop', () => {
          const demos = {
            [demoName]: {
              component: {
                props: [propName]
              }
            }
          };
          allPropsMustHaveDescription.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .toHaveBeenCalledWith(message);

          expect(errors)
            .toEqual([demoName]);
        });

        test('Catches missing prop from propsToDemo', () => {
          const demos = {
            [demoName]: {
              component: {
                propsToDemo: [propName]
              }
            }
          };
          allPropsMustHaveDescription.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .toHaveBeenCalledWith(message);

          expect(errors)
            .toEqual([demoName]);
        });
      });
    });
  });

  test('Documentation', () => {
    expect(!!allPropsMustHaveDescription.description)
      .toEqual(true);

    expect(!!allPropsMustHaveDescription.url)
      .toEqual(true);

    expect(!!Object.keys(allPropsMustHaveDescription.examples).length)
      .toEqual(true);
  });
});
