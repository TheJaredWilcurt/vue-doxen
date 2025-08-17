import HtmlFragments from '@/components/HtmlFragments.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('HtmlFragments.vue', () => {
  beforeEach(() => {
    globalThis.vueSnapshots.removeComments = true;
  });

  const setupWrapper = async (html) => {
    const options = {
      props: {
        html: html || ''
      }
    };
    const wrapper = await testHelpers.mount(HtmlFragments, options);
    return wrapper;
  };

  describe('Renders correctly', () => {
    test('Renders nothing', async () => {
      const wrapper = await setupWrapper();

      expect(wrapper)
        .toMatchSnapshot();
    });

    test('One element without children', async () => {
      const wrapper = await setupWrapper('<div></div>');

      expect(wrapper)
        .toMatchSnapshot();
    });

    test('One element with children', async () => {
      const wrapper = await setupWrapper([
        '<div class="box">',
        '<span>Text1</span>',
        '<span>Text2</span>',
        '</div>'
      ].join(''));

      expect(wrapper)
        .toMatchSnapshot();
    });

    test('Two root elements', async () => {
      const wrapper = await setupWrapper([
        '<div>Text</div>',
        '<p>Paragraph</p>'
      ].join(''));

      expect(wrapper)
        .toMatchSnapshot();
    });

    test('One text node', async () => {
      const wrapper = await setupWrapper('Some Text');

      expect(wrapper)
        .toMatchSnapshot();
    });

    test('Mix of everything', async () => {
      const wrapper = await setupWrapper([
        '<div></div>',
        '<div class="box cow" style="background: #F00">',
        'Content',
        '</div>',
        'Text node',
        '<p class="a"><strong class="a b c">Text</strong></p>'
      ].join('\n'));

      expect(wrapper)
        .toMatchSnapshot();
    });
  });
});
