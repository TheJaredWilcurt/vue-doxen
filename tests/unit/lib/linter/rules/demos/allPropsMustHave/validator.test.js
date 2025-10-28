import { validateRuleDocumentation } from '@/linter/helpers.js';
import { allPropsMustHaveValidator } from '@/linter/rules/demos/allPropsMustHave/validator.js';

describe('Props must have validator set', () => {
  const consoleInfo = console.info;
  const demoName = 'MyComponent';
  const propName = 'myProp';
  const key = 'validator';
  const message = 'The ' + demoName + ' prop ' + propName + ' must have a validator function (can be set to undefined).';
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
        const propsOrPropsToDemo = 'props';

        test('Catches the missing key', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {}
              }
            }
          };
          allPropsMustHaveValidator.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .toHaveBeenCalledWith(message);

          expect(errors)
            .toEqual([demoName]);
        });

        test('Passes when key is set', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  [key]: function (value) {
                    return value;
                  }
                }
              }
            }
          };
          allPropsMustHaveValidator.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Passes when key is undefined', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  [key]: undefined
                }
              }
            }
          };
          allPropsMustHaveValidator.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Fails when key is wrong type', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  [key]: 22
                }
              }
            }
          };
          allPropsMustHaveValidator.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .toHaveBeenCalledWith(message);

          expect(errors)
            .toEqual([demoName]);
        });
      });

      describe('PropsToDemo', () => {
        const propsOrPropsToDemo = 'propsToDemo';

        test('Catches the missing key', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {}
              }
            }
          };
          allPropsMustHaveValidator.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .toHaveBeenCalledWith(message);

          expect(errors)
            .toEqual([demoName]);
        });

        test('Passes when key is set', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  [key]: function (value) {
                    return value;
                  }
                }
              }
            }
          };
          allPropsMustHaveValidator.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Passes when key is undefined', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  [key]: undefined
                }
              }
            }
          };
          allPropsMustHaveValidator.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Fails when key is wrong type', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  [key]: 22
                }
              }
            }
          };
          allPropsMustHaveValidator.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .toHaveBeenCalledWith(message);

          expect(errors)
            .toEqual([demoName]);
        });
      });

      describe('Key inside component', () => {
        describe('Props', () => {
          const propsOrPropsToDemo = 'props';

          test('Catches the missing key', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {}
                  }
                }
              }
            };
            allPropsMustHaveValidator.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .toHaveBeenCalledWith(message);

            expect(errors)
              .toEqual([demoName]);
          });

          test('Passes when key is set', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      [key]: function (value) {
                        return value;
                      }
                    }
                  }
                }
              }
            };
            allPropsMustHaveValidator.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });

          test('Passes when key is undefined', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      [key]: undefined
                    }
                  }
                }
              }
            };
            allPropsMustHaveValidator.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });

          test('Fails when key is wrong type', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      [key]: 22
                    }
                  }
                }
              }
            };
            allPropsMustHaveValidator.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .toHaveBeenCalledWith(message);

            expect(errors)
              .toEqual([demoName]);
          });
        });

        describe('PropsToDemo', () => {
          const propsOrPropsToDemo = 'propsToDemo';

          test('Catches the missing key', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {}
                  }
                }
              }
            };
            allPropsMustHaveValidator.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .toHaveBeenCalledWith(message);

            expect(errors)
              .toEqual([demoName]);
          });

          test('Passes when key is set', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      [key]: function (value) {
                        return value;
                      }
                    }
                  }
                }
              }
            };
            allPropsMustHaveValidator.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });

          test('Passes when key is undefined', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      [key]: undefined
                    }
                  }
                }
              }
            };
            allPropsMustHaveValidator.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });

          test('Fails when key is wrong type', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      [key]: 22
                    }
                  }
                }
              }
            };
            allPropsMustHaveValidator.rule(demos, options, linterSettings, errors);

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
        allPropsMustHaveValidator.rule(demos, options, linterSettings, errors);

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
        allPropsMustHaveValidator.rule(demos, options, linterSettings, errors);

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
          allPropsMustHaveValidator.rule(demos, options, linterSettings, errors);

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
          allPropsMustHaveValidator.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .toHaveBeenCalledWith(message);

          expect(errors)
            .toEqual([demoName]);
        });
      });
    });
  });

  test('Documentation', () => {
    expect(validateRuleDocumentation(allPropsMustHaveValidator))
      .toEqual(true);
  });
});
