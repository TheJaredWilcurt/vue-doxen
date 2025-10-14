<template>
  <blockquote
    v-bind="applyStyleTokens({ deprecationBanner: true })"
    role="banner"
  >
    <strong v-bind="applyStyleTokens({ deprecationBannerTitle: true })">
      Deprecated:&nbsp;
    </strong>
    <div
      v-html="description"
      v-bind="applyStyleTokens({ deprecationBannerBody: true })"
    ></div>
  </blockquote>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

export default {
  name: 'DoxenDeprecationBanner',
  mixins: [applyStyleTokens],
  props: {
    description: {
      type: String,
      default: 'This component is deprecated.'
    },
    styleTokens
  }
};
</script>
