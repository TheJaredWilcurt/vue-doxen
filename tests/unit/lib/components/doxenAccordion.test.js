import { styleTokensBuiltIn } from '@/helpers/styleTokens.js';

import DoxenAccordion from '@/components/DoxenAccordion.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('DoxenAccordion.vue', () => {
  // Props
  const durationMs = 100;
  const show = false;
  const timingFunction = 'linear';
  const styleTokens = styleTokensBuiltIn;
  const allProps = {
    durationMs,
    show,
    timingFunction,
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
        default: 'Text'
      }
    };
    const wrapper = await testHelpers.mount(DoxenAccordion, options);
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
