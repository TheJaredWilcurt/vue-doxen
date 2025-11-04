import { allComponentsMustBeReplaced } from '@/linter/rules/options/allComponentsMustBeReplaced.js';

import DoxenButton from '@/components/DoxenButton.vue';
import DoxenDeprecationBanner from '@/components/DoxenDeprecationBanner.vue';

describe('Options must have all internal components replaced', () => {
  const consoleInfo = console.info;
  const ruleName = allComponentsMustBeReplaced.title;
  const demoName = 'Options';
  const noOptionsMessage = 'Your Vue-Doxen options object is missing components.';
  const message = (componentName) => {
    return 'The ' + componentName + ' component in your Vue-Doxen options object is not a custom component.';
  };
  let demos;
  let linterSettings;
  let errors;

  beforeEach(() => {
    console.info = vi.fn();
    demos = {};
    linterSettings = {
      options: {
        allComponentsMustBeReplaced: true
      }
    };
    errors = [];
  });

  afterEach(() => {
    console.info = consoleInfo;
  });

  describe('Rule', () => {
    test('Fails when options object is missing', () => {
      const options = undefined;
      allComponentsMustBeReplaced.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([{
          ruleName,
          demoName,
          message: noOptionsMessage
        }]);
    });

    test('Fails when components object is missing', () => {
      const options = {
        components: undefined
      };
      allComponentsMustBeReplaced.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([{
          ruleName,
          demoName,
          message: noOptionsMessage
        }]);
    });

    test('Fails when a Vue-Doxen internal component is used', () => {
      const options = {
        components: {
          checkbox: DoxenButton,
          deprecationBanner: DoxenDeprecationBanner,
          deprecatedProp: DoxenButton,
          dropdown: DoxenButton,
          emitLog: DoxenButton,
          emitsDocumentation: DoxenButton,
          header: DoxenButton,
          jsonTextarea: DoxenButton,
          numberField: DoxenButton,
          plainText: DoxenButton,
          propsDocumentation: DoxenButton,
          radioDials: DoxenButton,
          rangeSlider: DoxenButton,
          textField: DoxenButton,
          textarea: DoxenButton
        }
      };
      allComponentsMustBeReplaced.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([{
          ruleName,
          demoName,
          message: message('deprecationBanner')
        }]);
    });

    test('Passes when all components are present and custom', () => {
      const options = {
        components: {
          checkbox: DoxenButton,
          deprecationBanner: DoxenButton,
          deprecatedProp: DoxenButton,
          dropdown: DoxenButton,
          emitLog: DoxenButton,
          emitsDocumentation: DoxenButton,
          header: DoxenButton,
          jsonTextarea: DoxenButton,
          numberField: DoxenButton,
          plainText: DoxenButton,
          propsDocumentation: DoxenButton,
          radioDials: DoxenButton,
          rangeSlider: DoxenButton,
          textField: DoxenButton,
          textarea: DoxenButton
        }
      };
      allComponentsMustBeReplaced.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([]);
    });
  });

  test('Documentation', () => {
    function validateRuleDocumentation (ruleDefinition) {
      const existsWithValue = (
        !!ruleDefinition.title.length &&
        !!ruleDefinition.description.length &&
        !!ruleDefinition.url.length &&
        !!Object.keys(ruleDefinition.examples).length &&
        !!ruleDefinition.examples.Options.length &&
        !!ruleDefinition.examples.Composition.length &&
        !!ruleDefinition.examples['Script Setup'].length
      );
      const hasCorrectTypes = (
        typeof(ruleDefinition.title) === 'string' &&
        typeof(ruleDefinition.description) === 'string' &&
        ruleDefinition.description.endsWith('.') &&
        typeof(ruleDefinition.url) === 'string' &&
        typeof(ruleDefinition.examples) === 'object' &&
        !Array.isArray(ruleDefinition.examples) &&
        typeof(ruleDefinition.examples.Options) === 'string' &&
        typeof(ruleDefinition.examples.Composition) === 'string' &&
        typeof(ruleDefinition.examples['Script Setup']) === 'string'
      );
      return existsWithValue && hasCorrectTypes;
    }

    expect(validateRuleDocumentation(allComponentsMustBeReplaced))
      .toEqual(true);
  });
});
