<template>
  <VueDoxenCustom
    :demos="demos"
    :modelValue="currentDemo"
  />
</template>

<script>
import VueDoxenCustom from '@/components/VueDoxenCustom.vue';
import TierThreeDescription from './TierThreeDescription.vue';
import TierTwoWrapper from './TierTwoWrapper.vue';

const demos = {
  TierOneComponent: {
    component: {
      name: 'TierOneComponent',
      template: '<div>Tier one</div>',
      props: {
        size: {
          type: String,
          default: 'md',
          validator: (v) => ['sm', 'md', 'lg'].includes(v)
        }
      }
    },
    description: '<p>A simple <strong>string</strong> description.</p>',
    importStatement: "import { TierOneComponent } from 'my-lib';"
  },
  TierTwoComponent: {
    component: {
      name: 'TierTwoComponent',
      template: '<div>Tier two</div>',
      props: {
        disabled: {
          type: Boolean,
          default: false
        }
      }
    },
    description: {
      component: TierTwoWrapper,
      props: {
        message: '<p>Wrapper description with <code>HTML</code>.</p>'
      }
    }
  },
  TierThreeComponent: {
    component: {
      name: 'TierThreeComponent',
      template: '<div>Tier three</div>',
      props: {}
    },
    description: {
      component: TierThreeDescription
    }
  }
};

export default {
  name: 'SerializeTestApp',
  components: {
    VueDoxenCustom
  },
  data: function () {
    return {
      demos,
      currentDemo: 'TierOneComponent'
    };
  }
};
</script>
