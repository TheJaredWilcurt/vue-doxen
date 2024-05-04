<template>
  <div v-bind="applyStyleTokens({ tabsHeader: true })">
    <slot></slot>
    <div v-bind="applyStyleTokens({ tabsButtonContainer: true })">
      <button
        v-for="tabName in tabs"
        v-bind="applyStyleTokens({
          tabButton: true,
          tabButtonNotSelected: modelValue !== tabName,
          tabButtonSelected: modelValue === tabName
        })"
        :aria-pressed="modelValue === tabName"
        @click="setTab(tabName)"
        :key="'tab-' + tabName"
      >
        {{ tabName }}
      </button>
    </div>
  </div>
</template>

<script>
import {
  createModelValueProp,
  styleTokens
} from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

const modelValue = createModelValueProp(String);

export default {
  name: 'DoxenTabs',
  slots: ['default'],
  emits: ['update:model-value'],
  mixins: [applyStyleTokens],
  props: {
    modelValue,
    styleTokens,
    tabs: {
      type: Array,
      required: true,
      example: '[\'Vue\', \'JavaScript\']',
      validator: function (value) {
        if (!value || !value.length) {
          return false;
        }
        return !value.filter((item) => {
          return typeof(item) !== 'string';
        }).length;
      }
    }
  },
  data: function () {
    return {
      localStorageId: 'vueDoxenTab',
      selectedOrderPreference: [
        ...this.tabs
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
        this.selectedOrderPreference = Array.from(new Set([
          ...data.selectedOrderPreference,
          ...this.selectedOrderPreference
        ]));
      }
      this.setDefault();
    },
    setDefault: function () {
      const actualTabs = this.tabs;
      for (const tab of this.selectedOrderPreference) {
        if (actualTabs.includes(tab)) {
          this.setTab(tab);
          return;
        }
      }
    },
    setTab: function (tabName) {
      this.selectedOrderPreference = Array.from(new Set([
        tabName,
        ...this.selectedOrderPreference
      ]));
      this.save();
      this.$emit('update:model-value', tabName);
    }
  },
  created: function () {
    this.load();
  }
};
</script>
