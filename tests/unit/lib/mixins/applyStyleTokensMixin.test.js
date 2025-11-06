import ApplyStyleTokensMixin from '@/mixins/applyStyleTokensMixin.js';

describe('ApplyStyleTokensMixin', () => {
  const consoleInfo = console.info;

  beforeEach(() => {
    console.info = vi.fn();
    /**
     * This would normally be accessed from the component using
     * the mixin, but here we just fake it.
     */
    ApplyStyleTokensMixin.methods.styleTokens = {};
  });

  afterEach(() => {
    console.info = consoleInfo;
    delete ApplyStyleTokensMixin.methods.styleTokens;
  });

  test('Contains method', () => {
    expect(typeof(ApplyStyleTokensMixin.methods.applyStyleTokens))
      .toEqual('function');

    expect(console.info)
      .not.toHaveBeenCalled();
  });

  test('Default return with no style tokens passed in', () => {
    expect(ApplyStyleTokensMixin.methods.applyStyleTokens())
      .toEqual({
        class: '',
        'data-applied-style-tokens': '',
        'data-style-tokens': ''
      });

    expect(console.info)
      .not.toHaveBeenCalled();
  });

  test('Returns just classes based on valid tokens', () => {
    const tokens = {
      button: true,
      demoHeader: false,
      deprecated: true
    };

    ApplyStyleTokensMixin.methods.styleTokens = {
      button: 'bootan',
      demoHeader: 'header',
      deprecated: 'old cool'
    };

    expect(ApplyStyleTokensMixin.methods.applyStyleTokens(tokens))
      .toEqual({
        class: 'bootan old cool',
        'data-applied-style-tokens': 'button deprecated',
        'data-style-tokens': 'button demoHeader deprecated'
      });

    expect(console.info)
      .not.toHaveBeenCalled();
  });

  test('Returns attributes and classes based on valid tokens', () => {
    const tokens = {
      button: true,
      demoHeader: false,
      deprecated: true
    };

    ApplyStyleTokensMixin.methods.styleTokens = {
      button: {
        class: 'bootan',
        'data-btn': true
      },
      demoHeader: 'header',
      deprecated: 'old cool'
    };

    expect(ApplyStyleTokensMixin.methods.applyStyleTokens(tokens))
      .toEqual({
        'data-btn': true,
        class: 'bootan old cool',
        'data-applied-style-tokens': 'button deprecated',
        'data-style-tokens': 'button demoHeader deprecated'
      });

    expect(console.info)
      .not.toHaveBeenCalled();
  });

  test('Returns just attributes based on valid tokens', () => {
    const tokens = { button: true };

    ApplyStyleTokensMixin.methods.styleTokens = {
      button: { 'data-btn': true }
    };

    expect(ApplyStyleTokensMixin.methods.applyStyleTokens(tokens))
      .toEqual({
        'data-btn': true,
        class: '',
        'data-applied-style-tokens': 'button',
        'data-style-tokens': 'button'
      });

    expect(console.info)
      .not.toHaveBeenCalled();
  });

  test('Consoles out if a token is not allowed', () => {
    const tokens = {
      FAKE: true
    };

    expect(ApplyStyleTokensMixin.methods.applyStyleTokens(tokens))
      .toEqual({
        class: '',
        'data-applied-style-tokens': 'FAKE',
        'data-style-tokens': 'FAKE'
      });

    expect(console.info)
      .toHaveBeenCalledWith('Missing style token:', 'FAKE');
  });
});
