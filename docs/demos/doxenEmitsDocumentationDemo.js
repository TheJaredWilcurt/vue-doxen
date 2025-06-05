import DoxenEmitsDocumentation from '@/components/DoxenEmitsDocumentation.vue';
import DoxenJsonTextarea from '@/components/formFields/DoxenJsonTextarea.vue';

export const createDoxenEmitsDocumentationDemo = function (styleTokens) {
  return {
    component: DoxenEmitsDocumentation,
    description: [
      '<p>This component is displayed at the very bottom of a demo,',
      'when the component being documented has emits. It will also',
      'auto-generate some basic documentation for',
      '<code>update:model-value</code> and',
      '<code>update:modelValue</code>.</p>',
      '<p>Try removing the data inside the objects in the Emits to',
      'Demo input to see the defaults appear.</p>'
    ].join(' '),
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
