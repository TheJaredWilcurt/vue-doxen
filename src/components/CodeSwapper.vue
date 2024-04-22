<template>
  <div v-bind="applyStyleTokens({ codeSwapper: true })">
    <div v-bind="applyStyleTokens({ codeSwapperButtonContainer: true })">
      <button
        v-bind="applyStyleTokens({
          codeSwapperButton: true,
          codeSwapperButtonNotSelected: selected !== VUE,
          codeSwapperButtonSelected: selected === VUE
        })"
        :aria-pressed="selected === VUE"
        @click="setLanguage(VUE)"
      >
        Vue
      </button>
      <button
        v-bind="applyStyleTokens({
          codeSwapperButton: true,
          codeSwapperButtonNotSelected: selected !== JAVASCRIPT,
          codeSwapperButtonSelected: selected === JAVASCRIPT
        })"
        :aria-pressed="selected === JAVASCRIPT"
        @click="setLanguage(JAVASCRIPT)"
      >
        JavaScript
      </button>
    </div>
    <CodeBox
      :code="code"
      :language="language"
      :styleTokens="styleTokens"
    />
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

import CodeBox from '@/components/CodeBox.vue';

const JAVASCRIPT = 'javascript';
const VUE = 'vue';
const XML = 'xml';

export default {
  name: 'CodeSwapper',
  components: {
    CodeBox
  },
  mixins: [applyStyleTokens],
  props: {
    javascript: {
      type: String,
      default: undefined
    },
    styleTokens,
    vue: {
      type: String,
      default: undefined
    }
  },
  data: function () {
    return {
      localStorageId: 'vueDoxenCodeSwapper',
      selected: VUE
    };
  },
  methods: {
    save: function () {
      const id = this.localStorageId;
      const data = JSON.stringify({
        selected: this.selected
      });
      window.localStorage.setItem(id, data);
    },
    load: function () {
      let data = window.localStorage.getItem(this.localStorageId);
      data = JSON.parse(data);
      if (data?.selected) {
        this.selected = data.selected;
      }
    },
    setLanguage: function (language) {
      this.selected = language;
      this.save();
    }
  },
  computed: {
    JAVASCRIPT: function () {
      return JAVASCRIPT;
    },
    VUE: function () {
      return VUE;
    },
    code: function () {
      if (this.selected === VUE) {
        return this.vue;
      }
      return this.javascript;
    },
    language: function () {
      if (this.selected === VUE) {
        return XML;
      }
      return JAVASCRIPT;
    }
  },
  created: function () {
    this.load();
  }
};
</script>
