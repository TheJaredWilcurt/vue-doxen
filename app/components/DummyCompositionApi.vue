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

<script>
import { computed, ref } from 'vue';

import CodeBox from '@/components/CodeBox.vue';

const ALLOWED_COLORS = [
  'red',
  'green',
  'blue',
  'purple',
  'orange'
];

export default {
  name: 'DummyCompositionApi',
  description: 'This is an arbitrary test for Composition API components.',
  slots: ['default'],
  components: {
    CodeBox
  },
  props: {
    color: {
      type: String,
      default: ALLOWED_COLORS[0],
      allowed: ALLOWED_COLORS,
      validator: function (value) {
        return ALLOWED_COLORS.includes(value);
      }
    },
    label: {
      type: String,
      default: 'potato'
    }
  },
  setup: function () {
    const greeting = ref('Hello');

    const colors = computed(() => {
      return ALLOWED_COLORS;
    });

    return {
      greeting,
      colors
    };
  }
};
</script>

<style scoped>
.color {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: v-bind(color)
}
</style>
