import { validateRuleDocumentation } from '@@@@/helpers.js';
import { allPropsMustHaveRequiredOrDefault } from '@@@@/rules/demos/allPropsMustHave/requiredOrDefault.js';

describe('Props must have required or default set', () => {
  const consoleInfo = console.info;
  const ruleName = allPropsMustHaveRequiredOrDefault.title;
  const demoName = 'MyComponent';
  const propName = 'myProp';
  const key = 'requiredOrDefault';
  const message = 'The ' + demoName + ' prop ' + propName + ' must have either `required: true` or a `default` value set.';
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

        test('Fails when both keys missing', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {}
              }
            }
          };
          allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });

        test('Fails when only required: false exists', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  required: false
                }
              }
            }
          };
          allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });

        test('Passes when required: true exists', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  required: true
                }
              }
            }
          };
          allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Passes when default: undefined exists', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  default: undefined
                }
              }
            }
          };
          allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Passes when default: "string" exists', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  default: 'test'
                }
              }
            }
          };
          allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Passes when required: false but has default', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  required: false,
                  default: 'test'
                }
              }
            }
          };
          allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });
      });

      describe('PropsToDemo', () => {
        const propsOrPropsToDemo = 'propsToDemo';

        test('Fails when both keys missing', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {}
              }
            }
          };
          allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });

        test('Fails when only required: false exists', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  required: false
                }
              }
            }
          };
          allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });

        test('Passes when required: true exists', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  required: true
                }
              }
            }
          };
          allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Passes when default: undefined exists', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  default: undefined
                }
              }
            }
          };
          allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Passes when default: "string" exists', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  default: 'test'
                }
              }
            }
          };
          allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });

        test('Passes when required: false but has default', () => {
          const demos = {
            [demoName]: {
              [propsOrPropsToDemo]: {
                [propName]: {
                  required: false,
                  default: 'test'
                }
              }
            }
          };
          allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([]);
        });
      });

      describe('Inside component', () => {
        describe('Props', () => {
          const propsOrPropsToDemo = 'props';

          test('Fails when both keys missing', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {}
                  }
                }
              }
            };
            allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([ERROR]);
          });

          test('Fails when only required: false exists', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      required: false
                    }
                  }
                }
              }
            };
            allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([ERROR]);
          });

          test('Passes when required: true exists', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      required: true
                    }
                  }
                }
              }
            };
            allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });

          test('Passes when default: undefined exists', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      default: undefined
                    }
                  }
                }
              }
            };
            allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });

          test('Passes when default: "string" exists', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      default: 'test'
                    }
                  }
                }
              }
            };
            allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });

          test('Passes when required: false but has default', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      required: false,
                      default: 'test'
                    }
                  }
                }
              }
            };
            allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });
        });

        describe('PropsToDemo', () => {
          const propsOrPropsToDemo = 'propsToDemo';

          test('Fails when both keys missing', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {}
                  }
                }
              }
            };
            allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([ERROR]);
          });

          test('Fails when only required: false exists', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      required: false
                    }
                  }
                }
              }
            };
            allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([ERROR]);
          });

          test('Passes when required: true exists', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      required: true
                    }
                  }
                }
              }
            };
            allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });

          test('Passes when default: undefined exists', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      default: undefined
                    }
                  }
                }
              }
            };
            allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });

          test('Passes when default: "string" exists', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      default: 'test'
                    }
                  }
                }
              }
            };
            allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

            expect(console.info)
              .not.toHaveBeenCalled();

            expect(errors)
              .toEqual([]);
          });

          test('Passes when required: false but has default', () => {
            const demos = {
              [demoName]: {
                component: {
                  [propsOrPropsToDemo]: {
                    [propName]: {
                      required: false,
                      default: 'test'
                    }
                  }
                }
              }
            };
            allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

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
        allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

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
        allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

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
          allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

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
          allPropsMustHaveRequiredOrDefault.rule(demos, options, linterSettings, errors);

          expect(console.info)
            .not.toHaveBeenCalled();

          expect(errors)
            .toEqual([ERROR]);
        });
      });
    });
  });

  test('Documentation', () => {
    expect(validateRuleDocumentation(allPropsMustHaveRequiredOrDefault))
      .toEqual(true);
  });
});
