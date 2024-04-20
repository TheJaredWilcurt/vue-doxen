<template>
  <div>
    <DoxenCheckbox
      :modelValue="includeNormalize"
      name="Include Normalize"
      @update:modelValue="normalizeChanged"
    />
    <DoxenDropdown
      :modelValue="styleToDemo"
      label="Styles"
      :options="[
        {
          name: 'None',
          value: 'none'
        },
        {
          name: 'Bootstrap 5',
          value: 'bootstrap'
        },
        {
          name: 'Water.css',
          value: 'water'
        }
      ]"
      @update:modelValue="styleChanged"
    />
    <DoxenDropdown
      :modelValue="tokensToDemo"
      label="Style Tokens"
      :options="[
        {
          name: 'Built in classes',
          value: 'builtIn'
        },
        {
          name: 'Bootstrap 5 classes',
          value: 'bootstrap'
        },
        {
          name: 'No classes',
          value: 'empty'
        }
      ]"
      @update:modelValue="styleTokensChanged"
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
  styleTokensBuiltIn,
  styleTokensEmpty
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
    localStorageId: 'vueDoxenStyleSwapper',
    stylesMap: {
      none: '',
      bootstrap: 'https://unpkg.com/bootstrap@5.3.3/dist/css/bootstrap.min.css',
      water: 'https://unpkg.com/water.css@2.1.1/out/dark.min.css'
    },
    styleTokensMap: {
      bootstrap: styleTokensBootstrap5,
      builtIn: styleTokensBuiltIn,
      empty: styleTokensEmpty
    }
  },
  data: function () {
    return {
      includeNormalize: true,
      styleToDemo: 'water',
      tokensToDemo: 'builtIn'
    };
  },
  methods: {
    load: function () {
      let data = window.localStorage.getItem(this.localStorageId);
      data = JSON.parse(data);
      if (data) {
        this.includeNormalize = data.includeNormalize;
        this.styleToDemo = data.styleToDemo;
        this.tokensToDemo = data.tokensToDemo;
      }
      this.styleChanged(this.styleToDemo);
      this.styleTokensChanged(this.tokensToDemo);
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
      this.save();
    },
    styleTokensChanged: function (tokensToDemo) {
      this.tokensToDemo = tokensToDemo;
      this.$emit('update:model-value', this.styleTokensMap[tokensToDemo]);
      this.save();
    }
  },
  computed: {
    dataToSave: function () {
      return JSON.stringify({
        includeNormalize: this.includeNormalize,
        styleToDemo: this.styleToDemo,
        tokensToDemo: this.tokensToDemo
      });
    }
  },
  created: function () {
    this.load();
  }
};
</script>

<style scoped>
fieldset {
  border: 0px;
}
</style>
