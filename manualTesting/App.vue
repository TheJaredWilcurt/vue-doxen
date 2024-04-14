<template>
  <div>
    APP
    {{ selectedDemo }}
    <DoxenCheckbox
      v-model="bool"
      label="Label"
      name="name"
      required
      errorMessage="errorMessage"
      message="Message"
      :styleTokens="styleTokensBuiltIn"
    />
    <DoxenRadioDials
      label="Radio Dials"
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
      required
      :styleTokens="styleTokensBuiltIn"
      errorMessage="errorMessage"
      message="Message"
    />
    <DoxenTextarea :styleTokens="styleTokensBuiltIn" />
    <DoxenTextField :styleTokens="styleTokensBuiltIn" />

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

export default {
  name: 'App',
  components: {
    DoxenCheckbox,
    DoxenRadioDials,
    DoxenSideBar,
    DoxenTextarea,
    DoxenTextField,
    VueDoxen
  },
  constants: {
    styleTokensBuiltIn
  },
  data: function () {
    return {
      bool: true,
      selectedDemo: '',
      demos: {
        doxenCheckboxDemo: {
          // component: DoxenCheckbox
        },
        doxenRadioDialsDemo: {
          // component: DoxenRadioDials
        }
      }
    };
  }
};
</script>
