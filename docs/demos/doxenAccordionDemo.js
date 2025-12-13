import DoxenAccordion from '@/components/DoxenAccordion.vue';
import DoxenAccordionDescription from '@@@/components/DoxenAccordionDescription.vue';

import { styleTokenPropToDemo } from '@@@/helpers/tokensByComponent.js';

export const createDoxenAccordionDemo = function (styleTokens) {
  return {
    component: DoxenAccordion,
    description: {
      component: DoxenAccordionDescription
    },
    propsToDemo: {
      ...styleTokenPropToDemo(styleTokens, 'DoxenAccordion'),
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
      default: '<div style="background: #000; color: #FFF; height: 200px;">\n  My content.\n</div>'
    }
  };
};
