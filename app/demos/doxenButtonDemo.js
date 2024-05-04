import DoxenButton from '@/components/DoxenButton.vue';
import DoxenJsonTextarea from '@/components/formFields/DoxenJsonTextarea.vue';

export const createDoxenButtonDemo = function (styleTokens) {
  return {
    component: DoxenButton,
    description: 'Ah, the common button component. Every component library has one. This page demos emits.',
    propsToDemo: {
      styleTokens: {
        component: DoxenJsonTextarea,
        props: {
          label: 'Style Tokens',
          modelValue: styleTokens,
          styleTokens
        }
      }
    }
  };
};
