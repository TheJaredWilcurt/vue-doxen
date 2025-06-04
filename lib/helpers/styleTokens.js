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

/**
 * A predictable map of tokens to class names. These classes are not used anywhere, they exist to make styling easier for those writing their own CSs.
 *
 * @type {Object}
 */
export const styleTokensBuiltIn = {
  accordionContainer: 'doxen-accordion-container',
  accordionInner: 'doxen-accordion-inner',
  accordionOuter: 'doxen-accordion-outer',
  button: 'doxen-button',
  buttonNotSelected: 'doxen-button-not-selected',
  buttonSelected: 'doxen-button-selected',
  codeBox: 'doxen-code-box',
  codeBoxContainer: 'doxen-code-box-container',
  codeBoxCopied: 'doxen-code-box-copied',
  codeSwapper: 'doxen-code-swapper',
  codeSwapperFileName: 'doxen-code-swapper-file-name',
  componentDemo: 'doxen-component-demo',
  componentDemoContainer: 'doxen-component-demo-container',
  componentDemoH3: 'doxen-component-demo-h3',
  componentDemoHr: 'doxen-component-demo-hr',
  demoDescription: 'doxen-demo-description',
  demoHeader: 'doxen-demo-header',
  demoHeaderTitle: 'doxen-demo-header-title',
  emitsDocumentationCode: 'doxen-emits-documentation-code',
  emitsDocumentationLi: 'doxen-emits-documentation-li',
  emitsDocumentationSpan: 'doxen-emits-documentation-span',
  emitsDocumentationStrong: 'doxen-emits-documentation-strong',
  emitsDocumentationUl: 'doxen-emits-documentation-ul',
  emitLogClearButton: 'doxen-emit-log-clear-button',
  emitLogHeader: 'doxen-emit-log-header',
  emitLogTable: 'doxen-emit-log-table',
  emitLogTableContainer: 'doxen-emit-log-table-container',
  emitLogTbody: 'doxen-emit-log-tbody',
  emitLogTd: 'doxen-emit-log-td',
  emitLogTh: 'doxen-emit-log-th',
  emitLogThead: 'doxen-emit-log-thead',
  emitLogTr: 'doxen-emit-log-tr',
  formFieldCheckbox: 'doxen-form-field-checkbox',
  formFieldCheckboxContainer: 'doxen-form-field-checkbox-container',
  formFieldCheckboxError: 'doxen-form-field-checkbox-error',
  formFieldCheckboxNameDisabled: 'doxen-form-field-checkbox-name-disabled',
  formFieldCheckboxNameError: 'doxen-form-field-checkbox-name-error',
  formFieldCheckboxNameLabel: 'doxen-form-field-checkbox-name-label',
  formFieldDropdown: 'doxen-form-field-dropdown',
  formFieldDropdownContainer: 'doxen-form-field-dropdown-container',
  formFieldDropdownError: 'doxen-form-field-dropdown-error',
  formFieldDropdownOption: 'doxen-form-field-dropdown-option',
  formFieldError: 'doxen-form-field-error',
  formFieldFieldset: 'doxen-form-field-fieldset',
  formFieldLabel: 'doxen-form-field-label',
  formFieldLegend: 'doxen-form-field-legend',
  formFieldLegendDisabled: 'doxen-form-field-legend-disabled',
  formFieldLegendError: 'doxen-form-field-legend-error',
  formFieldMessage: 'doxen-form-field-message',
  formFieldNumberFieldContainer: 'doxen-form-field-number-field-container',
  formFieldNumberField: 'doxen-form-field-number-field',
  formFieldNumberFieldError: 'doxen-form-field-number-field-error',
  formFieldRadioDial: 'doxen-form-field-radio-dial',
  formFieldRadioDialContainer: 'doxen-form-field-radio-dial-container',
  formFieldRadioDialNameDisabled: 'doxen-form-field-radio-dial-name-disabled',
  formFieldRadioDialNameError: 'doxen-form-field-radio-dial-name-error',
  formFieldRadioDialNameLabel: 'doxen-form-field-radio-dial-name-label',
  formFieldRadioDialsContainer: 'doxen-form-field-radio-dials-container',
  formFieldRangeSlider: 'doxen-form-field-range-slider',
  formFieldRangeSliderContainer: 'doxen-form-field-range-slider-container',
  formFieldRangeSliderError: 'doxen-form-field-range-slider-error',
  formFieldRequired: 'doxen-form-field-required',
  formFieldTextarea: 'doxen-form-field-textarea',
  formFieldTextareaCode: 'doxen-form-field-textarea-code',
  formFieldTextareaContainer: 'doxen-form-field-textarea-container',
  formFieldTextareaError: 'doxen-form-field-textarea-error',
  formFieldTextField: 'doxen-form-field-text-field',
  formFieldTextFieldContainer: 'doxen-form-field-text-field-container',
  formFieldTextFieldError: 'doxen-form-field-text-field-error',
  playgroundGroupTitle: 'doxen-playground-group-title',
  playgroundGroupTitleCollapsed: 'doxen-playground-group-title-collapsed',
  playgroundGroupTitleExpanded: 'doxen-playground-group-title-expanded',
  playgroundGrouping: 'doxen-playground-grouping',
  propsDocumentationCode: 'doxen-props-documentation-code',
  propsDocumentationEm: 'doxen-props-documentation-em',
  propsDocumentationLi: 'doxen-props-documentation-li',
  propsDocumentationSpan: 'doxen-props-documentation-span',
  propsDocumentationStrong: 'doxen-props-documentation-strong',
  propsDocumentationUl: 'doxen-props-documentation-ul',
  propsPlaygroundContainer: 'doxen-props-playground-container',
  propsPlaygroundForm: 'doxen-props-playground-form',
  sidebarButton: 'doxen-sidebar-button',
  sidebarButtonNotSelected: 'doxen-sidebar-button-not-selected',
  sidebarButtonSelected: 'doxen-sidebar-button-selected',
  sidebarContainer: 'doxen-sidebar-container',
  tabButton: 'doxen-tab-button',
  tabButtonNotSelected: 'doxen-tab-button-not-selected',
  tabButtonSelected: 'doxen-tab-button-selected',
  tabsButtonContainer: 'doxen-tabs-button-container',
  tabsHeader: 'doxen-tabs-header',
  vueDoxen: 'doxen-vue-doxen'
};

/**
 * All the style token keys without any class names applied to them.
 *
 * @type {Object}
 */
export const styleTokensEmpty = {};
for (const key in styleTokensBuiltIn) {
  styleTokensEmpty[key] = '';
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
  accordionOuter: 'w-100',

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
  accordionOuter: 'w-100',
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
