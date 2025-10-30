import { noMissingComponents } from '@/linter/rules/options/noMissingComponents.js';

import defaultOptions from '@/helpers/defaultOptions.js';

import DoxenButton from '@/components/DoxenButton.vue';

describe('Options must have all components supplied', () => {
  const consoleInfo = console.info;
  const fileName = 'Options';
  const message = (componentName) => {
    return 'You must supply a ' + componentName + ' component in your Vue-Doxen options object.';
  };
  let demos;
  let linterSettings;
  let errors;

  beforeEach(() => {
    console.info = vi.fn();
    demos = {};
    linterSettings = {
      options: {
        noMissingComponents: true
      }
    };
    errors = [];
  });

  afterEach(() => {
    console.info = consoleInfo;
  });

  describe('Rule', () => {
    test('Passes when not using options', () => {
      const options = undefined;
      noMissingComponents.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([]);
    });

    test('Passes when not using components', () => {
      const options = {
        components: undefined
      };
      noMissingComponents.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([]);
    });

    test('Fails when a component is missing', () => {
      const options = {
        components: {
          checkbox: DoxenButton,
          // deprecationBanner: DoxenButton,
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
      noMissingComponents.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .toHaveBeenCalledWith(message('deprecationBanner'));

      expect(errors)
        .toEqual([fileName]);
    });

    test('Fails when a supplied component is not actually a component', () => {
      const options = {
        components: {
          checkbox: DoxenButton,
          deprecationBanner: {},
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
      noMissingComponents.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .toHaveBeenCalledWith(message('deprecationBanner'));

      expect(errors)
        .toEqual([fileName]);
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
      noMissingComponents.rule(demos, options, linterSettings, errors);

      expect(console.info)
        .not.toHaveBeenCalled();

      expect(errors)
        .toEqual([]);
    });

    test('Passes when all components are present and defaults', () => {
      const options = defaultOptions;
      noMissingComponents.rule(demos, options, linterSettings, errors);

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

    expect(validateRuleDocumentation(noMissingComponents))
      .toEqual(true);
  });
});
