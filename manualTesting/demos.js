import { DoxenJsonTextarea } from '@/library.js';

export const createDemos = function (components, styleTokens) {
  const demos = {};
  const propsToDemo = {
    styleTokens: {
      component: DoxenJsonTextarea,
      props: {
        label: 'Style Tokens',
        modelValue: styleTokens,
        styleTokens
      }
    }
  };
  for (const componentName in components) {
    demos[componentName] = {
      component: components[componentName]
    };
    if (components[componentName]?.props?.styleTokens) {
      demos[componentName].propsToDemo = propsToDemo;
    }
  }

  // DoxenSideBar
  demos.DoxenSideBar.propsToDemo.demos = {
    component: DoxenJsonTextarea,
    props: {
      label: 'Demos',
      modelValue: {
        DummyComponent: { name: 'DummyComponent' },
        OtherComponent: { name: 'OtherComponent' }
      },
      styleTokens: styleTokens
    }
  };
  return demos;
};
