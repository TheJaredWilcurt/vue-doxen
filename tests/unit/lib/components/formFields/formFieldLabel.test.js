import { styleTokensBuiltIn } from '@/helpers/styleTokens.js';

import FormFieldLabel from '@/components/formFields/FormFieldLabel.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('FormFieldLabel.vue', () => {
  // Props
  const disabled = true;
  const errorMessage = 'Error';
  const idFor = 'Unique';
  const label = 'Label';
  const required = true;
  const styleTokens = styleTokensBuiltIn;
  const allProps = {
    disabled,
    errorMessage,
    idFor,
    label,
    required,
    styleTokens
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
    const wrapper = await testHelpers.mount(FormFieldLabel, options);
    return wrapper;
  };

  test('Renders correctly with nothing passed in', async () => {
    const wrapper = await setupWrapper({});

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Renders correctly with just label', async () => {
    const wrapper = await setupWrapper({ label });

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Renders with all props', async () => {
    const wrapper = await setupWrapper(allProps);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
