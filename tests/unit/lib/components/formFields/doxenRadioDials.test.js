import { styleTokensBuiltIn } from '@/helpers/styleTokens.js';

import DoxenRadioDials from '@/components/formFields/DoxenRadioDials.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('DoxenRadioDials.vue', () => {
  // Props
  const disabled = true;
  const errorMessage = 'Error';
  const label = 'Label';
  const message = 'Message';
  const modelValue = 'b';
  const options = [
    {
      name: 'A',
      value: 'a'
    },
    {
      name: 'B',
      value: 'b'
    }
  ];
  const required = true;
  const styleTokens = styleTokensBuiltIn;
  const allProps = {
    disabled,
    errorMessage,
    label,
    message,
    modelValue,
    options,
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
    const wrapper = await testHelpers.mount(DoxenRadioDials, options);
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

  test('Emits on input', async () => {
    const wrapper = await setupWrapper({
      label,
      options,
      modelValue
    });

    expect(wrapper.emitted())
      .toEqual({});

    const radioDial = wrapper.find('[data-test="radio-button-a"]');
    await radioDial.setValue();

    expect(wrapper.emitted())
      .toEqual({
        change: expect.any(Array),
        input: expect.any(Array),
        'update:model-value': [['a']]
      });
  });
});
