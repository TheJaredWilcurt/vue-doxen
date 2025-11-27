import { styleTokensBuiltIn } from '@/helpers/styleTokens.js';

import DoxenPlainText from '@/components/formFields/DoxenPlainText.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('DoxenPlainText.vue', () => {
  // Props
  const errorMessage = 'Error';
  const label = 'Label';
  const message = 'Message';
  const modelValue = { value: 2 };
  const styleTokens = styleTokensBuiltIn;
  const asCode =  true;
  const codeAsString = '{ "value": 2 }';
  const allProps = {
    errorMessage,
    label,
    message,
    modelValue,
    styleTokens,
    asCode,
    codeAsString
  };
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
    const wrapper = await testHelpers.mount(DoxenPlainText, options);
    return wrapper;
  };

  test('Renders correctly', async () => {
    const wrapper = await setupWrapper();

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Renders correctly with all props', async () => {
    const wrapper = await setupWrapper(allProps);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Renders correctly with asCode', async () => {
    const wrapper = await setupWrapper({
      label,
      modelValue,
      asCode
    });

    expect(wrapper)
      .toMatchSnapshot();
  });
});
