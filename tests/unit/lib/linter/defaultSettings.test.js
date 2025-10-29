import { createSettingsFromDefaults } from '@/linter/defaultSettings.js';

describe('Default settings', () => {
  describe('createSettingsFromDefaults', () => {
    const allSettingsFalse = {
      demos: {
        allEmitsMustHave: {
          description: false,
          example: false,
          value: false
        },
        allPropsMustHave: {
          allowed: false,
          deprecated: false,
          description: false,
          example: false,
          requiredOrDefault: false,
          type: false,
          validator: false
        },
        componentMustBeNamed: false,
        demosMustHaveComponent: false,
        deprecatedMustBeSet: false,
        descriptionMustEndInPeriod: false,
        doNotViolateVueEmitApi: false,
        mustHaveDescription: false,
        mustHaveImportStatemnet: false,
        noCustomComponentsInComponent: false,
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
        allEmitsMustHave: {
          description: true,
          example: true,
          value: false
        },
        allPropsMustHave: {
          allowed: true,
          deprecated: true,
          description: true,
          example: true,
          requiredOrDefault: true,
          type: true,
          validator: true
        },
        componentMustBeNamed: true,
        demosMustHaveComponent: true,
        deprecatedMustBeSet: true,
        descriptionMustEndInPeriod: true,
        doNotViolateVueEmitApi: true,
        mustHaveDescription: true,
        mustHaveImportStatemnet: true,
        noCustomComponentsInComponent: true,
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
          allEmitsMustHave: {
            description: true
          },
          allPropsMustHave: {
            description: true
          },
          mustHaveDescription: true
        }
      };

      expect(createSettingsFromDefaults(linterSettings))
        .toEqual({
          demos: {
            allEmitsMustHave: {
              description: true,
              example: false,
              value: false
            },
            allPropsMustHave: {
              allowed: false,
              deprecated: false,
              description: true,
              example: false,
              requiredOrDefault: false,
              type: false,
              validator: false
            },
            componentMustBeNamed: false,
            demosMustHaveComponent: false,
            deprecatedMustBeSet: false,
            descriptionMustEndInPeriod: false,
            doNotViolateVueEmitApi: false,
            mustHaveDescription: true,
            mustHaveImportStatemnet: false,
            noCustomComponentsInComponent: false,
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
          allEmitsMustHave: {
            description: true,
            w: true,
            x: {
              y: true,
              z: false
            }
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
          mustHaveDescription: true
        }
      };

      expect(createSettingsFromDefaults(linterSettings))
        .toEqual({
          demos: {
            allEmitsMustHave: {
              description: true,
              example: false,
              value: false
            },
            allPropsMustHave: {
              allowed: false,
              deprecated: false,
              description: true,
              example: false,
              requiredOrDefault: false,
              type: false,
              validator: false
            },
            componentMustBeNamed: false,
            demosMustHaveComponent: false,
            deprecatedMustBeSet: false,
            descriptionMustEndInPeriod: false,
            doNotViolateVueEmitApi: false,
            mustHaveDescription: true,
            mustHaveImportStatemnet: false,
            noCustomComponentsInComponent: false,
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
