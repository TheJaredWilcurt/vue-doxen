<template>
  <div
    v-if="title"
    v-bind="applyStyleTokens({ demoHeader: true })"
  >
    <h2
      v-if="title"
      v-text="title"
      v-bind="applyStyleTokens({ demoHeaderTitle: true })"
    ></h2>
  </div>
</template>

<script>
import { createImportStatement } from '@/helpers/componentHelpers.js';
import { styleTokens } from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

const COMPONENT_NAME = 'DoxenHeader';

export default {
  ...createImportStatement(COMPONENT_NAME),
  name: COMPONENT_NAME,
  mixins: [applyStyleTokens],
  props: {
    styleTokens,
    title: {
      type: String,
      default: undefined
    }
  }
};
</script>
