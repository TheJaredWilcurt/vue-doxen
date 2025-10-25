import { unindent } from '@/linter/helpers.js';

describe('Linter helpers', () => {
  describe('Unindent', () => {
    test('Returns original value if it is not indented', () => {
      expect(unindent('a'))
        .toEqual('a');

      expect(unindent('\na'))
        .toEqual('\na');
    });

    test('Unindents and trims text', () => {
      expect(unindent('\n  a\n  b\n'))
        .toEqual('a\nb');
    });
  });
});
