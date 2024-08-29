import { styleTokensBuiltIn } from '@/helpers/styleTokens.js';

import DoxenCodeBox from '@/components/DoxenCodeBox.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('DoxenCodeBox', () => {
  const consoleError = console.error;

  // Props
  const html = '<div attribute="value">\n  Text\n</div>';
  const js = 'const value = 4;\nconsole.log({\n  key: value\n});';
  const code = '<h1>Text</h1>';
  const styleTokens = styleTokensBuiltIn;
  const requiredProps = {};

  beforeEach(() => {
    console.error = vi.fn();
    vi.useFakeTimers();
  });

  afterEach(() => {
    console.error = consoleError;
    vi.useRealTimers();
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

  test('Copy text temporarily displayed after clicking on codebox', async () => {
    const wrapper = await setupWrapper({ code });
    const firstDiv = wrapper.find('[aria-label="Code example"]');
    await firstDiv.trigger('click');

    expect(wrapper.vm.copied)
      .toEqual(true);

    vi.runAllTimers();

    expect(wrapper.vm.copied)
      .toEqual(false);
  });

  test('Copy text temporarily displayed after pressing enter', async () => {
    const wrapper = await setupWrapper({ code });
    const firstDiv = wrapper.find('[aria-label="Code example"]');
    await firstDiv.trigger('keydown.enter');

    expect(wrapper.vm.copied)
      .toEqual(true);

    vi.runAllTimers();

    expect(wrapper.vm.copied)
      .toEqual(false);
  });

  test('Copy text temporarily displayed after pressing space', async () => {
    const wrapper = await setupWrapper({ code });
    const firstDiv = wrapper.find('[aria-label="Code example"]');
    await firstDiv.trigger('keydown.space');

    expect(wrapper.vm.copied)
      .toEqual(true);

    vi.runAllTimers();

    expect(wrapper.vm.copied)
      .toEqual(false);
  });

  describe('Mock clipboard', () => {
    let consoleError;
    let writeText;

    beforeEach(() => {
      consoleError = console.error;
      console.error = vi.fn();

      writeText = navigator.clipboard.writeText;
      navigator.clipboard.writeText = vi.fn(() => {
        throw new Error('Clipboard permission missing.');
      });
    });

    afterEach(() => {
      console.error = consoleError;
      navigator.clipboard.writeText = writeText;
    });

    test('Catch copy error.', async () => {
      const wrapper = await setupWrapper({ code });
      const firstDiv = wrapper.find('[aria-label="Code example"]');
      await firstDiv.trigger('click');

      expect(navigator.clipboard.writeText)
        .toHaveBeenCalledWith(code);

      expect(console.error)
        .toHaveBeenCalledWith('Clipboard permission missing.');
    });
  });
});
