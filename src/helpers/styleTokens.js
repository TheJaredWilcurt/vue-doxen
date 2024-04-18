/**
 * @file Style tokens allow a lot of flexibility in how the components can be styled.
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
 * The basic built in styles. Meant to have very little aesthetic impact and mostly give simple layout improvements.
 *
 * @type {Object}
 */
export const styleTokensBuiltIn = {
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
  formFieldTextareaContainer: 'doxen-form-field-textarea-container',
  formFieldTextareaError: 'doxen-form-field-textarea-error',
  formFieldTextField: 'doxen-form-field-text-field',
  formFieldTextFieldContainer: 'doxen-form-field-text-field-container',
  formFieldTextFieldError: 'doxen-form-field-text-field-error',
  sidebarButton: 'doxen-sidebar-button',
  sidebarButtonNotSelected: 'doxen-sidebar-button-not-selected',
  sidebarButtonSelected: 'doxen-sidebar-button-selected',
  sidebarContainer: 'doxen-sidebar-container',
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
 * Style tokens using the class names provided by Bootstrap5
 * @type {Object}
 */
export const styleTokensBootstrap5 = {
  ...styleTokensEmpty,
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
  formFieldLegend: 'form-label form-control-sm',
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
  // Sidebar
  sidebarContainer: 'btn-group-vertical',
  sidebarButtonNotSelected: 'btn btn-outline-primary',
  sidebarButtonSelected: 'btn btn-primary'
};
