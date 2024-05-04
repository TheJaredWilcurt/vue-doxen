<template>
  <div v-bind="applyStyleTokens({ codeSwapper: true })">
    <DoxenTabs
      v-model="selected"
      :styleTokens="styleTokens"
      :tabs="Object.keys(codeTypes)"
    >
      <code
        v-if="currentFileName"
        v-text="currentFileName"
        v-bind="applyStyleTokens({ codeSwapperFileName: true })"
      ></code>
    </DoxenTabs>
    <CodeBox
      v-if="code"
      :code="code"
      :styleTokens="styleTokens"
    />
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

import CodeBox from '@/components/CodeBox.vue';
import DoxenTabs from '@/components/DoxenTabs.vue';

const codeTypesExample = `{
  HTML: '<h1>Hello World</h1>',
  JavaScript: 'console.log("Hello World")'
}`;

export default {
  name: 'CodeSwapper',
  components: {
    CodeBox,
    DoxenTabs
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
      selected: Object.keys(this.codeTypes)[0]
    };
  },
  computed: {
    currentFileName: function () {
      if (typeof(this.fileName) === 'object') {
        if (this.selected) {
          return this.fileName[this.selected];
        }
        return undefined;
      }
      return this.fileName;
    },
    code: function () {
      if (this.selected) {
        return this.codeTypes[this.selected];
      }
      return undefined;
    }
  }
};
</script>
