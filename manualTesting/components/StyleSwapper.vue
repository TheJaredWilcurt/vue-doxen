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
      @update:modelValue="$emit('update:modelValue', styleTokensMap[$event])"
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
      :href="stylesMap[styleToDemo]"
    />
  </div>
</template>

<script>
import {
  DoxenCheckbox,
  DoxenDropdown,
  styleTokensBootstrap5,
  styleTokensBuiltIn
} from '@/vue-doxen.js';

export default {
  name: 'StyleSwapper',
  components: {
    DoxenCheckbox,
    DoxenDropdown
  },
  emits: ['update:model-value'],
  props: {
    modelValue: {
      type: Object,
      required: true
    }
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
          styleTokens: styleTokensBuiltIn,
          url: '',
          value: 'none'
        },
        {
          name: 'Bootstrap 5',
          styleTokens: styleTokensBootstrap5,
          url: 'https://unpkg.com/bootstrap@5.3.3/dist/css/bootstrap.min.css',
          value: 'bootstrap'
        },
        {
          name: 'Water.css',
          styleTokens: styleTokensBuiltIn,
          url: 'https://unpkg.com/water.css@2.1.1/out/dark.min.css',
          value: 'water'
        }
      ];
    },
    stylesMap: function () {
      const stylesMap = {};
      for (let option of this.options) {
        stylesMap[option.value] = option.url;
      }
      return stylesMap;
    },
    styleTokensMap: function () {
      const styleTokensMap = {};
      for (let option of this.options) {
        styleTokensMap[option.value] = option.styleTokens;
      }
      return styleTokensMap;
    }
  }
};
</script>
