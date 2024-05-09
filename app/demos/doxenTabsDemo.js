import DoxenTabs from '@/components/DoxenTabs.vue';
import DoxenJsonTextarea from '@/components/formFields/DoxenJsonTextarea.vue';
import DoxenTextarea from '@/components/formFields/DoxenTextarea.vue';

export const createDoxenTabsDemo = function (styleTokens) {
  return {
    component: DoxenTabs,
    description: 'These tabs are primarily used by the <code>CodeSwapper</code> component internally in Vue-Doxen.',
    propsToDemo: {
      modelValue: {
        component: DoxenTextarea,
        props: {
          label: 'Model Value',
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
          label: 'tabs',
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
