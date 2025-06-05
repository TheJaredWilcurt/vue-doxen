import DoxenAccordion from '@/components/DoxenAccordion.vue';
import DoxenJsonTextarea from '@/components/formFields/DoxenJsonTextarea.vue';

export const createDoxenAccordionDemo = function (styleTokens) {
  return {
    component: DoxenAccordion,
    description: 'A component that animates the visibility of content.',
    propsToDemo: {
      styleTokens: {
        component: DoxenJsonTextarea,
        props: {
          label: 'Style Tokens',
          modelValue: styleTokens,
          styleTokens
        }
      },
      durationMs: {
        description: 'Controls the length of time, in milliseconds (ms) that the animation lasts.'
      },
      show: {
        description: 'Determines if the accordion is expanded (true) or collapsed (false).'
      },
      timingFunction: {
        description: 'Any valid CSS transition-timing-function value.'
      }
    },
    slotsToDemo: {
      default: '<div style="background: #000; color: #FFF; height: 200px;">\n  Content\n</div>'
    }
  };
};
