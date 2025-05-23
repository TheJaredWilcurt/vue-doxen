<template>
  <div class="style-swapper">
    <DoxenCheckbox
      label="CSS&nbsp;Reset"
      :modelValue="includeNormalize"
      name="Normalize"
      :styleTokens="tokens"
      @update:modelValue="normalizeChanged"
    />
    <DoxenCheckbox
      label="Doxen&nbsp;Stylesheet"
      :modelValue="includeVueDoxenStylesheet"
      name="Include"
      :styleTokens="tokens"
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
          name: 'Vuetify 3 (Dark)',
          value: 'vuetifyDark'
        },
        {
          name: 'Vuetify 3 (Light)',
          value: 'vuetifyLight'
        },
        {
          name: 'Water.css',
          value: 'water'
        }
      ]"
      :styleTokens="tokens"
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
        },
        {
          name: 'Vuetify 3',
          value: 'vuetify'
        }
      ]"
      :styleTokens="tokens"
      @update:modelValue="styleTokensChanged"
    />

    <link
      v-if="includeNormalize"
      href="https://unpkg.com/normalize.css@8.0.1/normalize.css"
      rel="stylesheet"
      type="text/css"
    />
    <link
      v-if="$route.name !== 'styles'"
      href="https://unpkg.com/highlightjs@9.16.2/styles/ir_black.css"
      rel="stylesheet"
      type="text/css"
    />
    <component
      v-if="styleToDemo.startsWith('vuetify')"
      :is="'style'"
    >
      {{ vuetifyStyles }}
    </component>
    <link
      v-if="stylesMap[styleToDemo]"
      :href="stylesMap[styleToDemo]"
      rel="stylesheet"
      type="text/css"
    />
    <component
      v-if="includeVueDoxenStylesheet"
      :is="'style'"
    >
      {{ doxenStyles }}
    </component>
  </div>
</template>

<script>
/* eslint-disable-next-line import/no-unresolved */
import vuetifyStyles from '@@@/assets/vuetify.css?inline';

import {
  DoxenCheckbox,
  DoxenDropdown,
  styleTokensBootstrap5,
  styleTokensBuiltIn,
  styleTokensVuetify3
} from '@/library.js';

/* eslint-disable-next-line import/no-unresolved */
import doxenStyles from '@/sass/vue-doxen.sass?inline';

export default {
  name: 'StyleSwapper',
  components: {
    DoxenCheckbox,
    DoxenDropdown
  },
  emits: [
    'update:styles',
    'update:tokens'
  ],
  props: {
    styles: {
      type: String,
      required: true
    },
    tokens: {
      type: Object,
      required: true
    }
  },
  constants: {
    localStorageId: 'vueDoxenStyleSwapper',
    doxenStyles,
    stylesMap: {
      bootstrap: 'https://unpkg.com/bootstrap@5.3.3/dist/css/bootstrap.min.css',
      water: 'https://unpkg.com/water.css@2.1.1/out/dark.min.css'
    },
    styleTokensMap: {
      bootstrap: styleTokensBootstrap5,
      builtIn: styleTokensBuiltIn,
      empty: {},
      vuetify: styleTokensVuetify3
    },
    vuetifyStyles
  },
  data: function () {
    return {
      includeNormalize: true,
      includeVueDoxenStylesheet: true,
      styleToDemo: 'vuetifyDark',
      tokensToDemo: 'vuetify'
    };
  },
  methods: {
    load: function () {
      let data = undefined;
      try {
        data = window.localStorage.getItem(this.localStorageId);
        data = JSON.parse(data);
      } catch (error) {
        console.log({ error });
      }
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
      try {
        window.localStorage.setItem(id, data);
      } catch (error) {
        console.log({ error });
      }
    },
    styleChanged: function (styleToDemo) {
      this.styleToDemo = styleToDemo;
      this.$emit('update:styles', this.styleToDemo);
      this.save();
    },
    styleTokensChanged: function (tokensToDemo) {
      this.tokensToDemo = tokensToDemo;
      this.$emit('update:tokens', this.styleTokensMap[tokensToDemo]);
      this.save();
    }
  },
  computed: {
    dataToSave: function () {
      let result = undefined;
      try {
        result = JSON.stringify({
          includeNormalize: this.includeNormalize,
          includeVueDoxenStylesheet: this.includeVueDoxenStylesheet,
          styleToDemo: this.styleToDemo,
          tokensToDemo: this.tokensToDemo
        });
      } catch (error) {
        console.log({ error });
      }
      return result;
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
.style-swapper [data-applied-style-tokens~="formFieldCheckboxContainer"] {
  flex-grow: 0;
}
.style-swapper .center-the-checkbox {
  display: flex;
  justify-content: center;
}
@media (width < 831px) {
  .style-swapper {
    flex-wrap: wrap;
  }
}
</style>
