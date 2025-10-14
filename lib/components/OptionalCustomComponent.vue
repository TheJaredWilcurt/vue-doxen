<template>
  <component
    v-if="customComponent && customComponent.component"
    :is="customComponent.component"
    v-bind="customComponent.props || {}"
    v-on="customComponent.events || {}"
    :key="rootKey"
  >
    <template
      v-for="(slotValue, slotName) in customComponent.slots"
      #[slotName]
      :key="rootKey + '-slot-' + slotName"
    >
      <HtmlFragments :html="customComponent.slots[slotName]" />
    </template>
  </component>
  <component
    v-else
    :is="fallbackComponent"
    :styleTokens="styleTokens"
    v-bind="fallbackProps"
  />
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

import HtmlFragments from '@/components/HtmlFragments.vue';

export default {
  name: 'OptionalCustomComponent',
  components: {
    HtmlFragments
  },
  mixins: [applyStyleTokens],
  props: {
    customComponent: {
      type: [String, Object],
      default: undefined
    },
    fallbackComponent: {
      type: Object,
      required: true
    },
    fallbackProps: {
      type: Object,
      required: true
    },
    rootKey: {
      type: String,
      required: true
    },
    styleTokens
  }
};
</script>
