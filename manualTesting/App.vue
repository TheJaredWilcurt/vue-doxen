<template>
  <div>
    APP
    {{ selectedDemo }}
    <StyleSwapper v-model="styleTokens" />
    <div style="display: flex; flex-wrap: wrap;">
      <DoxenCheckbox
        v-model="isRequired"
        v-bind="commonProps"
        name="Is Required"
      />
      <DoxenCheckbox
        v-model="isDisabled"
        v-bind="commonProps"
        :disabled="false"
        name="Is Disabled"
      />
      <DoxenDropdown
        v-model="radios"
        v-bind="commonProps"
        label="DoxenDropdown"
        :options="dummyOptions"
      />
      <DoxenRadioDials
        v-model="radios"
        v-bind="commonProps"
        label="DoxenRadioDials"
        :options="dummyOptions"
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
  DoxenCheckbox,
  DoxenDropdown,
  DoxenRadioDials,
  DoxenSideBar,
  DoxenTextarea,
  DoxenTextField,
  styleTokensBootstrap5,
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
    DoxenCheckbox,
    DoxenDropdown,
    DoxenRadioDials,
    DoxenSideBar,
    DoxenTextarea,
    DoxenTextField,
    StyleSwapper,
    VueDoxen
  },
  constants: {
    dummyOptions: [
      {
        name: 'Item 1',
        value: 1
      },
      {
        name: 'Item 2',
        value: 2
      }
    ]
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
      errorMessage: '',
      isDisabled: false,
      isRequired: true,
      message: '',
      radios: null,
      selectedDemo: '',
      styleTokens: styleTokensBuiltIn
    };
  },
  computed: {
    commonProps: function () {
      return {
        disabled: this.isDisabled,
        errorMessage: this.errorMessage,
        label: 'Label',
        message: this.message,
        required: this.isRequired,
        // styleTokens: this.styletokens,
        styleTokens: styleTokensBootstrap5
      };
    }
  }
};
</script>
