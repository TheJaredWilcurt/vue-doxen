import FallBack from '@/components/FallBack.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('FallBack.vue', () => {
  let consoleInfo;

  beforeEach(() => {
    consoleInfo = console.info;
    console.info = vi.fn();
  });

  afterEach(() => {
    console.info = consoleInfo;
  });

  const setupWrapper = async () => {
    const requiredProps = {};
    const options = {
      props: requiredProps
    };
    const wrapper = await testHelpers.mount(FallBack, options);
    return wrapper;
  };

  test('Renders correctly', async () => {
    const wrapper = await setupWrapper();

    expect(console.info)
      .toHaveBeenCalledWith(
        'This fallback component is only used when a custom component ' +
        'is not supplied in the VueDoxenCustom component\'s options ' +
        'prop. The following props/attributes were passed in to this ' +
        'fallback component:',
        {}
      );

    expect(wrapper)
      .toMatchSnapshot();
  });
});
