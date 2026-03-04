import { demos as testDemos } from '../serializeTestDemos.js';

import DxButton from './DxButton.vue';
import DxButtonDeprecation from './DxButtonDeprecation.vue';
import DxButtonDescription from './DxButtonDescription.vue';
import DxButtonImport from './DxButtonImport.vue';

// Demo-only definitions: realistic DxButton demo modeled after a real
// atc-alloy component. These files will be deleted before merging.
const demoDemos = {
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

// Combined: all test demos + demo-only demos, for the demo generation script.
export const demos = {
  ...demoDemos,
  ...testDemos
};
