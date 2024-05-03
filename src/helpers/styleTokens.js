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
  codeBox: 'doxen-code-box',
  codeSwapper: 'doxen-code-swapper',
  codeSwapperFileName: 'doxen-code-swapper-file-name',
  componentDemo: 'doxen-component-demo',
  componentDemoContainer: 'doxen-component-demo-container',
  componentDemoH3: 'doxen-component-demo-h3',
  componentDemoHr: 'doxen-component-demo-hr',
  demoHeader: 'doxen-demo-header',
  demoHeaderTitle: 'doxen-demo-header-title',
  demoHeaderDescription: 'doxen-demo-header-description',
  emitsDocumentationCode: 'doxen-emits-documentation-code',
  emitsDocumentationLi: 'doxen-emits-documentation-li',
  emitsDocumentationStrong: 'doxen-emits-documentation-strong',
  emitsDocumentationUl: 'doxen-emits-documentation-ul',
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
  formFieldRadioDial: 'doxen-form-field-radio-dial',
  formFieldRadioDialContainer: 'doxen-form-field-radio-dial-container',
  formFieldRadioDialNameDisabled: 'doxen-form-field-radio-dial-name-disabled',
  formFieldRadioDialNameError: 'doxen-form-field-radio-dial-name-error',
  formFieldRadioDialNameLabel: 'doxen-form-field-radio-dial-name-label',
  formFieldRadioDialsContainer: 'doxen-form-field-radio-dials-container',
  formFieldRequired: 'doxen-form-field-required',
  formFieldTextarea: 'doxen-form-field-textarea',
  formFieldTextareaCode: 'doxen-form-field-textarea-code',
  formFieldTextareaContainer: 'doxen-form-field-textarea-container',
  formFieldTextareaError: 'doxen-form-field-textarea-error',
  formFieldTextField: 'doxen-form-field-text-field',
  formFieldTextFieldContainer: 'doxen-form-field-text-field-container',
  formFieldTextFieldError: 'doxen-form-field-text-field-error',
  propsDocumentationCode: 'doxen-props-documentation-code',
  propsDocumentationEm: 'doxen-props-documentation-em',
  propsDocumentationLi: 'doxen-props-documentation-li',
  propsDocumentationSpan: 'doxen-props-documentation-span',
  propsDocumentationStrong: 'doxen-props-documentation-strong',
  propsDocumentationUl: 'doxen-props-documentation-ul',
  propsPlaygroundForm: 'doxen-props-playground-form',
  sidebarButton: 'doxen-sidebar-button',
  sidebarButtonNotSelected: 'doxen-sidebar-button-not-selected',
  sidebarButtonSelected: 'doxen-sidebar-button-selected',
  sidebarContainer: 'doxen-sidebar-container',
  tabsButton: 'doxen-tabs-button',
  tabsButtonContainer: 'doxen-tabs-button-container',
  tabsButtonNotSelected: 'doxen-tabs-button-not-selected',
  tabsButtonSelected: 'doxen-tabs-button-selected',
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
  formFieldError: 'text-danger',
  formFieldLegendError: 'text-danger',
  formFieldRadioDialNameError: 'text-danger',
  formFieldTextareaError: 'text-danger',
  formFieldTextFieldError: 'text-danger',
  // Labels
  formFieldLegend: 'form-label form-control-sm mb-0 px-0',
  // Inputs
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
  // Code
  codeSwapperFileName: 'float-end',
  formFieldTextareaCode: 'font-monospace',
  tabsButton: 'nav-link me-1',
  tabsButtonContainer: 'nav nav-tabs nav-item mt-3 mb-0',
  tabsButtonNotSelected: '',
  tabsButtonSelected: 'active border-bottom-0 mb-0',
  // Demo
  propsPlaygroundForm: 'd-flex flex-wrap',
  // Sidebar
  sidebarContainer: 'btn-group-vertical mx-3 justify-content-start',
  sidebarButton: 'btn flex-grow-0',
  sidebarButtonNotSelected: 'btn-outline-primary',
  sidebarButtonSelected: 'btn-primary flex-shrink-1'
};
