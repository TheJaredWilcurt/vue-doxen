import { validateRuleDocumentation } from '@/linter/helpers.js';
import { allPropsMustHaveType } from '@/linter/rules/demos/allPropsMustHave/type.js';

describe('Props must have a type', () => {
  const consoleInfo = console.info;
  const ruleName = allPropsMustHaveType.title;
  const demoName = 'MyComponent';
  const propName = 'myProp';
  const key = 'type';
  const message = 'The ' + demoName + ' prop ' + propName + ' must have a type set.';
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
        const propsOrPropsToDemo = 'props';

        test('Fails when key is missing', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {}
              }
            }
          };
          allPropsMustHaveType.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });

        test('Fails when type is null', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  [key]: null
                }
              }
            }
          };
          allPropsMustHaveType.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });

        test('Fails when type is undefined', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  [key]: undefined
                }
              }
            }
          };
          allPropsMustHaveType.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });

        test('Fails when type is invalid', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  [key]: 'string'
                }
              }
            }
          };
          allPropsMustHaveType.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });

        test('Fails when array type is invalid', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  [key]: ['string']
                }
              }
            }
          };
          allPropsMustHaveType.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });

        test('Passes when type is valid', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  [key]: String
                }
              }
            }
          };
          allPropsMustHaveType.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Passes when array of types is valid', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  [key]: [String, Number]
                }
              }
            }
          };
          allPropsMustHaveType.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });
      });
      describe('PropsToDemo', () => {
        const propsOrPropsToDemo = 'propsToDemo';

        test('Fails when key is missing', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {}
              }
            }
          };
          allPropsMustHaveType.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });

        test('Fails when type is null', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  [key]: null
                }
              }
            }
          };
          allPropsMustHaveType.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });

        test('Fails when type is undefined', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  [key]: undefined
                }
              }
            }
          };
          allPropsMustHaveType.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });

        test('Fails when type is invalid', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  [key]: 'string'
                }
              }
            }
          };
          allPropsMustHaveType.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });

        test('Fails when array type is invalid', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  [key]: ['string']
                }
              }
            }
          };
          allPropsMustHaveType.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });

        test('Passes when type is valid', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  [key]: String
                }
              }
            }
          };
          allPropsMustHaveType.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Passes when array of types is valid', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  [key]: [String, Number]
                }
              }
            }
          };
          allPropsMustHaveType.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });
      });

      describe('Inside component', () => {
        describe('Props', () => {
          const propsOrPropsToDemo = 'props';

          test('Fails when key is missing', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {}
                  }
                }
              }
            };
            allPropsMustHaveType.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([ERROR]);
          });

          test('Fails when type is null', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      [key]: null
                    }
                  }
                }
              }
            };
            allPropsMustHaveType.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([ERROR]);
          });

          test('Fails when type is undefined', () => {
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
            allPropsMustHaveType.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([ERROR]);
          });

          test('Fails when type is invalid', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      [key]: 'string'
                    }
                  }
                }
              }
            };
            allPropsMustHaveType.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([ERROR]);
          });

          test('Fails when array type is invalid', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      [key]: ['string']
                    }
                  }
                }
              }
            };
            allPropsMustHaveType.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([ERROR]);
          });

          test('Passes when type is valid', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      [key]: String
                    }
                  }
                }
              }
            };
            allPropsMustHaveType.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });

          test('Passes when array of types is valid', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      [key]: [String, Number]
                    }
                  }
                }
              }
            };
            allPropsMustHaveType.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });
        });

        describe('PropsToDemo', () => {
          const propsOrPropsToDemo = 'propsToDemo';

          test('Fails when key is missing', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {}
                  }
                }
              }
            };
            allPropsMustHaveType.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([ERROR]);
          });

          test('Fails when type is null', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      [key]: null
                    }
                  }
                }
              }
            };
            allPropsMustHaveType.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([ERROR]);
          });

          test('Fails when type is undefined', () => {
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
            allPropsMustHaveType.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([ERROR]);
          });

          test('Fails when type is invalid', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      [key]: 'string'
                    }
                  }
                }
              }
            };
            allPropsMustHaveType.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([ERROR]);
          });

          test('Fails when array type is invalid', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      [key]: ['string']
                    }
                  }
                }
              }
            };
            allPropsMustHaveType.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([ERROR]);
          });

          test('Passes when type is valid', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      [key]: String
                    }
                  }
                }
              }
            };
            allPropsMustHaveType.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });

          test('Passes when array of types is valid', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      [key]: [String, Number]
                    }
                  }
                }
              }
            };
            allPropsMustHaveType.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });
        });
      });
    });

    describe('Props and propsToDemo as arrays', () => {
      test('Catches missing keys from props', () => {
        const demos = {
          [demoName]: {
            props: [propName]
          }
        };
        allPropsMustHaveType.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([ERROR]);
      });

      test('Catches missing keys from propsToDemo', () => {
        const demos = {
          [demoName]: {
            propsToDemo: [propName]
          }
        };
        allPropsMustHaveType.rule(demos, options, linterSettings, errors);

        expect(console.info)
          .not.toHaveBeenCalled();

        expect(errors)
          .toEqual([ERROR]);
      });

      describe('Inside component', () => {
        test('Catches missing keys from props', () => {
          const demos = {
            [demoName]: {
              component: {
                props: [propName]
              }
            }
          };
          allPropsMustHaveType.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });

        test('Catches missing keys from propsToDemo', () => {
          const demos = {
            [demoName]: {
              component: {
                propsToDemo: [propName]
              }
            }
          };
          allPropsMustHaveType.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });
      });
    });
  });

  test('Documentation', () => {
    expect(validateRuleDocumentation(allPropsMustHaveType))
      .toEqual(true);
  });
});
