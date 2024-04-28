import {
  DoxenCheckbox,
  DoxenDropdown,
  DoxenJsonTextarea,
  DoxenRadioDials,
  DoxenSideBar,
  DoxenTextarea,
  DoxenTextField,
  VueDoxen
} from '@/library.js';

import DummyCompositionApi from '@@@/components/DummyCompositionApi.vue';
import DummyScriptSetupApi from '@@@/components/DummyScriptSetupApi.vue';

import { dummyScriptSetupApiDemo } from '@@@/demos/dummyScriptSetupApiDemo.js';

export const componentsToDemoWithStyleTokens = {
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
  ...componentsToDemoWithStyleTokens
};

export const demos = {
  DummyCompositionApi,
  DummyScriptSetupApi: dummyScriptSetupApiDemo
};
