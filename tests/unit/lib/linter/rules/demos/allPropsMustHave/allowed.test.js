import { validateRuleDocumentation } from '@/linter/helpers.js';
import { allPropsMustHaveAllowed } from '@/linter/rules/demos/allPropsMustHave/allowed.js';

describe('Props must have allowed set', () => {
  const consoleInfo = console.info;
  const ruleName = allPropsMustHaveAllowed.title;
  const demoName = 'MyComponent';
  const propName = 'myProp';
  const key = 'allowed';
  const message = [
    'The',
    demoName,
    'prop',
    propName,
    'must have an allowed key set to undefined',
    'or an array of primitives.'
  ].join(' ');
  const ERROR = {
    ruleName,
    demoName,
    message
  };
  const ARRAY_OF_PRIMITIVES = Object.freeze([
    true,
    3,
    'text',
    null,
    undefined,
    BigInt(Number.MAX_SAFE_INTEGER),
    Symbol('s')
  ]);
  const ARRAY_OF_NON_PRIMITIVES = Object.freeze([
    {},
    [],
    new Set([]),
    new Date()
  ]);
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
        test('Catches the missing allowed', () => {
          const demos = {
            [demoName]: {
              props: {
                [propName]: {}
              }
            }
          };
          allPropsMustHaveAllowed.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });

        test('Passes when allowed is an empty array', () => {
          const demos = {
            [demoName]: {
              props: {
                [propName]: {
                  [key]: []
                }
              }
            }
          };
          allPropsMustHaveAllowed.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Passes when allowed is array of primitives', () => {
          const demos = {
            [demoName]: {
              props: {
                [propName]: {
                  [key]: ARRAY_OF_PRIMITIVES
                }
              }
            }
          };
          allPropsMustHaveAllowed.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Fails when allowed includes non-primitives', () => {
          const demos = {
            [demoName]: {
              props: {
                [propName]: {
                  [key]: ARRAY_OF_NON_PRIMITIVES
                }
              }
            }
          };
          allPropsMustHaveAllowed.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });

        test('Passes when allowed is explicitly set to undefined', () => {
          const demos = {
            [demoName]: {
              props: {
                [propName]: {
                  [key]: undefined
                }
              }
            }
          };
          allPropsMustHaveAllowed.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });
      });

      describe('PropsToDemo', () => {
        test('Catches the missing allowed', () => {
          const demos = {
            [demoName]: {
              propsToDemo: {
                [propName]: {}
              }
            }
          };
          allPropsMustHaveAllowed.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });

        test('Passes when allowed is an empty array', () => {
          const demos = {
            [demoName]: {
              propsToDemo: {
                [propName]: {
                  [key]: []
                }
              }
            }
          };
          allPropsMustHaveAllowed.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Passes when allowed is array of primitives', () => {
          const demos = {
            [demoName]: {
              propsToDemo: {
                [propName]: {
                  [key]: ARRAY_OF_PRIMITIVES
                }
              }
            }
          };
          allPropsMustHaveAllowed.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Fails when allowed includes non-primitives', () => {
          const demos = {
            [demoName]: {
              propsToDemo: {
                [propName]: {
                  [key]: ARRAY_OF_NON_PRIMITIVES
                }
              }
            }
          };
          allPropsMustHaveAllowed.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });

        test('Passes when allowed is explicitly set to undefined', () => {
          const demos = {
            [demoName]: {
              propsToDemo: {
                [propName]: {
                  [key]: undefined
                }
              }
            }
          };
          allPropsMustHaveAllowed.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });
      });

      describe('Allowed inside component', () => {
        describe('Props', () => {
          test('Catches the missing allowed', () => {
            const demos = {
              [demoName]: {
                component: {
                  props: {
                    [propName]: {}
                  }
                }
              }
            };
            allPropsMustHaveAllowed.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([ERROR]);
          });

          test('Passes when allowed is an empty array', () => {
            const demos = {
              [demoName]: {
                component: {
                  props: {
                    [propName]: {
                      [key]: []
                    }
                  }
                }
              }
            };
            allPropsMustHaveAllowed.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });

          test('Passes when allowed is array of primitives', () => {
            const demos = {
              [demoName]: {
                component: {
                  props: {
                    [propName]: {
                      [key]: ARRAY_OF_PRIMITIVES
                    }
                  }
                }
              }
            };
            allPropsMustHaveAllowed.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });

          test('Fails when allowed includes non-primitives', () => {
            const demos = {
              [demoName]: {
                component: {
                  props: {
                    [propName]: {
                      [key]: ARRAY_OF_NON_PRIMITIVES
                    }
                  }
                }
              }
            };
            allPropsMustHaveAllowed.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([ERROR]);
          });

          test('Passes when allowed is explicitly set to undefined', () => {
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
            allPropsMustHaveAllowed.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });
        });

        describe('PropsToDemo', () => {
          test('Catches the missing allowed', () => {
            const demos = {
              [demoName]: {
                component: {
                  propsToDemo: {
                    [propName]: {}
                  }
                }
              }
            };
            allPropsMustHaveAllowed.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([ERROR]);
          });

          test('Passes when allowed is an empty array', () => {
            const demos = {
              [demoName]: {
                component: {
                  propsToDemo: {
                    [propName]: {
                      [key]: []
                    }
                  }
                }
              }
            };
            allPropsMustHaveAllowed.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });

          test('Passes when allowed is array of primitives', () => {
            const demos = {
              [demoName]: {
                component: {
                  propsToDemo: {
                    [propName]: {
                      [key]: ARRAY_OF_PRIMITIVES
                    }
                  }
                }
              }
            };
            allPropsMustHaveAllowed.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });

          test('Fails when allowed includes non-primitives', () => {
            const demos = {
              [demoName]: {
                component: {
                  propsToDemo: {
                    [propName]: {
                      [key]: ARRAY_OF_NON_PRIMITIVES
                    }
                  }
                }
              }
            };
            allPropsMustHaveAllowed.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([ERROR]);
          });

          test('Passes when allowed is explicitly set to undefined', () => {
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
            allPropsMustHaveAllowed.rule(demos, options, linterSettings, errors);

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
        allPropsMustHaveAllowed.rule(demos, options, linterSettings, errors);

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
        allPropsMustHaveAllowed.rule(demos, options, linterSettings, errors);

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
          allPropsMustHaveAllowed.rule(demos, options, linterSettings, errors);

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
          allPropsMustHaveAllowed.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });
      });
    });
  });

  test('Documentation', () => {
    expect(validateRuleDocumentation(allPropsMustHaveAllowed))
      .toEqual(true);
  });
});
