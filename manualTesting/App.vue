<template>
  <div>
    APP
    <DoxenCheckbox
      v-model="bool"
      label="Label"
      name="name"
      required
      errorMessage="errorMessage"
      message="Message"
      :disabled="false"
      :styleTokens="styleTokens"
    />
    <DoxenRadioDials :styleTokens="styleTokens" />
    <DoxenSideBar :styleTokens="styleTokens" />
    <DoxenTextarea :styleTokens="styleTokens" />
    <DoxenTextField :styleTokens="styleTokens" />
    <VueDoxen :styleTokens="styleTokens" />
  </div>
</template>

<script>
import {
  DoxenCheckbox,
  DoxenRadioDials,
  DoxenSideBar,
  DoxenTextarea,
  DoxenTextField,
  styleTokens,
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
  data: function () {
    return {
      bool: true
    };
  },
  computed: {
    styleTokens: function () {
      return styleTokens;
    }
  }
};
</script>
