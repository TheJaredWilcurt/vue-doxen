<template>
  <VueDoxen
    :modelValue="selectedDemo"
    :demos="demos"
    :styleTokens="styleTokens"
  />
</template>

<script>
import _cloneDeep from 'lodash.clonedeep';

import { VueDoxen } from '@/library.js';

import { styleTokens } from '@/helpers/props.js';

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
