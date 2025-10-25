import { allPropsMustHaveExample } from '@/linter/rules/demos/allPropsMustHave/example.js';

describe('Props must have an example', () => {
  const consoleInfo = console.info;
  const demoName = 'MyComponent';
  const propName = 'myProp';
  let options;
  let linterSettings;
  let errors;

  beforeEach(() => {
    console.info = vi.fn();
    options = {};
    linterSettings = {
      demos: {
        allPropsMustHave: {
          example: true
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
        test('Catches the missing example', () => {
          const demos = {
            [demoName]: {
              props: {
                [propName]: {}
              }
            }
          };
          allPropsMustHaveExample.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .toHaveBeenCalledWith('The ' + demoName + ' prop ' + propName + ' must have an example.');

          expect(errors)
            .toEqual([demoName]);
        });

        test('Passes when example provided', () => {
          const demos = {
            [demoName]: {
              props: {
                [propName]: {
                  example: 'Text'
                }
              }
            }
          };
          allPropsMustHaveExample.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Passes when example is explicitly set to undefined', () => {
          const demos = {
            [demoName]: {
              props: {
                [propName]: {
                  example: undefined
                }
              }
            }
          };
          allPropsMustHaveExample.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });
      });

      describe('PropsToDemo', () => {
        test('Catches missing prop example', () => {
          const demos = {
            [demoName]: {
              propsToDemo: {
                [propName]: {}
              }
            }
          };
          allPropsMustHaveExample.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .toHaveBeenCalledWith('The ' + demoName + ' prop ' + propName + ' must have an example.');

          expect(errors)
            .toEqual([demoName]);
        });

        test('Passes when example provided', () => {
          const demos = {
            [demoName]: {
              propsToDemo: {
                [propName]: {
                  example: 'Text'
                }
              }
            }
          };
          allPropsMustHaveExample.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Passes when example is explicitly set to undefined', () => {
          const demos = {
            [demoName]: {
              propsToDemo: {
                [propName]: {
                  example: undefined
                }
              }
            }
          };
          allPropsMustHaveExample.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });
      });

      describe('Example inside component', () => {
        describe('Props', () => {
          test('Catches the missing example', () => {
            const demos = {
              [demoName]: {
                component: {
                  props: {
                    [propName]: {}
                  }
                }
              }
            };
            allPropsMustHaveExample.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .toHaveBeenCalledWith('The ' + demoName + ' prop ' + propName + ' must have an example.');

            expect(errors)
              .toEqual([demoName]);
          });

          test('Passes when example provided', () => {
            const demos = {
              [demoName]: {
                component: {
                  props: {
                    [propName]: {
                      example: 'Text'
                    }
                  }
                }
              }
            };
            allPropsMustHaveExample.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });

          test('Passes when example is explicitly set to undefined', () => {
            const demos = {
              [demoName]: {
                component: {
                  props: {
                    [propName]: {
                      example: undefined
                    }
                  }
                }
              }
            };
            allPropsMustHaveExample.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });
        });

        describe('PropsToDemo', () => {
          test('Catches missing prop example', () => {
            const demos = {
              [demoName]: {
                component: {
                  propsToDemo: {
                    [propName]: {}
                  }
                }
              }
            };
            allPropsMustHaveExample.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .toHaveBeenCalledWith('The ' + demoName + ' prop ' + propName + ' must have an example.');

            expect(errors)
              .toEqual([demoName]);
          });

          test('Passes when example provided', () => {
            const demos = {
              [demoName]: {
                component: {
                  propsToDemo: {
                    [propName]: {
                      example: 'Text'
                    }
                  }
                }
              }
            };
            allPropsMustHaveExample.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });

          test('Passes when example is explicitly set to undefined', () => {
            const demos = {
              [demoName]: {
                component: {
                  propsToDemo: {
                    [propName]: {
                      example: undefined
                    }
                  }
                }
              }
            };
            allPropsMustHaveExample.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });
        });
      });
    });

    describe('Props and propsToDemo as arrays', () => {
      test('Catches the missing example', () => {
        const demos = {
          [demoName]: {
            props: [propName]
          }
        };
        allPropsMustHaveExample.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .toHaveBeenCalledWith('The ' + demoName + ' prop ' + propName + ' must have an example.');

        expect(errors)
          .toEqual([demoName]);
      });

      test('Catches missing prop from propsToDemo', () => {
        const demos = {
          [demoName]: {
            propsToDemo: [propName]
          }
        };
        allPropsMustHaveExample.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .toHaveBeenCalledWith('The ' + demoName + ' prop ' + propName + ' must have an example.');

        expect(errors)
          .toEqual([demoName]);
      });

      describe('Inside component', () => {
        test('Catches the missing example', () => {
          const demos = {
            [demoName]: {
              component: {
                props: [propName]
              }
            }
          };
          allPropsMustHaveExample.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .toHaveBeenCalledWith('The ' + demoName + ' prop ' + propName + ' must have an example.');

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
          allPropsMustHaveExample.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .toHaveBeenCalledWith('The ' + demoName + ' prop ' + propName + ' must have an example.');

          expect(errors)
            .toEqual([demoName]);
        });
      });
    });
  });

  test('Documentation', () => {
    expect(!!allPropsMustHaveExample.description)
      .toEqual(true);

    expect(!!allPropsMustHaveExample.url)
      .toEqual(true);

    expect(!!Object.keys(allPropsMustHaveExample.examples).length)
      .toEqual(true);
  });
});
