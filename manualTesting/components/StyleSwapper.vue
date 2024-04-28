<template>
  <div class="style-swapper">
    <DoxenCheckbox
      label="CSS&nbsp;Reset"
      :modelValue="includeNormalize"
      name="Normalize"
      :styleTokens="modelValue"
      @update:modelValue="normalizeChanged"
    />
    <DoxenCheckbox
      label="Doxen&nbsp;Stylesheet"
      :modelValue="includeVueDoxenStylesheet"
      name="Include"
      :styleTokens="modelValue"
      @update:modelValue="builtInStyleSheetToggled"
    />
    <DoxenDropdown
      label="Styles"
      :modelValue="styleToDemo"
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
      :styleTokens="modelValue"
      @update:modelValue="styleChanged"
    />
    <DoxenDropdown
      label="Style&nbsp;Tokens"
      :modelValue="tokensToDemo"
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
      :styleTokens="modelValue"
      @update:modelValue="styleTokensChanged"
    />

    <link
      v-if="includeNormalize"
      href="https://unpkg.com/normalize.css@8.0.1/normalize.css"
      rel="stylesheet"
      type="text/css"
    />
    <component
      v-if="includeVueDoxenStylesheet"
      :is="'style'"
    >
      {{ styles }}
    </component>
    <link
      v-if="$route.name !== 'styles'"
      href="https://unpkg.com/highlightjs@9.16.2/styles/ir_black.css"
      rel="stylesheet"
      type="text/css"
    />
    <link
      v-if="styleToDemo !== 'none'"
      :href="stylesMap[styleToDemo]"
      rel="stylesheet"
      type="text/css"
    />
  </div>
</template>

<script>
import {
  DoxenCheckbox,
  DoxenDropdown,
  styleTokensBootstrap5,
  styleTokensBuiltIn
} from '@/library.js';
import styles from '@/sass/vue-doxen.sass?inline';

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
    styles,
    stylesMap: {
      none: '',
      bootstrap: 'https://unpkg.com/bootstrap@5.3.3/dist/css/bootstrap.min.css',
      water: 'https://unpkg.com/water.css@2.1.1/out/dark.min.css'
    },
    styleTokensMap: {
      bootstrap: styleTokensBootstrap5,
      builtIn: styleTokensBuiltIn,
      empty: {}
    }
  },
  data: function () {
    return {
      includeNormalize: true,
      includeVueDoxenStylesheet: true,
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
        this.includeVueDoxenStylesheet = data.includeVueDoxenStylesheet;
        this.styleToDemo = data.styleToDemo;
        this.tokensToDemo = data.tokensToDemo;
      }
      this.styleChanged(this.styleToDemo);
      this.styleTokensChanged(this.tokensToDemo);
    },
    builtInStyleSheetToggled: function (bool) {
      this.includeVueDoxenStylesheet = bool;
      this.save();
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
        includeVueDoxenStylesheet: this.includeVueDoxenStylesheet,
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

<style>
.style-swapper {
  display: flex;
  align-items: stretch;
}
.style-swapper fieldset {
  background: transparent;
  border: 0px;
  border-radius: 0px;
  margin: 0px 0px 0px 5px;
}
.style-swapper .center-the-checkbox {
  display: flex;
  justify-content: center;
}
</style>
