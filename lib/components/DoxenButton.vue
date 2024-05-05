<template>
  <button
    v-bind="applyStyleTokens({
      button: true,
      buttonNotSelected: !selected,
      buttonSelected: selected
    })"
    :aria-pressed="selected"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

export default {
  name: 'DoxenButton',
  slots: {
    default: 'Button Text'
  },
  emits: ['click'],
  mixins: [applyStyleTokens],
  props: {
    selected: {
      type: Boolean,
      default: false
    },
    styleTokens
  }
};
</script>
