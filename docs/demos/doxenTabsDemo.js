import DoxenTabs from '@/components/DoxenTabs.vue';
import DoxenJsonTextarea from '@/components/formFields/DoxenJsonTextarea.vue';
import DoxenTextField from '@/components/formFields/DoxenTextField.vue';
import DoxenTextarea from '@/components/formFields/DoxenTextarea.vue';

import { styleTokenPropToDemo } from '@@@/helpers/tokensByComponent.js';

export const createDoxenTabsDemo = function (styleTokens) {
  return {
    component: DoxenTabs,
    description: 'These tabs are primarily used by the <code>DoxenCodeSwapper</code> component internally in Vue-Doxen.',
    propsToDemo: {
      ...styleTokenPropToDemo(styleTokens, 'DoxenTabs'),
      modelValue: {
        component: DoxenTextarea,
        props: {
          label: 'Model Value',
          styleTokens
        }
      },
      tabs: {
        component: DoxenJsonTextarea,
        props: {
          label: 'tabs',
          modelValue: ['Vue', 'JavaScript'],
          styleTokens
        }
      }
    },
    slotsToDemo: {
      default: {
        component: DoxenTextField,
        props: {
          modelValue: '<code>FileName.ext</code>',
          label: 'Default Slot',
          styleTokens
        },
        events: {
          'update:model-value': function (value) {
            console.log({ value });
          }
        }
      }
    }
  };
};
