import { styleTokensBuiltIn } from '@/helpers/styleTokens.js';

import DoxenButton from '@/components/DoxenButton.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('DoxenButton.vue', () => {
  const selected = true;
  const styleTokens = styleTokensBuiltIn;
  const requiredProps = {};

  const setupWrapper = async (props) => {
    const options = {
      props: {
        ...requiredProps,
        ...props
      },
      slots: {
        default: 'Text'
      }
    };
    const wrapper = await testHelpers.mount(DoxenButton, options);
    return wrapper;
  };

  test('Renders correctly', async () => {
    const wrapper = await setupWrapper();

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Selected', async () => {
    const props = { selected, styleTokens };
    const wrapper = await setupWrapper(props);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Style tokesn', async () => {
    const wrapper = await setupWrapper({ styleTokens });

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Emit click', async () => {
    const wrapper = await setupWrapper();

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted().click[0].length)
      .toEqual(1);
  });
});
