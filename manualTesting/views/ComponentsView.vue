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

import { createDemos } from '@@@/demos.js';
import { componentsToDemo } from '@@@/helpers/index.js';

export default {
  name: 'ComponentDocs',
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
      return createDemos(componentsToDemo, tokens);
    }
  }
};
</script>
