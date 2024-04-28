<template>
  <div>
    <strong>{{ label }}</strong>
    <input v-model="greeting" />
    {{ colors }}
    <CodeBox
      :code="'<h1>' + greeting + '</h1>'"
      :styleTokens="{}"
    />
  </div>
</template>

<script setup>
import { computed, defineProps, ref } from 'vue';

import CodeBox from '@/components/CodeBox.vue';

defineProps({
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
    'blue'
  ];
});
</script>
