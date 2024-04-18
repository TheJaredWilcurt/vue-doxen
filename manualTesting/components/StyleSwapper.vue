<template>
  <div>
    <DoxenCheckbox
      v-model="includeNormalize"
      name="Include Normalize"
    />
    <DoxenDropdown
      v-model="styleToDemo"
      label="Swap styles"
      :options="options"
    />
    <link
      v-if="includeNormalize"
      rel="stylesheet"
      type="text/css"
      href="https://unpkg.com/normalize.css@8.0.1/normalize.css"
    />
    <link
      v-if="styleToDemo !== 'none'"
      rel="stylesheet"
      type="text/css"
      :href="styles[styleToDemo]"
    />
  </div>
</template>

<script>
import {
  DoxenCheckbox,
  DoxenDropdown
} from '@/vue-doxen.js';

export default {
  name: 'StyleSwapper',
  components: {
    DoxenCheckbox,
    DoxenDropdown
  },
  data: function () {
    return {
      includeNormalize: true,
      styleToDemo: 'water'
    };
  },
  computed: {
    options: function () {
      return [
        {
          name: 'None',
          value: 'none',
          url: ''
        },
        {
          name: 'Bootstrap 5',
          value: 'bootstrap',
          url: 'https://unpkg.com/bootstrap@5.3.3/dist/css/bootstrap.min.css'
        },
        {
          name: 'Water.css',
          value: 'water',
          url: 'https://unpkg.com/water.css@2.1.1/out/dark.min.css'
        }
      ];
    },
    styles: function () {
      const stylesMap = {};
      for (let option of this.options) {
        stylesMap[option.value] = option.url;
      }
      return stylesMap;
    }
  }
};
</script>
