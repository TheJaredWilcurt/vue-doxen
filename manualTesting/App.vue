<template>
  <div>
    APP
    {{ selectedDemo }}
    {{ { bool, radios, message, errorMessage } }}
    <StyleSwapper />
    <div style="display: flex; flex-wrap: wrap;">
      <DoxenCheckbox
        v-model="bool"
        v-bind="commonProps"
        name="Is Required"
      />
      <DoxenRadioDials
        v-model="radios"
        v-bind="commonProps"
        label="DoxenRadioDials"
        :options="[
          {
            name: 'Item 1',
            value: 1
          },
          {
            name: 'Item 2',
            value: 2
          }
        ]"
      />
      <DoxenTextarea
        v-model="message"
        v-bind="commonProps"
        label="Message"
      />
      <DoxenTextField
        v-model="errorMessage"
        v-bind="commonProps"
        label="Error Message"
      />
    </div>

    <DoxenSideBar
      v-model="selectedDemo"
      :demos="demos"
      :styleTokens="styleTokensBuiltIn"
    />
    <VueDoxen
      v-model="selectedDemo"
      :demos="demos"
      :styleTokens="styleTokensBuiltIn"
    />
  </div>
</template>

<script>
import {
  DoxenCheckbox,
  DoxenRadioDials,
  DoxenSideBar,
  DoxenTextarea,
  DoxenTextField,
  styleTokensBuiltIn,
  VueDoxen
} from '@/vue-doxen.js';

import { doxenCheckboxDemo } from '@@@/demos/doxenCheckboxDemo.js';
import { doxenRadioDialsDemo } from '@@@/demos/doxenRadioDialsDemo.js';
import { doxenTextFieldDemo } from '@@@/demos/doxenTextFieldDemo.js';
import { doxenTextareaDemo } from '@@@/demos/doxenTextareaDemo.js';

import StyleSwapper from '@@@/components/StyleSwapper.vue';

export default {
  name: 'App',
  components: {
    DoxenCheckbox,
    DoxenRadioDials,
    DoxenSideBar,
    DoxenTextarea,
    DoxenTextField,
    StyleSwapper,
    VueDoxen
  },
  constants: {
    styleTokensBuiltIn
  },
  data: function () {
    return {
      radios: null,
      bool: true,
      message: '',
      errorMessage: '',
      selectedDemo: '',
      demos: {
        doxenCheckboxDemo,
        doxenRadioDialsDemo,
        doxenTextareaDemo,
        doxenTextFieldDemo
      }
    };
  },
  computed: {
    commonProps: function () {
      return {
        label: 'Label',
        required: this.bool,
        errorMessage: this.errorMessage,
        message: this.message,
        styleTokens: this.styleTokensBuiltIn
      };
    }
  }
};
</script>
