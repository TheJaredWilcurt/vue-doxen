import DoxenButton from '@/components/DoxenButton.vue';

import { styleTokenPropToDemo } from '@@@/helpers/tokensByComponent.js';

export const createDoxenButtonDemo = function (styleTokens) {
  return {
    component: DoxenButton,
    description: 'Ah, the common button component. Every component library has one. This page demos emits.',
    propsToDemo: {
      ...styleTokenPropToDemo(styleTokens, 'DoxenButton')
    },
    emitsToDemo: {
      click: {
        description: 'Emits when button is clicked.',
        value: 'The native mouse click event (<code>$event</code>).'
      }
    }
  };
};
