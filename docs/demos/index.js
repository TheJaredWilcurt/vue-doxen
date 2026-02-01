import DoxenAccordion from '@/components/DoxenAccordion.vue';
import DoxenButton from '@/components/DoxenButton.vue';
import DoxenCodeBox from '@/components/DoxenCodeBox.vue';
import DoxenCodeSwapper from '@/components/DoxenCodeSwapper.vue';
import DoxenDeprecationBanner from '@/components/DoxenDeprecationBanner.vue';
import DoxenEmitsDocumentation from '@/components/DoxenEmitsDocumentation.vue';
import DoxenHeader from '@/components/DoxenHeader.vue';
import DoxenPropsDocumentation from '@/components/DoxenPropsDocumentation.vue';
import DoxenSideBar from '@/components/DoxenSideBar.vue';
import DoxenTabs from '@/components/DoxenTabs.vue';
import VueDoxen from '@/components/VueDoxen.vue';
import VueDoxenCustom from '@/components/VueDoxenCustom.vue';
import DoxenCheckbox from '@/components/formFields/DoxenCheckbox.vue';
import DoxenDeprecatedProp from '@/components/formFields/DoxenDeprecatedProp.vue';
import DoxenDropdown from '@/components/formFields/DoxenDropdown.vue';
import DoxenEmitLog from '@/components/formFields/DoxenEmitLog.vue';
import DoxenJsonTextarea from '@/components/formFields/DoxenJsonTextarea.vue';
import DoxenNumberField from '@/components/formFields/DoxenNumberField.vue';
import DoxenPlainText from '@/components/formFields/DoxenPlainText.vue';
import DoxenRadioDials from '@/components/formFields/DoxenRadioDials.vue';
import DoxenRangeSlider from '@/components/formFields/DoxenRangeSlider.vue';
import DoxenTextField from '@/components/formFields/DoxenTextField.vue';
import DoxenTextarea from '@/components/formFields/DoxenTextarea.vue';
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
import { styleTokenPropToDemo } from '@@@/helpers/tokensByComponent.js';

const isLocal = globalThis?.location?.href?.includes('localhost');

const createDoxenDemos = function (components, styleTokens) {
  const demos = {};
  const addStyleTokensPropDemo = function (propsToDemo, componentName) {
    propsToDemo.styleTokens = {
      ...styleTokenPropToDemo(styleTokens, componentName).styleTokens
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
      addStyleTokensPropDemo(demos[componentName].propsToDemo, componentName);
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
  DoxenDeprecationBanner,
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
