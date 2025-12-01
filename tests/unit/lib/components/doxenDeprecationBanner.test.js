import { styleTokensBuiltIn } from '@/helpers/styleTokens.js';

import DoxenDeprecationBanner from '@/components/DoxenDeprecationBanner.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('DoxenDeprecationBanner.vue', () => {
  // Props
  const description = 'Old, don\'t use.';
  const styleTokens = styleTokensBuiltIn;
  const allProps = {
    description,
    styleTokens
  };
  const requiredProps = {};

  const setupWrapper = async (props) => {
    const options = {
      props: {
        ...requiredProps,
        ...props
      }
    };
    const wrapper = await testHelpers.mount(DoxenDeprecationBanner, options);
    return wrapper;
  };

  test('Renders correctly with defaults', async () => {
    const wrapper = await setupWrapper();

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Renders correctly with all props', async () => {
    const wrapper = await setupWrapper(allProps);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
