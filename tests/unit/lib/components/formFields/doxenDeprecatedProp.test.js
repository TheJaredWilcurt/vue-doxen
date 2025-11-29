import { styleTokensBuiltIn } from '@/helpers/styleTokens.js';

import DoxenDeprecatedProp from '@/components/formFields/DoxenDeprecatedProp.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('DoxenDeprecatedProp.vue', () => {
  // Props
  const styleTokens = styleTokensBuiltIn;
  const requiredProps = {};

  const setupWrapper = async (props) => {
    const options = {
      props: {
        ...requiredProps,
        ...props
      },
      slots: {
        default: 'Slot text'
      }
    };
    const wrapper = await testHelpers.mount(DoxenDeprecatedProp, options);
    return wrapper;
  };

  test('Renders correctly', async () => {
    const wrapper = await setupWrapper({ styleTokens });

    expect(wrapper)
      .toMatchSnapshot();
  });
});
