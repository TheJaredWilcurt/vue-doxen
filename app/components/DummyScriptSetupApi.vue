<template>
  <div>
    <label for="dummy">
      <strong>
        {{ label }}
      </strong>
    </label>
    <input v-model="greeting" id="dummy" />
    <div>
      Allowed values to be passed in to the <code>color</code> prop:
      <div>
        {{ colors }}
        <span class="color"></span>
      </div>
    </div>
    <CodeBox
      :code="'<h1>' + greeting + '</h1>'"
      :styleTokens="{}"
    />
    <slot></slot>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

import CodeBox from '@/components/CodeBox.vue';
import MyImportStatement from '@@@/components/MyImportStatement.vue';

defineOptions({
  importStatement: {
    component: MyImportStatement
  }
});

defineEmits({
  test: (value) => {
    return !!value;
  }
});

defineProps({
  color: {
    type: String,
    default: 'red',
    allowed: [
      'red',
      'green',
      'blue',
      'purple',
      'orange'
    ],
    validator: function (value) {
      return [
        'red',
        'green',
        'blue',
        'purple',
        'orange'
      ].includes(value);
    }
  },
  label: {
    type: String,
    default: 'potato'
  }
});

const greeting = ref('Hello');

const colors = computed(() => {
  return [
    'red',
    'green',
    'blue',
    'purple',
    'orange'
  ];
});
</script>

<style scoped>
.color {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: v-bind(color)
}
</style>
