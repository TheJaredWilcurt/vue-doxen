<template>
  <div>
    APP
    <DoxenCheckbox />
    <DoxenRadioDials />
    <DoxenSideBar />
    <DoxenTextarea />
    <DoxenTextField />
    <VueDoxen />
  </div>
</template>

<script>
import {
  DoxenCheckbox,
  DoxenRadioDials,
  DoxenSideBar,
  DoxenTextarea,
  DoxenTextField,
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
  }
};
</script>
