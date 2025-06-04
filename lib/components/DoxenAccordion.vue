<template>
  <div
    v-bind="applyStyleTokens({ accordionOuter: true })"
    style="display: flex;"
  >
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
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

export default {
  name: 'DoxenAccordion',
  description: 'A component that animates the visibility of content.',
  slotsToDemo: {
    default: '<div style="background: #004; color: #FFF; width: 200px; height: 200px;">\n  Content\n</div>'
  },
  mixins: [applyStyleTokens],
  props: {
    styleTokens,
    direction: {
      description: 'Controls the direction to collapse/exapand the accordion.',
      type: String,
      default: 'up',
      validator: function (value) {
        return ['up', 'left'].includes(value);
      }
    },
    durationMs: {
      description: 'Controls the length of time, in milliseconds (ms) that the animation lasts.',
      type: Number,
      default: 750
    },
    show: {
      description: 'Determines if the accordion is expanded (true) or collapsed (false).',
      type: Boolean,
      default: true
    },
    timingFunction: {
      description: 'Any valid CSS transition-timing-function value.',
      type: String,
      default: 'ease'
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
        'transition-property: grid-template-' + type,
        'transition-duration: ' + this.durationMs + 'ms',
        'transition-timing-function: ' + this.timingFunction
      ].join(';');
    },
    accordionInner: function () {
      let type = 'row';
      if (this.direction === 'left') {
        type = 'column';
      }
      return [
        'grid-' + type + ': 1 / span 2',
        'overflow: hidden'
      ].join(';');
    }
  }
};
</script>
