import { ALL_STYLE_TOKENS } from '@/helpers/styleTokens.js';

import DoxenJsonTextarea from '@/components/formFields/DoxenJsonTextarea.vue';

/** @typedef {string} COMPONENTNAME  Any Vue-Doxen component name. */
/**
 * @typedef  {Object}   COMPONENTTOKENSCHILDREN
 * @property {string[]} tokens                   A list of all style tokens used by the component
 * @property {string[]} children                 A list of child component names
 */

/**
 * This lists every Vue-Doxen component that accepts a styleTokens prop,
 * and all the tokens it specifically uses in that component (but excludes
 * tokens used by child components). It then lists all child components.
 * Below is a recursive function that builds a list of all tokens used by
 * a component AND it's children/grand-children/great-grand-children.
 *
 * @type {Object<COMPONENTNAME, COMPONENTTOKENSCHILDREN>}
 */
const components = {
  ComponentDemo: {
    tokens: [
      'componentDemo',
      'componentDemoContainer',
      'componentDemoH3',
      'componentDemoHr',
      'demoDescription',
      'deprecated',
      'playgroundGrouping',
      'playgroundGroupTitle',
      'playgroundGroupTitleCollapsed',
      'playgroundGroupTitleExpanded',
      'propsPlaygroundContainer',
      'propsPlaygroundForm'
    ],
    children: [
      'DoxenAccordion',
      'DoxenCodeBox',
      'DoxenCodeSwapper',
      'HtmlFragments',
      'OptionalCustomComponent'
    ]
  },
  DoxenAccordion: {
    tokens: [
      'accordionContainer',
      'accordionInner'
    ],
    children: []
  },
  DoxenButton: {
    tokens: [
      'button',
      'buttonNotSelected',
      'buttonSelected'
    ],
    children: []
  },
  DoxenCheckbox: {
    tokens: [
      'formFieldCheckbox',
      'formFieldCheckboxContainer',
      'formFieldCheckboxError',
      'formFieldCheckboxNameDisabled',
      'formFieldCheckboxNameError',
      'formFieldCheckboxNameLabel',
      'formFieldRequired'
    ],
    children: [
      'FormFieldFooter',
      'FormFieldLabel',
      'FormFieldsetWrapper'
    ]
  },
  DoxenCodeBox: {
    tokens: [
      'codeBox',
      'codeBoxContainer',
      'codeBoxCopied'
    ],
    children: []
  },
  DoxenCodeSwapper: {
    tokens: [
      'codeSwapper',
      'codeSwapperFileName'
    ],
    children: [
      'DoxenCodeBox',
      'DoxenTabs'
    ]
  },
  DoxenDeprecatedProp: {
    tokens: [
      'formFieldDeprecatedProp'
    ],
    children: []
  },
  DoxenDeprecationBanner: {
    tokens: [
      'deprecationBanner',
      'deprecationBannerBody',
      'deprecationBannerTitle'
    ],
    children: []
  },
  DoxenDropdown: {
    tokens: [
      'formFieldDropdown',
      'formFieldDropdownContainer',
      'formFieldDropdownError',
      'formFieldDropdownOption'
    ],
    children: [
      'FormFieldFooter',
      'FormFieldLabel',
      'FormFieldsetWrapper'
    ]
  },
  DoxenEmitLog: {
    tokens: [
      'emitLogClearButton',
      'emitLogHeader',
      'emitLogTable',
      'emitLogTableContainer',
      'emitLogTbody',
      'emitLogTd',
      'emitLogTh',
      'emitLogThead',
      'emitLogTr',
      'formFieldLabel',
      'formFieldLegend'
    ],
    children: [
      'FormFieldsetWrapper'
    ]
  },
  DoxenEmitsDocumentation: {
    tokens: [
      'componentDemoH3',
      'emitsDocumentationCode',
      'emitsDocumentationLi',
      'emitsDocumentationSpan',
      'emitsDocumentationStrong',
      'emitsDocumentationUl'
    ],
    children: [
      'DoxenCodeBox'
    ]
  },
  DoxenHeader: {
    tokens: [
      'demoHeader',
      'demoHeaderTitle'
    ],
    children: []
  },
  DoxenJsonTextarea: {
    tokens: [
      'formFieldTextarea',
      'formFieldTextareaContainer',
      'formFieldTextareaCode',
      'formFieldTextareaError',
      'formFieldError'
    ],
    children: [
      'FormFieldFooter',
      'FormFieldLabel',
      'FormFieldsetWrapper'
    ]
  },
  DoxenNumberField: {
    tokens: [
      'formFieldNumberFieldContainer',
      'formFieldNumberField',
      'formFieldNumberFieldError'
    ],
    children: [
      'FormFieldFooter',
      'FormFieldLabel',
      'FormFieldsetWrapper'
    ]
  },
  DoxenPlainText: {
    tokens: [
      'plainText'
    ],
    children: [
      'DoxenCodeBox',
      'FormFieldFooter',
      'FormFieldLabel',
      'FormFieldsetWrapper'
    ]
  },
  DoxenPropsDocumentation: {
    tokens: [
      'componentDemoH3',
      'propsDocumentationCode',
      'propsDocumentationDeprecated',
      'propsDocumentationEm',
      'propsDocumentationLi',
      'propsDocumentationSpan',
      'propsDocumentationStrong',
      'propsDocumentationUl'
    ],
    children: [
      'DoxenCodeBox'
    ]
  },
  DoxenRadioDials: {
    tokens: [
      'formFieldRadioDial',
      'formFieldRadioDialContainer',
      'formFieldRadioDialError',
      'formFieldRadioDialNameDisabled',
      'formFieldRadioDialNameError',
      'formFieldRadioDialNameLabel',
      'formFieldRadioDialsContainer'
    ],
    children: [
      'FormFieldFooter',
      'FormFieldLabel',
      'FormFieldsetWrapper'
    ]
  },
  DoxenRangeSlider: {
    tokens: [
      'formFieldRangeSlider',
      'formFieldRangeSliderContainer',
      'formFieldRangeSliderError'
    ],
    children: [
      'FormFieldFooter',
      'FormFieldLabel',
      'FormFieldsetWrapper'
    ]
  },
  DoxenSideBar: {
    tokens: [
      'sidebarButton',
      'sidebarButtonNotSelected',
      'sidebarButtonSelected',
      'sidebarContainer'
    ],
    children: []
  },
  DoxenTabs: {
    tokens: [
      'tabButton',
      'tabButtonNotSelected',
      'tabButtonSelected',
      'tabsButtonContainer',
      'tabsHeader'
    ],
    children: []
  },
  DoxenTextarea: {
    tokens: [
      'formFieldTextarea',
      'formFieldTextareaContainer',
      'formFieldTextareaError'
    ],
    children: [
      'FormFieldFooter',
      'FormFieldLabel',
      'FormFieldsetWrapper'
    ]
  },
  DoxenTextField: {
    tokens: [
      'formFieldTextField',
      'formFieldTextFieldContainer',
      'formFieldTextFieldError'
    ],
    children: [
      'FormFieldFooter',
      'FormFieldLabel',
      'FormFieldsetWrapper'
    ]
  },
  FallBack: {
    tokens: [],
    children: []
  },
  FormFieldFooter: {
    tokens: [
      'formFieldError',
      'formFieldMessage'
    ],
    children: []
  },
  FormFieldLabel: {
    tokens: [
      'formFieldLabel',
      'formFieldLegend',
      'formFieldLegendDisabled',
      'formFieldLegendError',
      'formFieldRequired'
    ],
    children: []
  },
  FormFieldsetWrapper: {
    tokens: [
      'formFieldFieldset'
    ],
    children: []
  },
  HtmlFragments: {
    tokens: [],
    children: []
  },
  OptionalCustomComponent: {
    tokens: [],
    children: [
      'HtmlFragments'
    ]
  },
  VueDoxen: {
    tokens: [],
    children: [
      'VueDoxenCustom'
    ]
  },
  VueDoxenCustom: {
    tokens: [
      'vueDoxen'
    ],
    children: [
      'ComponentDemo'
    ]
  },
  VueDoxenCustomDescription: {
    tokens: [],
    children: []
  }
};

/**
 * Recursively finds the tokens used by a given component and its
 * children/grand-children/great-grand-children, by component name.
 * Used to slim down the amount of tokens displayed on a demo page
 * to just the one relevant to that component being demo'd.
 *
 * @param  {string}   componentName  Name of the component
 * @return {string[]}                Array of all relevant tokens
 */
function getTokensFromComponent (componentName) {
  if (!components[componentName]) {
    console.log('Component tokens not listed');
  }
  let tokens = [
    ...components[componentName].tokens
  ];
  components[componentName].children.forEach((child) => {
    tokens = [
      ...tokens,
      ...getTokensFromComponent(child)
    ];
  });
  return Array.from(new Set(tokens));
};

/**
 * Slims down the list of style tokens to just the ones relevant to
 * the component being demo'd, to make the demo page easier to work
 * with.
 *
 * @param  {object} styleTokens    Full styleTokens object
 * @param  {string} componentName  Name of the component being demo'd
 * @return {object}                Slimmed down styleTokens object
 */
export const styleTokenPropToDemo = function (styleTokens, componentName) {
  styleTokens = styleTokens || {};
  componentName = componentName || '';
  const tokens = {};

  /**
   * VueDoxen and VueDoxenCustom both have dynamic components
   * that we can't easily track here, so they shouldn't
   * be slimmed down, they should just take the entire
   * styleTokens prop.
   */
  if (['VueDoxen', 'VueDoxenCustom'].includes(componentName)) {
    for (const token of ALL_STYLE_TOKENS) {
      tokens[token] = styleTokens[token] || '';
    }
  } else {
    const usedTokens = getTokensFromComponent(componentName);
    for (const token of usedTokens) {
      tokens[token] = styleTokens[token] || '';
    }
  }

  return {
    styleTokens: {
      component: DoxenJsonTextarea,
      props: {
        label: 'Style Tokens',
        modelValue: tokens,
        styleTokens
      }
    }
  };
};
