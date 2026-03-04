<template>
  <VueDoxenCustom :demos="demos" :modelValue="currentDemo" />
</template>

<script>
import DescriptionWrapper from './DescriptionWrapper.vue';
import StandaloneDescription from './StandaloneDescription.vue';

import VueDoxenCustom from '@/components/VueDoxenCustom.vue';

const demos = {
  StringDemo: {
    component: {
      name: 'StringDemo',
      template: '<div>String demo</div>',
      props: {
        size: {
          type: String,
          default: 'md',
          validator: (v) => ['sm', 'md', 'lg'].includes(v)
        }
      }
    },
    description: '<p>A simple <strong>string</strong> description.</p>',
    importStatement: 'import { StringDemo } from \'my-lib\';'
  },
  ComponentDemo: {
    component: {
      name: 'ComponentDemo',
      template: '<div>Component demo</div>',
      props: {
        disabled: {
          type: Boolean,
          default: false
        }
      }
    },
    description: {
      component: DescriptionWrapper,
      props: {
        message: '<p>Wrapper description with <code>HTML</code>.</p>'
      }
    }
  },
  ComponentOnlyDemo: {
    component: {
      name: 'ComponentOnlyDemo',
      template: '<div>Component only demo</div>',
      props: {}
    },
    description: {
      component: StandaloneDescription
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
      currentDemo: 'StringDemo'
    };
  }
};
</script>
