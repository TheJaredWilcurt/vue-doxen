import { validateRuleDocumentation } from '@/linter/helpers.js';
import { noCustomComponentsInComponent } from '@/linter/rules/demos/noCustomComponentsInComponent.js';

import DoxenButton from '@/components/DoxenButton.vue';

describe('No custom components inside demo component', () => {
  const consoleInfo = console.info;
  const demoName = 'MyComponent';
  const propName = 'myProp';
  const slotName = 'mySlot';
  const propsMessage = 'The ' + demoName + ' demo component\'s prop ' + propName + ' should not contain a custom documentation component, move it to a demo file.';
  const slotsMessage = 'The ' + demoName + ' demo component\'s slot ' + slotName + ' should not contain a custom documentation component, move it to a demo file.';
  function makeMessage (key) {
    return 'The ' + demoName + ' demo component\'s ' + key + ' should not be a custom documentation component, move it to a demo file.';
  }
  let options;
  let linterSettings;
  let errors;
  const render = vi.fn();

  beforeEach(() => {
    console.info = vi.fn();
    options = {};
    linterSettings = {
      demos: {
        noCustomComponentsInComponent: true
      }
    };
    errors = [];
  });

  afterEach(() => {
    console.info = consoleInfo;
  });

  describe('Rule', () => {
    test('Fails if prop has custom components', () => {
      const demos = {
        [demoName]: {
          render,
          props: {
            [propName]: {
              component: DoxenButton
            }
          }
        }
      };
      noCustomComponentsInComponent.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .toHaveBeenCalledWith(propsMessage);

      expect(errors)
        .toEqual([demoName]);
    });

    test('Fails if propsToDemo has custom components', () => {
      const demos = {
        [demoName]: {
          render,
          propsToDemo: {
            [propName]: {
              component: DoxenButton
            }
          }
        }
      };
      noCustomComponentsInComponent.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .toHaveBeenCalledWith(propsMessage);

      expect(errors)
        .toEqual([demoName]);
    });

    test('Fails if slot has custom components', () => {
      const demos = {
        [demoName]: {
          render,
          slots: {
            [slotName]: {
              component: DoxenButton
            }
          }
        }
      };
      noCustomComponentsInComponent.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .toHaveBeenCalledWith(slotsMessage);

      expect(errors)
        .toEqual([demoName]);
    });

    test('Fails if slotsToDemo has custom components', () => {
      const demos = {
        [demoName]: {
          render,
          slotsToDemo: {
            [slotName]: {
              component: DoxenButton
            }
          }
        }
      };
      noCustomComponentsInComponent.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .toHaveBeenCalledWith(slotsMessage);

      expect(errors)
        .toEqual([demoName]);
    });

    test('Fails if deprecationNotice has custom components', () => {
      const demos = {
        [demoName]: {
          render,
          deprecationNotice: {
            component: DoxenButton
          }
        }
      };
      noCustomComponentsInComponent.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .toHaveBeenCalledWith(makeMessage('deprecationNotice'));

      expect(errors)
        .toEqual([demoName]);
    });

    test('Fails if title has custom components', () => {
      const demos = {
        [demoName]: {
          render,
          title: {
            component: DoxenButton
          }
        }
      };
      noCustomComponentsInComponent.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .toHaveBeenCalledWith(makeMessage('title'));

      expect(errors)
        .toEqual([demoName]);
    });

    test('Fails if description has custom components', () => {
      const demos = {
        [demoName]: {
          render,
          description: {
            component: DoxenButton
          }
        }
      };
      noCustomComponentsInComponent.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .toHaveBeenCalledWith(makeMessage('description'));

      expect(errors)
        .toEqual([demoName]);
    });

    test('Fails if importStatement has custom components', () => {
      const demos = {
        [demoName]: {
          render,
          importStatement: {
            component: DoxenButton
          }
        }
      };
      noCustomComponentsInComponent.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .toHaveBeenCalledWith(makeMessage('importStatement'));

      expect(errors)
        .toEqual([demoName]);
    });

    test('Fails if deprecationNotice from inside component has custom components', () => {
      const demos = {
        [demoName]: {
          component: {
            render,
            deprecationNotice: {
              component: DoxenButton
            }
          }
        }
      };
      noCustomComponentsInComponent.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .toHaveBeenCalledWith(makeMessage('deprecationNotice'));

      expect(errors)
        .toEqual([demoName]);
    });


    test('Passes when no props or slots', () => {
      const demos = {
        [demoName]: {
          render
        }
      };
      noCustomComponentsInComponent.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([]);
    });
  });

  test('Documentation', () => {
    expect(validateRuleDocumentation(noCustomComponentsInComponent))
      .toEqual(true);
  });
});
