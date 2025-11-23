import {
  isComponent,
  unindent
} from '@@@@/helpers.js';

import DoxenButton from '@/components/DoxenButton.vue';

import { createDoxenButtonDemo } from '@@@/demos/doxenButtonDemo.js';

describe('Linter helpers', () => {
  describe('Is Vue component', () => {
    describe('Is', () => {
      test('Real component import', () => {
        expect(isComponent(DoxenButton))
          .toEqual(true);
      });

      test('Has render function', () => {
        expect(isComponent({ render: () => {} }))
          .toEqual(true);
      });

      test('Has setup function', () => {
        expect(isComponent({ setup: () => {} }))
          .toEqual(true);
      });

      test('Has an __file path', () => {
        expect(isComponent({ __file: '/my-folder/cool.vue' }))
          .toEqual(true);
      });
    });

    describe('Is not', () => {
      test('Not an object', () => {
        expect(isComponent(22))
          .toEqual(false);
      });

      test('Is Array', () => {
        expect(isComponent([DoxenButton]))
          .toEqual(false);
      });

      test('Is a demo', () => {
        expect(isComponent(createDoxenButtonDemo()))
          .toEqual(false);
      });

      test('Has an __file path that is not a Vue file', () => {
        expect(isComponent({ __file: '/my-folder/cool.js' }))
          .toEqual(false);
      });
    });
  });

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
