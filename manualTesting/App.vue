<template>
  <div>
    <header>
      <div class="container">
        <div class="logo-container">
          <h1>Vue<br />Doxen</h1>
          <img
            src="@@@/assets/vue-doxen-logo-small.png"
            alt="A doxen dog with a green chest in the shape of the Vue logo"
          />
        </div>
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
} from '@/library.js';

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
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0px auto;
}
.logo-container {
  position: relative;
}
header {
  display: flex;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Hepta Slab', serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-weight: 750;
}
h1 {
  position: relative;
  top: 30px;
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  width: auto;
  margin-right: auto;
  margin-bottom: 0px;
  color: #41B883;
  font-size: 40px;
  font-weight: 900;
  text-shadow: 7px -2px 0px #34495E,
               7px  2px 0px #34495E,
               2px  2px 0px #34495E,
              -2px -2px 0px #34495E,
               2px -2px 0px #34495E,
              -2px  2px 0px #34495E;
  z-index: 2;
}
img {
  position: absolute;
  top: -3px;
  left: 98px;
  height: 106px;
  z-index: 1;
}
</style>
