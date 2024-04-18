<template>
  <div>
    <DoxenCheckbox
      :modelValue="includeNormalize"
      name="Include Normalize"
      @update:modelValue="normalizeChanged"
    />
    <DoxenDropdown
      :modelValue="styleToDemo"
      label="Swap styles"
      :options="options"
      @update:modelValue="styleChanged"
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
  constants: {
    localStorageId: 'vueDoxenStyleSwapper'
  },
  data: function () {
    return {
      includeNormalize: true,
      styleToDemo: 'water'
    };
  },
  methods: {
    load: function () {
      let data = window.localStorage.getItem(this.localStorageId);
      data = JSON.parse(data);
      if (data) {
        this.includeNormalize = data.includeNormalize;
        this.styleToDemo = data.styleToDemo;
      }
    },
    normalizeChanged: function (bool) {
      this.includeNormalize = bool;
      this.save();
    },
    save: function () {
      const id = this.localStorageId;
      const data = this.dataToSave;
      window.localStorage.setItem(id, data);
    },
    styleChanged: function (styleToDemo) {
      this.styleToDemo = styleToDemo;
      // Emit style tokens
      this.$emit('update:model-value', this.styleTokensMap[styleToDemo]);
      this.save();
    }
  },
  computed: {
    dataToSave: function () {
      return JSON.stringify({
        includeNormalize: this.includeNormalize,
        styleToDemo: this.styleToDemo
      });
    },
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
  },
  created: function () {
    this.load();
  }
};
</script>
