import DescriptionWrapper from './components/DescriptionWrapper.vue';
import DxButton from './components/DxButton.vue';
import DxButtonDeprecation from './components/DxButtonDeprecation.vue';
import DxButtonDescription from './components/DxButtonDescription.vue';
import DxButtonImport from './components/DxButtonImport.vue';
import StandaloneDescription from './components/StandaloneDescription.vue';

// Shared demo definitions used by the test server (router.js)
// and the sandbox generation script (scripts/runSerializeDemo.js).
export const demos = {
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
  },
  // Realistic demo modeled after atc-alloy components. All 4 text fields are
  // Vue SFC components, exercising the full Playwright extraction pipeline.
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
  }
};
