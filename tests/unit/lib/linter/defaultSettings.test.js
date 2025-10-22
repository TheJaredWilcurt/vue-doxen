import { createSettingsFromDefaults } from '@/linter/defaultSettings.js';

describe('Default settings', () => {
  describe('createSettingsFromDefaults', () => {
    const allSettingsFalse = {
      demos: {
        allPropsMustHave: {
          allowed: false,
          description: false,
          example: false,
          requiredOrDefault: false,
          type: false,
          validator: false
        },
        allEmitsMustHave: {
          description: false,
          example: false
        },
        componentMustBeNamed: false,
        descriptionMustEndInPeriod: false,
        mustHaveDescription: false,
        mustHaveImportStatemnet: false,
        noCustomComponentsInComponent: false,
        demosMustHaveComponent: false,
        doNotBreakVueApi: false,
        noDuplicateSettings: false,
        onlyAllowDemoObjects: false
      },
      options: {
        allComponentsMustBeReplaced: false,
        noMissingComponents: false
      }
    };

    const allSettingsTrue = {
      demos: {
        allPropsMustHave: {
          allowed: true,
          description: true,
          example: true,
          requiredOrDefault: true,
          type: true,
          validator: true
        },
        allEmitsMustHave: {
          description: true,
          example: true
        },
        componentMustBeNamed: true,
        descriptionMustEndInPeriod: true,
        mustHaveDescription: true,
        mustHaveImportStatemnet: true,
        noCustomComponentsInComponent: true,
        demosMustHaveComponent: true,
        doNotBreakVueApi: true,
        noDuplicateSettings: true,
        onlyAllowDemoObjects: true
      },
      options: {
        allComponentsMustBeReplaced: true,
        noMissingComponents: true
      }
    };

    describe('Quick return', () => {
      describe('Returns the defaults if', () => {
        test('Nothing passed in', () => {
          expect(createSettingsFromDefaults())
            .toEqual(allSettingsFalse);
        });

        test('Array passed in', () => {
          expect(createSettingsFromDefaults([1, 2, 3]))
            .toEqual(allSettingsFalse);
        });

        test('Wrong type passed in', () => {
          expect(createSettingsFromDefaults(true))
            .toEqual(allSettingsFalse);
        });
      });
    });

    test('Overrides all defaults', () => {
      expect(createSettingsFromDefaults(allSettingsTrue))
        .toEqual(allSettingsTrue);
    });

    test('Overrides subset of defaults', () => {
      const linterSettings = {
        demos: {
          allPropsMustHave: {
            description: true
          },
          allEmitsMustHave: {
            description: true
          },
          mustHaveDescription: true
        }
      };

      expect(createSettingsFromDefaults(linterSettings))
        .toEqual({
          demos: {
            allPropsMustHave: {
              allowed: false,
              description: true,
              example: false,
              requiredOrDefault: false,
              type: false,
              validator: false
            },
            allEmitsMustHave: {
              description: true,
              example: false
            },
            componentMustBeNamed: false,
            descriptionMustEndInPeriod: false,
            mustHaveDescription: true,
            mustHaveImportStatemnet: false,
            noCustomComponentsInComponent: false,
            demosMustHaveComponent: false,
            doNotBreakVueApi: false,
            noDuplicateSettings: false,
            onlyAllowDemoObjects: false
          },
          options: {
            allComponentsMustBeReplaced: false,
            noMissingComponents: false
          }
        });
    });

    test('Values not present in the API are removed', () => {
      const linterSettings = {
        a: true,
        b: false,
        c: {
          d: true,
          e: false,
          f: {
            g: true,
            h: true
          }
        },
        demos: {
          i: true,
          j: false,
          k: {
            l: true,
            m: false
          },
          allPropsMustHave: {
            description: true,
            o: true,
            p: false,
            q: {
              r: true,
              s: false,
              t: {
                u: true,
                v: true
              }
            }
          },
          allEmitsMustHave: {
            description: true,
            w: true,
            x: {
              y: true,
              z: false
            }
          },
          mustHaveDescription: true
        }
      };

      expect(createSettingsFromDefaults(linterSettings))
        .toEqual({
          demos: {
            allPropsMustHave: {
              allowed: false,
              description: true,
              example: false,
              requiredOrDefault: false,
              type: false,
              validator: false
            },
            allEmitsMustHave: {
              description: true,
              example: false
            },
            componentMustBeNamed: false,
            descriptionMustEndInPeriod: false,
            mustHaveDescription: true,
            mustHaveImportStatemnet: false,
            noCustomComponentsInComponent: false,
            demosMustHaveComponent: false,
            doNotBreakVueApi: false,
            noDuplicateSettings: false,
            onlyAllowDemoObjects: false
          },
          options: {
            allComponentsMustBeReplaced: false,
            noMissingComponents: false
          }
        });
    });
  });
});
