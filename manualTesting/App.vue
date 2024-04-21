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
import {
  DoxenSideBar,
  styleTokensBuiltIn,
  VueDoxen
} from '@/vue-doxen.js';

import StyleSwapper from '@@@/components/StyleSwapper.vue';

import { doxenCheckboxDemo } from '@@@/demos/doxenCheckboxDemo.js';
import { doxenDropdownDemo } from '@@@/demos/doxenDropdownDemo.js';
import { doxenRadioDialsDemo } from '@@@/demos/doxenRadioDialsDemo.js';
import { doxenTextFieldDemo } from '@@@/demos/doxenTextFieldDemo.js';
import { doxenTextareaDemo } from '@@@/demos/doxenTextareaDemo.js';

export default {
  name: 'App',
  components: {
    DoxenSideBar,
    StyleSwapper,
    VueDoxen
  },
  constants: {
    demos: {
      doxenCheckboxDemo,
      doxenDropdownDemo,
      doxenRadioDialsDemo,
      doxenTextareaDemo,
      doxenTextFieldDemo
    }
  },
  data: function () {
    return {
      selectedDemo: 'doxenCheckboxDemo',
      styleTokens: styleTokensBuiltIn
    };
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
