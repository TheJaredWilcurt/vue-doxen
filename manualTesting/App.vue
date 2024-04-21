<template>
  <div>
    <header>
      <div class="container">
        <h1>Vue Doxen</h1>
        <StyleSwapper v-model="styleTokens" />
      </div>
    </header>
    <div class="container">
      <DoxenSideBar
        v-model="selectedDemo"
        :demos="demos"
        :styleTokens="styleTokens"
      >
        <template #default>
          <h4>Components:</h4>
        </template>
      </DoxenSideBar>
      <VueDoxen
        v-model="selectedDemo"
        :demos="demos"
        :styleTokens="styleTokens"
      />
    </div>
  </div>
</template>

<script>
import _cloneDeep from 'lodash.clonedeep';

import {
  DoxenCheckbox,
  DoxenDropdown,
  DoxenJsonTextarea,
  DoxenRadioDials,
  DoxenSideBar,
  DoxenTextarea,
  DoxenTextField,
  styleTokensBuiltIn,
  VueDoxen
} from '@/vue-doxen.js';

import StyleSwapper from '@@@/components/StyleSwapper.vue';

import { createDemos } from '@@@/demos.js';

export default {
  name: 'App',
  components: {
    DoxenSideBar,
    StyleSwapper,
    VueDoxen
  },
  data: function () {
    return {
      selectedDemo: 'DoxenCheckbox',
      styleTokens: styleTokensBuiltIn
    };
  },
  computed: {
    demos: function () {
      const tokens = _cloneDeep(this.styleTokens);
      const components = {
        DoxenCheckbox,
        DoxenDropdown,
        DoxenJsonTextarea,
        DoxenRadioDials,
        DoxenTextarea,
        DoxenTextField,
        DoxenSideBar,
        VueDoxen
      };
      return createDemos(components, tokens);
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 0px auto;
}
header {
  display: flex;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
}
h1 {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  width: auto;
  margin-right: auto;
  margin-bottom: 0px;
}
</style>
