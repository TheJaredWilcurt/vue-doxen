import DoxenEmitsDocumentation from '@/components/DoxenEmitsDocumentation.vue';
import DoxenJsonTextarea from '@/components/formFields/DoxenJsonTextarea.vue';

export const createDoxenEmitsDocumentationDemo = function (styleTokens) {
  return {
    component: DoxenEmitsDocumentation,
    propsToDemo: {
      emitsToDemo: {
        component: DoxenJsonTextarea,
        props: {
          label: 'Emits to Demo',
          modelValue: {
            'update:modelValue': {
              description: 'The logs being displayed',
              value: 'An array of logs.',
              example: 'v-model="logs"'
            },
            click: {
              description: 'Fired when the user clicks the "clear" button.',
              value: 'Boolean, <code>true</code> means hard reset.',
              example: '@click="reset"'
            }
          },
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
      }
    }
  };
};
