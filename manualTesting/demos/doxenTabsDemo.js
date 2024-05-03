import DoxenDropdown from '@/components/formFields/DoxenDropdown.vue';
import DoxenJsonTextarea from '@/components/formFields/DoxenJsonTextarea.vue';
import DoxenTabs from '@/components/DoxenTabs.vue';

export const createDoxenTabsDemo = function (styleTokens) {
  return {
    component: DoxenTabs,
    description: 'These tabs are primarily used by the <code>CodeSwapper</code> component internally in Vue-Doxen.',
    propsToDemo: {
      modelValue: {
        component: DoxenJsonTextarea,
        props: {
          label: 'Model Value',
          modelValue: 'Vue',
          styleTokens
        }
      },
      styleTokens: {
        component: DoxenJsonTextarea,
        props: {
          label: 'Style Tokens',
          modelValue: styleTokens,
          styleTokens
        }
      },
      tabs: {
        component: DoxenJsonTextarea,
        props: {
          label: 'Model Value',
          modelValue: ['Vue', 'JavaScript'],
          styleTokens
        }
      }
    },
    slotsToDemo: {
      default: '<code>FileName.ext</code>'
    }
  };
};
