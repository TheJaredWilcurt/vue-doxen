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
      :disabled="false"
      :styleTokens="styleTokensBuiltIn"
    />
    <DoxenRadioDials :styleTokens="styleTokensBuiltIn" />
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
          component: DoxenCheckbox
        },
        doxenRadioDialsDemo: {
          component: DoxenRadioDials
        }
      }
    };
  }
};
</script>
