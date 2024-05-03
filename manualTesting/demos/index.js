import {
  DoxenCheckbox,
  DoxenDropdown,
  DoxenJsonTextarea,
  DoxenPlainText,
  DoxenRadioDials,
  DoxenSideBar,
  DoxenTextarea,
  DoxenTextField,
  VueDoxen
} from '@/library.js';

import DoxenTabs from '@/components/DoxenTabs.vue';
import DummyCompositionApi from '@@@/components/DummyCompositionApi.vue';
import DummyScriptSetupApi from '@@@/components/DummyScriptSetupApi.vue';

import { createDoxenTabsDemo } from '@@@/demos/doxenTabsDemo.js';
import { createDummyScriptSetupApiDemo } from '@@@/demos/dummyScriptSetupApiDemo.js';

const createDoxenDemos = function (components, styleTokens) {
  const demos = {};
  const addStyleTokensPropDemo = function (propsToDemo) {
    propsToDemo.styleTokens = {
      component: DoxenJsonTextarea,
      props: {
        label: 'Style Tokens',
        modelValue: styleTokens,
        styleTokens
      }
    };
  };
  const addOptionsPropDemo = function (propsToDemo) {
    propsToDemo.modelValue = {
      component: DoxenPlainText,
      props: {
        label: 'ModelValue',
        modelValue: 'kiva',
        styleTokens
      }
    };
    propsToDemo.options = {
      component: DoxenJsonTextarea,
      props: {
        label: 'Options',
        modelValue: [
          {
            name: 'Kiva.org',
            value: 'kiva'
          },
          {
            name: 'Good.store',
            value: 'goodstore'
          }
        ],
        styleTokens
      }
    };
  };

  for (const componentName in components) {
    demos[componentName] = {
      component: components[componentName],
      propsToDemo: {}
    };
    if (components[componentName]?.props?.styleTokens) {
      addStyleTokensPropDemo(demos[componentName].propsToDemo);
    }
    if (components[componentName]?.props?.options) {
      addOptionsPropDemo(demos[componentName].propsToDemo);
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

export const doxenComponentsToDemoWithStyleTokens = {
  DoxenCheckbox,
  DoxenDropdown,
  DoxenJsonTextarea,
  DoxenRadioDials,
  DoxenTextarea,
  DoxenTextField,
  DoxenSideBar,
  VueDoxen
};

export const componentsToListInSidebar = {
  DummyCompositionApi,
  DummyScriptSetupApi,
  DoxenTabs,
  ...doxenComponentsToDemoWithStyleTokens
};

export const createDemos = function (styleTokens) {
  return {
    DummyCompositionApi,
    DummyScriptSetupApi: createDummyScriptSetupApiDemo(styleTokens),
    DoxenTabs: createDoxenTabsDemo(styleTokens),
    ...createDoxenDemos(doxenComponentsToDemoWithStyleTokens, styleTokens)
  };
};
