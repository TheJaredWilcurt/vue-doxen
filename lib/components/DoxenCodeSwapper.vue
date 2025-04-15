<template>
  <div v-bind="applyStyleTokens({ codeSwapper: true })">
    <DoxenTabs
      v-model="selected"
      :styleTokens="styleTokens"
      :tabs="Object.keys(codeTypes)"
      @update:model-value="$emit('tabChanged', $event)"
    >
      <code
        v-if="currentFileName"
        v-text="currentFileName"
        v-bind="applyStyleTokens({ codeSwapperFileName: true })"
      ></code>
    </DoxenTabs>
    <DoxenCodeBox
      v-for="(code, codeName) in codeTypes"
      v-show="selected === codeName"
      :code="code"
      :copy="copy"
      :styleTokens="styleTokens"
      :key="codeName"
    />
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

import DoxenCodeBox from '@/components/DoxenCodeBox.vue';
import DoxenTabs from '@/components/DoxenTabs.vue';

const codeTypesExample = `{
  HTML: '<h1>Hello World</h1>',
  JavaScript: 'console.log("Hello World")'
}`;

const fileNameExample = `{
  HTML: 'index.html',
  JavaScript: 'index.js'
}`;

export default {
  name: 'DoxenCodeSwapper',
  components: {
    DoxenCodeBox,
    DoxenTabs
  },
  mixins: [applyStyleTokens],
  emits: ['tabChanged'],
  props: {
    codeTypes: {
      type: Object,
      required: true,
      example: codeTypesExample
    },
    copy: {
      type: Boolean,
      default: true
    },
    fileName: {
      type: [String, Object],
      default: undefined,
      description: 'You can pass in a string of a filename, like Example.js, or an object where the keys will match the code type, and the value is the string filename',
      example: fileNameExample
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
    }
  }
};
</script>
