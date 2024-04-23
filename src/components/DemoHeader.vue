<template>
  <div
    v-if="title || description"
    v-bind="applyStyleTokens({ demoHeader: true })"
  >
    <h2
      v-if="title"
      v-text="title"
      v-bind="applyStyleTokens({ demoHeaderTitle: true })"
    ></h2>
    <p
      v-if="description"
      v-text="description"
      v-bind="applyStyleTokens({ demoHeaderDescription: true })"
    ></p>
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

export default {
  name: 'DemoHeader',
  mixins: [applyStyleTokens],
  props: {
    description: {
      type: String,
      default: undefined
    },
    styleTokens,
    title: {
      type: String,
      default: undefined
    }
  }
};
</script>
