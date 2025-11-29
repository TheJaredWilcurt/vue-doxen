<template>
  <div
    v-bind="applyStyleTokens({ accordionContainer: true })"
    :style="accordionContainer"
  >
    <div
      v-bind="applyStyleTokens({ accordionInner: true })"
      :aria-hidden="!show"
      :inert="!show"
      style="grid-row: 1 / span 2; overflow: hidden"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

export default {
  name: 'DoxenAccordion',
  mixins: [applyStyleTokens],
  props: {
    durationMs: {
      type: Number,
      default: 750
    },
    show: {
      type: Boolean,
      default: true
    },
    styleTokens,
    timingFunction: {
      type: String,
      default: 'ease'
    }
  },
  computed: {
    accordionContainer: function () {
      let frames = '1';
      if (!this.show) {
        frames = '0';
      }
      return [
        'display: grid',
        'grid-template-rows: ' + frames + 'fr',
        'transition-property: grid-template-rows',
        'transition-duration: ' + this.durationMs + 'ms',
        'transition-timing-function: ' + this.timingFunction
      ].join(';');
    }
  }
};
</script>
