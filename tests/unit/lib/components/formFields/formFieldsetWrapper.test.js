import { styleTokensBuiltIn } from '@/helpers/styleTokens.js';

import FormFieldsetWrapper from '@/components/formFields/FormFieldsetWrapper.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('FormFieldsetWrapper.vue', () => {
  // Props
  const modelValue = [{ a: true, b: 2 }];
  const styleTokens = styleTokensBuiltIn;
  const allProps = {
    modelValue,
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
    const wrapper = await testHelpers.mount(FormFieldsetWrapper, options);
    return wrapper;
  };

  test('Renders correctly with nothing passed in', async () => {
    const wrapper = await setupWrapper({});

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Renders with allProps', async () => {
    const wrapper = await setupWrapper(allProps);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
