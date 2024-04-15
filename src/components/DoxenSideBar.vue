<template>
  <div
    data-style-tokens="sidebarContainer"
    :class="styleTokens.sidebarContainer"
  >
    <button
      v-for="(value, key) in demos"
      data-style-tokens="sidebarButton sidebarButtonActive"
      :class="{
        [styleTokens.sidebarButton]: true,
        [styleTokens.sidebarButtonActive]: modelValue === key
      }"
      @click="updateValue(key)"
      :key="key"
    >
      {{ value?.component?.name }}
    </button>
  </div>
</template>

<script>
import {
  createModelValueProp,
  demos,
  styleTokens
} from '@/helpers/props.js';

const modelValue = createModelValueProp(String);

export default {
  name: 'DoxenSideBar',
  emits: ['update:modelValue'],
  props: {
    demos,
    modelValue,
    styleTokens
  },
  methods: {
    updateValue: function (key) {
      this.$emit('update:modelValue', key);
    }
  }
};
</script>
