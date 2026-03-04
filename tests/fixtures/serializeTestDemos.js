import DescriptionWrapper from './DescriptionWrapper.vue';
import StandaloneDescription from './StandaloneDescription.vue';

// Shared demo definitions used by the test server (serializeTestRouter.js)
// and the Playwright spec.
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
  }
};
