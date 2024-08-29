import { styleTokensBuiltIn } from '@/helpers/styleTokens.js';

import DoxenCodeBox from '@/components/DoxenCodeBox.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('DoxenCodeBox', () => {
  const consoleError = console.error;

  // Props
  const html = '<div attribute="value">\n  Text\n</div>';
  const js = 'const value = 4;\nconsole.log({\n  key: value\n});';
  const styleTokens = styleTokensBuiltIn;
  const requiredProps = {};

  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = consoleError;
  });

  const setupWrapper = async (props) => {
    const options = {
      props: {
        ...requiredProps,
        ...props
      }
    };
    const wrapper = await testHelpers.mount(DoxenCodeBox, options);
    return wrapper;
  };

  test('Renders with just required props', async () => {
    const wrapper = await setupWrapper();

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Renders HTML', async () => {
    const props = {
      code: html,
      styleTokens
    };
    const wrapper = await setupWrapper(props);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Renders JavaScript', async () => {
    const props = {
      code: js,
      styleTokens
    };
    const wrapper = await setupWrapper(props);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
