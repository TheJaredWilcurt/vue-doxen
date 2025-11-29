import { styleTokensBuiltIn } from '@/helpers/styleTokens.js';

import DoxenCodeSwapper from '@/components/DoxenCodeSwapper.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('DoxenCodeSwapper', () => {
  const html = '<div attribute="value">\n  Text\n</div>';
  const js = 'const value = 4;\nconsole.log({\n  key: value\n});';
  const object = {
    key: 'value',
    fn: () => { return 2; }
  };

  // Props
  const codeTypes = {
    html,
    js,
    object
  };
  const copy = false;
  const fileName = {
    html: 'file.vue',
    js: 'file.js',
    object: 'example.js'
  };
  const fileNameString = 'myFile.js';
  const styleTokens = styleTokensBuiltIn;
  const allProps = {
    codeTypes,
    copy,
    fileName,
    styleTokens
  };
  const requiredProps = {
    codeTypes
  };

  const setupWrapper = async (props) => {
    const options = {
      props: {
        ...requiredProps,
        ...props
      }
    };
    const wrapper = await testHelpers.mount(DoxenCodeSwapper, options);
    return wrapper;
  };

  test('Renders with just required props', async () => {
    const wrapper = await setupWrapper();

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Renders with all props', async () => {
    const wrapper = await setupWrapper(allProps);

    expect(wrapper)
      .toMatchSnapshot();

    expect(wrapper.find('[data-test="current-file-name"]').text())
      .toMatch('file.vue');
  });

  test('Renders with all props, but fileName is a string', async () => {
    const wrapper = await setupWrapper({
      ...allProps,
      fileName: fileNameString
    });

    expect(wrapper.find('[data-test="current-file-name"]').text())
      .toMatch(fileNameString);
  });
});
