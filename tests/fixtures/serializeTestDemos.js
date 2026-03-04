import DescriptionWrapper from './DescriptionWrapper.vue';
import DxButton from './DxButton.vue';
import DxButtonDeprecation from './DxButtonDeprecation.vue';
import DxButtonDescription from './DxButtonDescription.vue';
import DxButtonImport from './DxButtonImport.vue';
import StandaloneDescription from './StandaloneDescription.vue';

// Shared demo definitions used by both the test server (serializeTestRouter.js)
// and the runSerializeDemo.js script.
export const demos = {
  // Realistic demo modeled after a real atc-alloy component.
  // All 4 text fields are Vue components (like BsdsDescription, ImportStatement, etc.).
  // Has real props with types/validators/defaults, emits, and slots.
  DxButton: {
    component: DxButton,
    description: {
      component: DxButtonDescription
    },
    importStatement: {
      component: DxButtonImport,
      props: { name: 'DxButton', slim: true }
    },
    deprecationNotice: {
      component: DxButtonDeprecation
    },
    propsToDemo: {
      label: {
        description: 'Text displayed inside the button when no slot content is provided.'
      },
      variant: {
        description: 'Visual style variant. Use <code>ghost</code> for toolbar buttons and <code>danger</code> for destructive actions.'
      },
      size: {
        description: 'Controls the button dimensions.'
      },
      disabled: {
        description: 'Prevents interaction and applies disabled styling.'
      },
      href: {
        description: 'When set, the button renders as an anchor element. Use for navigation actions.'
      },
      ariaLabel: {
        description: 'Accessible label for the button, used when the visible text is insufficient.',
        deprecated: true
      }
    },
    emitsToDemo: {
      click: {
        description: 'Emitted when the user clicks the button, presses Enter, or presses Space while focused.'
      }
    },
    slotsToDemo: {
      default: 'Button'
    }
  },
  StringDemo: {
    component: {
      name: 'StringDemo',
      template: '<div>String demo</div>',
      props: {
        size: {
          type: String,
          default: 'md',
          validator: (v) => ['sm', 'md', 'lg'].includes(v)
        }
      }
    },
    description: '<p>A simple <strong>string</strong> description.</p>',
    importStatement: 'import { StringDemo } from \'my-lib\';',
    propsToDemo: {
      size: { description: 'Controls the size.' }
    },
    emitsToDemo: {
      clicked: { description: 'Emitted on click.' }
    },
    slotsToDemo: { default: 'Slot content' }
  },
  ComponentDemo: {
    component: {
      name: 'ComponentDemo',
      template: '<div>Component demo</div>',
      props: {
        disabled: {
          type: Boolean,
          default: false
        }
      }
    },
    description: {
      component: DescriptionWrapper,
      props: {
        message: '<p>Wrapper description with <code>HTML</code>.</p>'
      }
    }
  },
  ComponentOnlyDemo: {
    component: {
      name: 'ComponentOnlyDemo',
      template: '<div>Component only demo</div>',
      props: {}
    },
    description: {
      component: StandaloneDescription
    }
  }
};
