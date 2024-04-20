<template>
  <div>
    <header>
      <h1>Vue Doxen</h1>
      <StyleSwapper v-model="styleTokens" />
    </header>
    <DoxenSideBar
      v-model="selectedDemo"
      :demos="demos"
      :styleTokens="styleTokens"
    />
    <VueDoxen
      v-model="selectedDemo"
      :demos="demos"
      :styleTokens="styleTokens"
    />
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
  },
  data: function () {
    return {
      demos: {
        doxenCheckboxDemo,
        doxenDropdownDemo,
        doxenRadioDialsDemo,
        doxenTextareaDemo,
        doxenTextFieldDemo
      },
      selectedDemo: '',
      styleTokens: {}
    };
  },
  methods: {
  },
  computed: {
  }
};
</script>
