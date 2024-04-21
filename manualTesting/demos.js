import { DoxenJsonTextarea } from '@/vue-doxen.js';

export const createDemos = function (components, styleTokens) {
  const demos = {};
  for (const componentName in components) {
    demos[componentName] = {
      component: components[componentName],
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
  }
  return demos;
};
