<template>
  <div>
    <strong>{{ label }}</strong>
    <input v-model="greeting" />
    {{ colors }}
    <CodeBox
      :code="'<h1>' + greeting + '</h1>'"
      language="xml"
      :styleTokens="{}"
    />
    <slot></slot>
  </div>
</template>

<script>
import { computed, ref } from 'vue';

import CodeBox from '@/components/CodeBox.vue';

export default {
  name: 'DummyCompositionApi',
  description: 'This is a test for Composition API components.',
  slots: ['default'],
  components: {
    CodeBox
  },
  props: {
    label: {
      type: String,
      default: 'potato'
    }
  },
  setup: function () {
    const greeting = ref('Hello');

    const colors = computed(() => {
      return [
        'red',
        'green',
        'blue'
      ];
    });

    return {
      greeting,
      colors
    };
  }
};
</script>
