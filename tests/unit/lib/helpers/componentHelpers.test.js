import { getArrayFromValidator } from '@/helpers/componentHelpers.js';

describe('Component Helpers', () => {
  describe('getArrayFromValidator', () => {
    test('Function without space after name', () => {
      const prop = {
        // eslint-disable-next-line space-before-function-paren,space-before-blocks
        validator: function v(value){
          return ['234'].includes(value);
        }
      };

      expect(getArrayFromValidator(prop.validator))
        .toEqual(['234']);
    });

    test('Multi-line allowed, method shorthand', () => {
      const prop = {
        // eslint-disable-next-line no-restricted-syntax,space-before-function-paren
        validator(value) {
          return [
            'asd',
            'wer'
          ].includes(value);
        }
      };

      expect(getArrayFromValidator(prop.validator))
        .toEqual(['asd', 'wer']);
    });

    test('Numbers and booleans', () => {
      const prop = {
        validator: function (value) {
          return [123, true, 'yui'].includes(value);
        }
      };

      expect(getArrayFromValidator(prop.validator))
        .toEqual([123, true, 'yui']);
    });

    test('Arrow function', () => {
      const prop = {
        validator: (value) => {
          return ['3gf', 'cf'].includes(value);
        }
      };

      expect(getArrayFromValidator(prop.validator))
        .toEqual(['3gf', 'cf']);
    });

    test('Shorthand arrow function with escaped strings', () => {
      const prop = {
        // eslint-disable-next-line arrow-parens
        validator: v => ['Dog\'s', 'Cat\'s', 'Sheep'].includes(v)
      };

      expect(getArrayFromValidator(prop.validator))
        .toEqual(['Dog\'s', 'Cat\'s', 'Sheep']);
    });

    test('Include variable reference', () => {
      const prop = {
        validator: function (val) {
          const dummy = 'zzz';
          return [dummy].includes(val);
        }
      };

      expect(getArrayFromValidator(prop.validator))
        .toEqual(undefined);
    });

    test('Not allowed via variable', () => {
      const prop = {
        validator: function (value) {
          const notAllowed = ['a', 'b'];
          return !notAllowed.includes(value);
        }
      };

      expect(getArrayFromValidator(prop.validator))
        .toEqual(undefined);
    });

    test('Not allowed direct', () => {
      const prop = {
        validator: function (value) {
          return !['234'].includes(value);
        }
      };

      expect(getArrayFromValidator(prop.validator))
        .toEqual(undefined);
    });

    test('Standard condition', () => {
      const prop = {
        validator: function (value) {
          return value < 5;
        }
      };

      expect(getArrayFromValidator(prop.validator))
        .toEqual(undefined);
    });

    test('Named reference', () => {
      const yyy = ['a'];
      // eslint-disable-next-line arrow-parens
      const validator = x => yyy.includes(x);
      const prop = { validator };

      expect(getArrayFromValidator(prop.validator))
        .toEqual(undefined);
    });
  });
});
