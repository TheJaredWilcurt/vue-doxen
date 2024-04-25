<template>
  <div v-bind="applyStyleTokens({ codeSwapper: true })">
    <div v-bind="applyStyleTokens({ codeSwapperButtonContainer: true })">
      <button
        v-bind="applyStyleTokens({
          codeSwapperButton: true,
          codeSwapperButtonNotSelected: selected !== OPTIONS,
          codeSwapperButtonSelected: selected === OPTIONS
        })"
        :aria-pressed="selected === OPTIONS"
        @click="setLanguage(OPTIONS)"
      >
        Options API
      </button>
      <button
        v-bind="applyStyleTokens({
          codeSwapperButton: true,
          codeSwapperButtonNotSelected: selected !== COMPOSITION,
          codeSwapperButtonSelected: selected === COMPOSITION
        })"
        :aria-pressed="selected === COMPOSITION"
        @click="setLanguage(COMPOSITION)"
      >
        Composition API
      </button>
    </div>
    <p v-if="fileName"><code>{{ fileName }}</code></p>
    <CodeBox
      :code="code"
      language="xml"
      :styleTokens="styleTokens"
    />
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

import CodeBox from '@/components/CodeBox.vue';

const COMPOSITION = 'composition';
const OPTIONS = 'options';

export default {
  name: 'VueApiSwapper',
  components: {
    CodeBox
  },
  mixins: [applyStyleTokens],
  props: {
    composition: {
      type: String,
      required: true
    },
    fileName: {
      type: String,
      default: undefined
    },
    options: {
      type: String,
      required: true
    },
    styleTokens
  },
  constants: {
    COMPOSITION,
    OPTIONS
  },
  data: function () {
    return {
      localStorageId: 'vueDoxenVueApiSwapper',
      selected: OPTIONS
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
    code: function () {
      if (this.selected === OPTIONS) {
        return this.options;
      }
      return this.composition;
    }
  },
  created: function () {
    this.load();
  }
};
</script>
