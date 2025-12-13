import DoxenCodeBox from '@/components/DoxenCodeBox.vue';
import DoxenTextarea from '@/components/formFields/DoxenTextarea.vue';

import { styleTokenPropToDemo } from '@@@/helpers/tokensByComponent.js';

export const createDoxenCodeBoxDemo = function (styleTokens) {
  return {
    component: DoxenCodeBox,
    description: 'This component will syntax apply HTML syntax highlighting to any code passed in that begins with &lt;, and for anything else, it uses JavaScript syntax highlighting. Clicking on the code will automatically copy it to the clipboard.',
    importStatement: 'import { DoxenCodeBox } from \'vue-doxen\'',
    propsToDemo: {
      ...styleTokenPropToDemo(styleTokens, 'DoxenCodeBox'),
      copy: {
        description: 'When enabled, clicking on the box copies the code to your clipboard.'
      },
      code: {
        component: DoxenTextarea,
        props: {
          label: 'Code',
          modelValue: '<ExampleCode :prop="true" />',
          styleTokens
        }
      }
    }
  };
};
