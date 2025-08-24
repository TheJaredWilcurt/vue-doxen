import {
  DoxenAccordion,
  DoxenCheckbox,
  DoxenCodeBox,
  DoxenCodeSwapper,
  DoxenDeprecatedProp,
  DoxenDropdown,
  DoxenEmitLog,
  DoxenEmitsDocumentation,
  DoxenHeader,
  DoxenJsonTextarea,
  DoxenNumberField,
  DoxenPlainText,
  DoxenPropsDocumentation,
  DoxenRadioDials,
  DoxenRangeSlider,
  DoxenSideBar,
  DoxenTextField,
  DoxenTextarea,
  VueDoxen,
  VueDoxenCustom
} from '@/library.js';

import DoxenButton from '@/components/DoxenButton.vue';
import DoxenTabs from '@/components/DoxenTabs.vue';
import DummyCompositionApi from '@@@/components/DummyCompositionApi.vue';
import DummyPropsOverride from '@@@/components/DummyPropsOverride.vue';
import DummyScriptSetupApi from '@@@/components/DummyScriptSetupApi.vue';

import { createDoxenAccordionDemo } from '@@@/demos/doxenAccordionDemo.js';
import { createDoxenButtonDemo } from '@@@/demos/doxenButtonDemo.js';
import { createDoxenCodeBoxDemo } from '@@@/demos/doxenCodeBoxDemo.js';
import { createDoxenCodeSwapperDemo } from '@@@/demos/doxenCodeSwapperDemo.js';
import { createDoxenEmitLogDemo } from '@@@/demos/doxenEmitLogDemo.js';
import { createDoxenEmitsDocumentationDemo } from '@@@/demos/doxenEmitsDocumentationDemo.js';
import { createDoxenPropsDocumentationDemo } from '@@@/demos/doxenPropsDocumentationDemo.js';
import { createDoxenTabsDemo } from '@@@/demos/doxenTabsDemo.js';
import { createDummyPropsOverrideDemo } from '@@@/demos/dummyPropsOverrideDemo.js';
import { createDummyScriptSetupApiDemo } from '@@@/demos/dummyScriptSetupApiDemo.js';

const isLocal = location.href.includes('localhost');

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
        asCode: true,
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

  demos.DoxenPlainText.propsToDemo.modelValue = {
    component: DoxenTextarea,
    props: {
      label: 'Model Value',
      modelValue: '',
      styleTokens: styleTokens
    }
  };

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
  DoxenDeprecatedProp,
  DoxenDropdown,
  DoxenHeader,
  DoxenJsonTextarea,
  DoxenNumberField,
  DoxenPlainText,
  DoxenRadioDials,
  DoxenRangeSlider,
  DoxenTextField,
  DoxenTextarea,
  DoxenSideBar,
  VueDoxen,
  VueDoxenCustom
};

function makeListOfSidebarComponents () {
  let localComponents = {};
  if (isLocal) {
    localComponents = {
      DummyCompositionApi,
      DummyScriptSetupApi,
      DummyPropsOverride
    };
  }
  return {
    ...localComponents,
    DoxenAccordion,
    DoxenButton,
    DoxenCodeBox,
    DoxenCodeSwapper,
    DoxenEmitLog,
    DoxenEmitsDocumentation,
    DoxenTabs,
    DoxenPropsDocumentation,
    ...doxenComponentsToDemoWithStyleTokens
  };
}
export const componentsToListInSidebar = makeListOfSidebarComponents();

export const createDemos = function (styleTokens) {
  let localDemos = {};
  if (isLocal) {
    localDemos = {
      DummyCompositionApi,
      DummyScriptSetupApi: createDummyScriptSetupApiDemo(styleTokens),
      DummyPropsOverride: createDummyPropsOverrideDemo(styleTokens)
    };
  }
  return {
    ...localDemos,
    DoxenAccordion: createDoxenAccordionDemo(styleTokens),
    DoxenButton: createDoxenButtonDemo(styleTokens),
    DoxenCodeBox: createDoxenCodeBoxDemo(styleTokens),
    DoxenCodeSwapper: createDoxenCodeSwapperDemo(styleTokens),
    DoxenEmitLog: createDoxenEmitLogDemo(styleTokens),
    DoxenEmitsDocumentation: createDoxenEmitsDocumentationDemo(styleTokens),
    DoxenPropsDocumentation: createDoxenPropsDocumentationDemo(styleTokens),
    DoxenTabs: createDoxenTabsDemo(styleTokens),
    ...createDoxenDemos(doxenComponentsToDemoWithStyleTokens, styleTokens)
  };
};
