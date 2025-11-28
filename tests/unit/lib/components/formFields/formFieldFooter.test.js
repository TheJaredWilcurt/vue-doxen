import { styleTokensBuiltIn } from '@/helpers/styleTokens.js';

import FormFieldFooter from '@/components/formFields/FormFieldFooter.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('FormFieldFooter.vue', () => {
  // Props
  const errorMessage = 'Error';
  const innerHTML = '<strong>Markup</strong>';
  const message = 'Message';
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
    const wrapper = await testHelpers.mount(FormFieldFooter, options);
    return wrapper;
  };

  test('Renders correctly with nothing passed in', async () => {
    const wrapper = await setupWrapper({});

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Renders message', async () => {
    const wrapper = await setupWrapper({ message, styleTokens });

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Renders errorMessage', async () => {
    const wrapper = await setupWrapper({ errorMessage, styleTokens });

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Renders innerHTML', async () => {
    const wrapper = await setupWrapper({ innerHTML, styleTokens });

    expect(wrapper)
      .toMatchSnapshot();
  });
});
