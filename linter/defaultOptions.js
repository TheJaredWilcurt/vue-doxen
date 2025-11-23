/**
 * @file The linter does not use aliased imports so that it can be called
 *       directly by consumers without a build step. However, it has linting
 *       rules specific to the Vue-Doxen options, which have a defaultOptions
 *       object that imports default Doxen components. To avoid having to
 *       deal with importing those components that use @ aliases, we just
 *       keep a copy of the defaultOptions here for the linter, with the
 *       names of all the components instead.
 *       SEE: /lib/helpers/defaultOptions.js
 */

const defaultOptions = {
  components: {
    checkbox: 'DoxenCheckbox',
    deprecationBanner: 'DoxenDeprecationBanner',
    deprecatedProp: 'DoxenDeprecatedProp',
    dropdown: 'DoxenDropdown',
    emitLog: 'DoxenEmitLog',
    emitsDocumentation: 'DoxenEmitsDocumentation',
    header: 'DoxenHeader',
    jsonTextarea: 'DoxenJsonTextarea',
    numberField: 'DoxenNumberField',
    plainText: 'DoxenPlainText',
    propsDocumentation: 'DoxenPropsDocumentation',
    radioDials: 'DoxenRadioDials',
    rangeSlider: 'DoxenRangeSlider',
    textField: 'DoxenTextField',
    textarea: 'DoxenTextarea'
  }
};

export default defaultOptions;
