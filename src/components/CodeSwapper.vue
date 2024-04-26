<template>
  <div v-bind="applyStyleTokens({ codeSwapper: true })">
    <div v-bind="applyStyleTokens({ codeSwapperHeader: true })">
      <code
        v-if="currentFileName"
        v-text="currentFileName"
        v-bind="applyStyleTokens({ codeSwapperFileName: true })"
      ></code>
      <div v-bind="applyStyleTokens({ codeSwapperButtonContainer: true })">
        <button
          v-for="(typeValue, typeName) in codeTypes"
          v-bind="applyStyleTokens({
            codeSwapperButton: true,
            codeSwapperButtonNotSelected: selected !== typeName,
            codeSwapperButtonSelected: selected === typeName
          })"
          :aria-pressed="selected === typeName"
          @click="setLanguage(typeName)"
          :key="'code-swapper-' + typeName"
        >
          {{ typeName }}
        </button>
      </div>
    </div>
    <CodeBox
      :code="code"
      :language="code.startsWith('<') ? 'xml' : 'javascript'"
      :styleTokens="styleTokens"
    />
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

import CodeBox from '@/components/CodeBox.vue';

const codeTypesExample = `{
  HTML: '<h1>Hello World</h1>',
  JavaScript: 'console.log("Hello World")'
}`;

export default {
  name: 'CodeSwapper',
  components: {
    CodeBox
  },
  mixins: [applyStyleTokens],
  props: {
    codeTypes: {
      type: Object,
      required: true,
      example: codeTypesExample
    },
    fileName: {
      type: [String, Object],
      default: undefined
    },
    styleTokens
  },
  data: function () {
    return {
      localStorageId: 'vueDoxenCodeSwapper',
      selectedOrderPreference: [
        ...Object.keys(this.codeTypes)
      ]
    };
  },
  methods: {
    save: function () {
      const id = this.localStorageId;
      const data = JSON.stringify({
        selectedOrderPreference: this.selectedOrderPreference
      });
      window.localStorage.setItem(id, data);
    },
    load: function () {
      let data = window.localStorage.getItem(this.localStorageId);
      data = JSON.parse(data);
      if (data?.selectedOrderPreference) {
        this.selectedOrderPreference = data.selectedOrderPreference;
      }
    },
    setLanguage: function (language) {
      this.selectedOrderPreference = Array.from(new Set([
        language,
        ...this.selectedOrderPreference
      ]));
      this.save();
    }
  },
  computed: {
    currentFileName: function () {
      if (typeof(this.fileName) === 'object') {
        return this.fileName[this.selected];
      }
      return this.fileName;
    },
    selected: function () {
      const actualTypes = Object.keys(this.codeTypes);
      for (const type of this.selectedOrderPreference) {
        if (actualTypes.includes(type)) {
          return type;
        }
      }
      return Object.keys(this.codeTypes)[0];
    },
    code: function () {
      return this.codeTypes[this.selected];
    }
  },
  created: function () {
    this.load();
  }
};
</script>
