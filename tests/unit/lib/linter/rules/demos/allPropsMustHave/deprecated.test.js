import { allPropsMustHaveDeprecated } from '@/linter/rules/demos/allPropsMustHave/deprecated.js';

describe('Props must have deprecated set to true or false', () => {
  const consoleInfo = console.info;
  const demoName = 'MyComponent';
  const propName = 'myProp';
  const key = 'deprecated';
  const message = 'The ' + demoName + ' prop ' + propName + ' must have deprecated set to true or false.';
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
            .toHaveBeenCalledWith(message);

          expect(errors)
            .toEqual([demoName]);
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
            .toHaveBeenCalledWith(message);

          expect(errors)
            .toEqual([demoName]);
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
            .toHaveBeenCalledWith(message);

          expect(errors)
            .toEqual([demoName]);
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
            .toHaveBeenCalledWith(message);

          expect(errors)
            .toEqual([demoName]);
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
              .toHaveBeenCalledWith(message);

            expect(errors)
              .toEqual([demoName]);
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
              .toHaveBeenCalledWith(message);

            expect(errors)
              .toEqual([demoName]);
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
              .toHaveBeenCalledWith(message);

            expect(errors)
              .toEqual([demoName]);
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
              .toHaveBeenCalledWith(message);

            expect(errors)
              .toEqual([demoName]);
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
        allPropsMustHaveDeprecated.rule(demos, options, linterSettings, errors);

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
          allPropsMustHaveDeprecated.rule(demos, options, linterSettings, errors);

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
          allPropsMustHaveDeprecated.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .toHaveBeenCalledWith(message);

          expect(errors)
            .toEqual([demoName]);
        });
      });
    });
  });

  test('Documentation', () => {
    expect(!!allPropsMustHaveDeprecated.description)
      .toEqual(true);

    expect(!!allPropsMustHaveDeprecated.url)
      .toEqual(true);

    expect(!!Object.keys(allPropsMustHaveDeprecated.examples).length)
      .toEqual(true);
  });
});
