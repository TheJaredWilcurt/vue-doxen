/* eslint-disable import/no-extraneous-dependencies */

/**
 * @file Style tokens allow a lot of flexibility in how the Vue-Doxen components can be styled.
 *
 * Style tokens solve the following scenarios:
 *
 * Provide optional basic built in CSS
 * Allow overriding basic built-in classes
 * The CSS is externalized and can be skipped if not needed
 * You can remove all classes from all elements if not needed
 * Allows customizing the class names to whatever you want
 * Allows having many classes applied on a single element (Tailwind)
 * Can use existing CSS class names (Bootstrap)
 * Can use existing CSS component classes (Vuetify)
 */

import _kebabCase from 'lodash.kebabcase';

export const ALL_STYLE_TOKENS = [
  'accordionContainer',
  'accordionInner',
  'button',
  'buttonNotSelected',
  'buttonSelected',
  'codeBox',
  'codeBoxContainer',
  'codeBoxCopied',
  'codeSwapper',
  'codeSwapperFileName',
  'componentDemo',
  'componentDemoContainer',
  'componentDemoH3',
  'componentDemoHr',
  'demoDescription',
  'demoHeader',
  'demoHeaderTitle',
  'emitsDocumentationCode',
  'emitsDocumentationLi',
  'emitsDocumentationSpan',
  'emitsDocumentationStrong',
  'emitsDocumentationUl',
  'emitLogClearButton',
  'emitLogHeader',
  'emitLogTable',
  'emitLogTableContainer',
  'emitLogTbody',
  'emitLogTd',
  'emitLogTh',
  'emitLogThead',
  'emitLogTr',
  'formFieldCheckbox',
  'formFieldCheckboxContainer',
  'formFieldCheckboxError',
  'formFieldCheckboxNameDisabled',
  'formFieldCheckboxNameError',
  'formFieldCheckboxNameLabel',
  'formFieldDeprecatedProp',
  'formFieldDropdown',
  'formFieldDropdownContainer',
  'formFieldDropdownError',
  'formFieldDropdownOption',
  'formFieldError',
  'formFieldFieldset',
  'formFieldLabel',
  'formFieldLegend',
  'formFieldLegendDisabled',
  'formFieldLegendError',
  'formFieldMessage',
  'formFieldNumberFieldContainer',
  'formFieldNumberField',
  'formFieldNumberFieldError',
  'formFieldRadioDial',
  'formFieldRadioDialContainer',
  'formFieldRadioDialNameDisabled',
  'formFieldRadioDialNameError',
  'formFieldRadioDialNameLabel',
  'formFieldRadioDialsContainer',
  'formFieldRangeSlider',
  'formFieldRangeSliderContainer',
  'formFieldRangeSliderError',
  'formFieldRequired',
  'formFieldTextarea',
  'formFieldTextareaCode',
  'formFieldTextareaContainer',
  'formFieldTextareaError',
  'formFieldTextField',
  'formFieldTextFieldContainer',
  'formFieldTextFieldError',
  'playgroundGroupTitle',
  'playgroundGroupTitleCollapsed',
  'playgroundGroupTitleExpanded',
  'playgroundGrouping',
  'propsDocumentationDeprecated',
  'propsDocumentationCode',
  'propsDocumentationEm',
  'propsDocumentationLi',
  'propsDocumentationSpan',
  'propsDocumentationStrong',
  'propsDocumentationUl',
  'propsPlaygroundContainer',
  'propsPlaygroundForm',
  'sidebarButton',
  'sidebarButtonNotSelected',
  'sidebarButtonSelected',
  'sidebarContainer',
  'tabButton',
  'tabButtonNotSelected',
  'tabButtonSelected',
  'tabsButtonContainer',
  'tabsHeader',
  'vueDoxen'
];

/**
 * A predictable map of tokens to class names. These classes are not used anywhere, they exist to make styling easier for those writing their own CSs.
 *
 * @type {Object}
 */
export const styleTokensBuiltIn = {};
for (const token of ALL_STYLE_TOKENS) {
  styleTokensBuiltIn[token] = 'doxen-' + _kebabCase(token).replace('-h-3', '-h3');
}

/**
 * All the style token keys without any class names applied to them.
 *
 * @type {Object}
 */
export const styleTokensEmpty = {};
for (const token of ALL_STYLE_TOKENS) {
  styleTokensEmpty[token] = '';
}

/**
 * Style tokens using the class names provided by Bootstrap 5.
 *
 * @type {Object}
 */
export const styleTokensBootstrap5 = {
  // Container
  formFieldFieldset: 'px-2 pb-2 m-1 flex-grow-1',
  // Errors
  formFieldCheckboxError: 'text-danger',
  formFieldCheckboxNameError: 'text-danger',
  formFieldDropdownError: 'text-danger',
  formFieldError: 'form-text text-danger',
  formFieldLegendError: 'text-danger',
  formFieldNumberFieldError: 'text-danger',
  formFieldRadioDialNameError: 'text-danger',
  formFieldRangeSliderError: 'text-danger',
  formFieldTextareaError: 'text-danger',
  formFieldTextFieldError: 'text-danger',
  // Labels
  formFieldLegend: 'form-label form-control-sm mb-0 px-0',
  // Inputs
  formFieldRangeSlider: 'form-control',
  formFieldNumberField: 'form-control',
  formFieldTextarea: 'form-control',
  formFieldTextField: 'form-control',
  // Checkbox
  formFieldCheckbox: 'form-check-input',
  formFieldCheckboxContainer: 'form-check',
  formFieldCheckboxNameDisabled: '',
  formFieldCheckboxNameLabel: 'form-check-label',
  // Radio Dials
  formFieldRadioDial: 'form-check-input',
  formFieldRadioDialNameLabel: 'form-check-label form-label form-control-sm',
  formFieldRadioDialContainer: 'form-check',
  // Select
  formFieldDropdown: 'form-select form-select-sm',
  // Message
  formFieldMessage: 'form-text',
  // Buttons
  button: 'btn',
  buttonSelected: 'btn-primary',
  buttonNotSelected: 'btn-outline-primary',
  // Code
  codeSwapperFileName: 'float-end',
  formFieldTextareaCode: 'font-monospace',
  tabsButtonContainer: 'nav nav-tabs nav-item mt-3 mb-0',
  tabButton: 'nav-link me-1',
  tabButtonSelected: 'active border-bottom-0 mb-0',
  // Demo
  propsPlaygroundContainer: '',
  playgroundGroupTitle: 'w-100 mt-1 btn',
  playgroundGroupTitleCollapsed: 'btn-dark',
  playgroundGroupTitleExpanded: 'btn-primary',
  propsPlaygroundForm: 'd-flex flex-wrap',
  playgroundGrouping: '',
  accordionContainer: 'w-100',

  // Emit log
  emitLogHeader: 'd-flex',
  emitLogClearButton: 'btn btn-primary',
  emitLogTable: 'table table-striped',
  // Sidebar
  sidebarContainer: 'btn-group-vertical mx-3 justify-content-start',
  sidebarButton: 'btn flex-grow-0',
  sidebarButtonNotSelected: 'btn-outline-primary',
  sidebarButtonSelected: 'btn-primary flex-shrink-1'
};

/**
 * Style tokens using the class names provided by Vuetify 3.
 *
 * @type {Object}
 */
export const styleTokensVuetify3 = {
  accordionContainer: 'w-100',
  button: 'v-btn v-btn--density-default v-btn--size-default v-btn--variant-flat mb-1',
  buttonSelected: 'bg-primary',
  buttonNotSelected: 'v-btn--variant-outlined',
  codeSwapper: 'v-card v-card--density-default v-card--variant-elevated mt-3',
  codeSwapperFileName: 'pl-3',
  componentDemoH3: 'pt-8 pb-3',
  demoHeaderTitle: 'pb-3',
  emitsDocumentationUl: 'pl-5',
  emitLogClearButton: 'v-btn bg-primary v-btn--density-default v-btn--size-small v-btn--variant-flat',
  formFieldDropdown: 'w-100',
  formFieldFieldset: 'v-input__control',
  formFieldCheckboxContainer: 'v-selection-control v-selection-control--density-default v-checkbox-btn',
  formFieldCheckbox: 'v-icon notranslate v-icon--size-small mr-2',
  formFieldCheckboxNameLabel: 'v-label v-label--clickable',
  formFieldNumberField: 'w-100',
  formFieldRangeSlider: 'w-100',
  formFieldTextarea: 'w-100',
  formFieldTextField: 'w-100',
  playgroundGroupTitle: 'w-100 mt-1 mb-1 v-btn v-btn--density-default v-btn--size-default v-btn--variant-flat',
  playgroundGroupTitleCollapsed: 'bg-primary-darken-2',
  playgroundGroupTitleExpanded: 'bg-primary-darken-1',
  playgroundGrouping: 'bg-surface-darken-1',
  propsDocumentationUl: 'pl-5',
  sidebarButton: 'v-btn v-btn--density-default v-btn--size-default v-btn--variant-flat mb-1',
  sidebarButtonSelected: 'bg-primary',
  sidebarButtonNotSelected: 'v-btn--variant-outlined',
  tabsHeader: 'v-slide-group v-tabs v-tabs--horizontal v-tabs--align-tabs-start v-tabs--density-default bg-primary',
  tabsButtonContainer: 'v-slide-group__container',
  tabButtonNotSelected: 'border-b-md border-solid border-opacity-0 v-btn v-theme--dark v-btn--density-default v-btn--size-default v-btn--variant-text v-tab',
  tabButtonSelected: 'border-b-md border-solid border-opacity-100 v-btn v-tab-item--selected v-tab--selected v-theme--dark v-btn--density-default v-btn--size-default v-btn--variant-text v-tab'
};
