<template>
  <div
    v-bind="applyStyleTokens({ accordionContainer: true })"
    :style="accordionContainer"
  >
    <div
      v-bind="applyStyleTokens({ accordionInner: true })"
      :style="accordionInner"
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
    styleTokens,
    direction: {
      type: String,
      default: 'up',
      validator: function (value) {
        return ['up', 'left'].includes(value);
      }
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    accordionContainer: function () {
      let type = 'rows';
      if (this.direction === 'left') {
        type = 'columns';
      }
      let frames = '1';
      if (!this.show) {
        frames = '0';
      }
      return [
        'display: grid',
        'grid-template-' + type + ': ' + frames + 'fr',
        'transition-property: grid-template-' + type
      ].join(';');
    },
    accordionInner: function () {
      let type = 'row';
      if (this.direction === 'left') {
        type = 'column';
      }
      return [
        'grid-' + type + ': 1 / span 2'
      ].join(';');
    }
  }
};
</script>
