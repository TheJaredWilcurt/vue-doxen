import DoxenCodeSwapper from '@/components/DoxenCodeSwapper.vue';
import DoxenJsonTextarea from '@/components/formFields/DoxenJsonTextarea.vue';

export const createDoxenCodeSwapperDemo = function (styleTokens) {
  return {
    component: DoxenCodeSwapper,
    description: 'This component allows you to pass in an optional file name, and various code examples to switch (or swap) between. The code is syntax highlighted, and clicking it will copy to the clipboard. Click the "code type" tabs, will store a "vueDoxenTab" value in local storage. It remembers the most recently clicked tabs in order (without duplicates), so that on page load, the user\'s preferred tab type will be selected automatically.',
    importStatement: 'import { DoxenCodeSwapper } from \'vue-doxen\';',
    propsToDemo: {
      copy: {
        description: 'When enabled, clicking on the box copies the code to your clipboard.'
      },
      codeTypes: {
        component: DoxenJsonTextarea,
        props: {
          label: 'Code Types',
          modelValue: {
            Vue: '<ExampleCode :prop="true" />',
            JavaScript: 'const exampleCode = { prop: true };'
          },
          styleTokens
        }
      },
      fileName: {
        component: DoxenJsonTextarea,
        props: {
          label: 'File Name(s)',
          modelValue: {
            Vue: 'Example.vue',
            JavaScript: 'Example.js'
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
