<template>
  <VueDoxen
    id="components"
    :modelValue="selectedDemo"
    :demos="demos"
    :styleTokens="styleTokens"
  />
</template>

<script>
import _cloneDeep from 'lodash.clonedeep';

import { styleTokens } from '@/helpers/props.js';

import VueDoxen from '@/components/VueDoxen.vue';

import { createDemos } from '@@@/demos/index.js';

export default {
  name: 'ComponentsView',
  components: {
    VueDoxen
  },
  props: {
    selectedDemo: {
      type: String,
      default: undefined
    },
    styleTokens
  },
  computed: {
    demos: function () {
      const tokens = _cloneDeep(this.styleTokens);
      return createDemos(tokens);
    }
  }
};
</script>
