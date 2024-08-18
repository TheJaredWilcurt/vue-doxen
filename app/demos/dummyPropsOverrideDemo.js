import DummyPropsOverride from '@@@/components/DummyPropsOverride.vue';

export const createDummyPropsOverrideDemo = function () {
  return {
    component: DummyPropsOverride,
    propsToDemo: {
      value: {
        props: {
          modelValue: 'b'
        }
      }
    }
  };
};
