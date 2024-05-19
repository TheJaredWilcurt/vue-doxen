import {
  DoxenCheckbox,
  DoxenDropdown,
  DoxenEmitLog,
  DoxenEmitsDocumentation,
  DoxenHeader,
  DoxenJsonTextarea,
  DoxenPlainText,
  DoxenPropsDocumentation,
  DoxenRadioDials,
  DoxenSideBar,
  DoxenTextField,
  DoxenTextarea,
  VueDoxen,
  VueDoxenCustom
} from '@/library.js';

import DoxenButton from '@/components/DoxenButton.vue';
import DoxenTabs from '@/components/DoxenTabs.vue';
import DummyCompositionApi from '@@@/components/DummyCompositionApi.vue';
import DummyScriptSetupApi from '@@@/components/DummyScriptSetupApi.vue';

import { createDoxenButtonDemo } from '@@@/demos/doxenButtonDemo.js';
import { createDoxenEmitLogDemo } from '@@@/demos/doxenEmitLogDemo.js';
import { createDoxenPropsDocumentationDemo } from '@@@/demos/doxenPropsDocumentationDemo.js';
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
    if (
      componentName.toLowerCase().includes('dropdown') ||
      componentName.toLowerCase().includes('radio')
    ) {
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
  DoxenEmitsDocumentation,
  DoxenHeader,
  DoxenJsonTextarea,
  DoxenPlainText,
  DoxenRadioDials,
  DoxenTextField,
  DoxenTextarea,
  DoxenSideBar,
  VueDoxen,
  VueDoxenCustom
};

export const componentsToListInSidebar = {
  DummyCompositionApi,
  DummyScriptSetupApi,
  DoxenButton,
  DoxenEmitLog,
  DoxenTabs,
  DoxenPropsDocumentation,
  ...doxenComponentsToDemoWithStyleTokens
};

export const createDemos = function (styleTokens) {
  return {
    DummyCompositionApi,
    DummyScriptSetupApi: createDummyScriptSetupApiDemo(styleTokens),
    DoxenButton: createDoxenButtonDemo(styleTokens),
    DoxenEmitLog: createDoxenEmitLogDemo(styleTokens),
    DoxenPropsDocumentation: createDoxenPropsDocumentationDemo(styleTokens),
    DoxenTabs: createDoxenTabsDemo(styleTokens),
    ...createDoxenDemos(doxenComponentsToDemoWithStyleTokens, styleTokens)
  };
};
