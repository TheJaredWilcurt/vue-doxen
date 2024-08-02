<template>
  <div>
    <label for="dummy">
      <strong>
        {{ label }}
      </strong>
    </label>
    <div v-if="enabled">(Enabled)</div>
    <div v-else>(Disabled)</div>
    <input v-model="greeting" id="dummy" />
    <div>
      Allowed values to be passed in to the <code>color</code> prop:
      <div>
        {{ colors }}
        <span class="color"></span>
      </div>
    </div>
    <input
      :value="range"
      type="range"
      min="1"
      max="5"
      @input="$emit('update:range', parseInt($event.target.value))"
    />
    <DoxenCodeBox
      :code="'<h1>' + greeting + '</h1>'"
      :styleTokens="{}"
    />
    <slot></slot>
  </div>
</template>

<script>
import { computed, ref } from 'vue';

import DoxenCodeBox from '@/components/DoxenCodeBox.vue';

const ALLOWED_COLORS = [
  '',
  'red',
  'green',
  'blue',
  'purple',
  'orange'
];

export default {
  name: 'DummyCompositionApi',
  description: 'This is an arbitrary test for Composition API components.',
  emits: ['update:range'],
  slots: ['default'],
  components: {
    DoxenCodeBox
  },
  props: {
    color: {
      type: String,
      default: ALLOWED_COLORS[1],
      allowed: ALLOWED_COLORS,
      validator: function (value) {
        return ALLOWED_COLORS.includes(value);
      }
    },
    label: {
      type: String,
      default: 'potato',
      description: 'Testing default string'
    },
    enabled: {
      type: Boolean,
      default: true,
      description: 'Testing logic around boolean props that default to true instead of false.'
    },
    externalValidation: {
      type: Function,
      required: true,
      description: 'Testing required function prop'
    },
    range: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
      description: 'A number with a min and max value'
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
  },
  created: function () {
    this.externalValidation();
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
