import { validateRuleDocumentation } from '@@@@/helpers.js';
import { allPropsMustHaveDeprecated } from '@@@@/rules/demos/allPropsMustHave/deprecated.js';

describe('Props must have deprecated set to true or false', () => {
  const consoleInfo = console.info;
  const ruleName = allPropsMustHaveDeprecated.title;
  const demoName = 'MyComponent';
  const propName = 'myProp';
  const key = 'deprecated';
  const message = 'The ' + demoName + ' prop ' + propName + ' must have deprecated set to true or false.';
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
        test('Catches the missing deprecated', () => {
          const demos = {
            [demoName]: {
              props: {
                [propName]: {}
              }
            }
          };
          allPropsMustHaveDeprecated.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });

        test('Passes when deprecated is true', () => {
          const demos = {
            [demoName]: {
              props: {
                [propName]: {
                  [key]: true
                }
              }
            }
          };
          allPropsMustHaveDeprecated.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Passes when deprecated is false', () => {
          const demos = {
            [demoName]: {
              props: {
                [propName]: {
                  [key]: true
                }
              }
            }
          };
          allPropsMustHaveDeprecated.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Fails when deprecated is explicitly set to undefined', () => {
          const demos = {
            [demoName]: {
              props: {
                [propName]: {
                  [key]: undefined
                }
              }
            }
          };
          allPropsMustHaveDeprecated.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });
      });

      describe('PropsToDemo', () => {
        test('Catches the missing deprecated', () => {
          const demos = {
            [demoName]: {
              propsToDemo: {
                [propName]: {}
              }
            }
          };
          allPropsMustHaveDeprecated.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });

        test('Passes when deprecated is true', () => {
          const demos = {
            [demoName]: {
              propsToDemo: {
                [propName]: {
                  [key]: true
                }
              }
            }
          };
          allPropsMustHaveDeprecated.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Passes when deprecated is false', () => {
          const demos = {
            [demoName]: {
              propsToDemo: {
                [propName]: {
                  [key]: true
                }
              }
            }
          };
          allPropsMustHaveDeprecated.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Fails when deprecated is explicitly set to undefined', () => {
          const demos = {
            [demoName]: {
              propsToDemo: {
                [propName]: {
                  [key]: undefined
                }
              }
            }
          };
          allPropsMustHaveDeprecated.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });
      });

      describe('Deprecated inside component', () => {
        describe('Props', () => {
          test('Catches the missing deprecated', () => {
            const demos = {
              [demoName]: {
                component: {
                  props: {
                    [propName]: {}
                  }
                }
              }
            };
            allPropsMustHaveDeprecated.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([ERROR]);
          });

          test('Passes when deprecated is true', () => {
            const demos = {
              [demoName]: {
                component: {
                  props: {
                    [propName]: {
                      [key]: true
                    }
                  }
                }
              }
            };
            allPropsMustHaveDeprecated.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });

          test('Passes when deprecated is false', () => {
            const demos = {
              [demoName]: {
                component: {
                  props: {
                    [propName]: {
                      [key]: true
                    }
                  }
                }
              }
            };
            allPropsMustHaveDeprecated.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });

          test('Fails when deprecated is explicitly set to undefined', () => {
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
            allPropsMustHaveDeprecated.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([ERROR]);
          });
        });

        describe('PropsToDemo', () => {
          test('Catches the missing deprecated', () => {
            const demos = {
              [demoName]: {
                component: {
                  propsToDemo: {
                    [propName]: {}
                  }
                }
              }
            };
            allPropsMustHaveDeprecated.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([ERROR]);
          });

          test('Passes when deprecated is true', () => {
            const demos = {
              [demoName]: {
                component: {
                  propsToDemo: {
                    [propName]: {
                      [key]: true
                    }
                  }
                }
              }
            };
            allPropsMustHaveDeprecated.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });

          test('Passes when deprecated is false', () => {
            const demos = {
              [demoName]: {
                component: {
                  propsToDemo: {
                    [propName]: {
                      [key]: true
                    }
                  }
                }
              }
            };
            allPropsMustHaveDeprecated.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });

          test('Fails when deprecated is explicitly set to undefined', () => {
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
            allPropsMustHaveDeprecated.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([ERROR]);
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
        allPropsMustHaveDeprecated.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([ERROR]);
      });

      test('Catches missing prop from propsToDemo', () => {
        const demos = {
          [demoName]: {
            propsToDemo: [propName]
          }
        };
        allPropsMustHaveDeprecated.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([ERROR]);
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
          allPropsMustHaveDeprecated.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });

        test('Catches missing prop from propsToDemo', () => {
          const demos = {
            [demoName]: {
              component: {
                propsToDemo: [propName]
              }
            }
          };
          allPropsMustHaveDeprecated.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });
      });
    });
  });

  test('Documentation', () => {
    expect(validateRuleDocumentation(allPropsMustHaveDeprecated))
      .toEqual(true);
  });
});
