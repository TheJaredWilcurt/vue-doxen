import { generateErrorReport } from '@/linter/errorReporting.js';

describe('Linter error reporting', () => {
  describe('generateErrorReport', () => {
    describe('Quick return', () => {
      test('Nothing passed in, returns undefined', () => {
        expect(generateErrorReport())
          .toEqual(undefined);
      });

      test('Non-array passed in, returns undefined', () => {
        expect(generateErrorReport('22'))
          .toEqual(undefined);
      });

      test('Empty array passed in, returns undefined', () => {
        expect(generateErrorReport([]))
          .toEqual(undefined);
      });
    });

    test('Generates report with one name', () => {
      expect(generateErrorReport(['MyComponent']))
        .toEqual('1 MyComponent');
    });

    test('Generates report with the same name twice', () => {
      expect(generateErrorReport(['MyComponent', 'MyComponent']))
        .toEqual('2 MyComponent');
    });

    test('Generates report with multiple names out of order', () => {
      expect(generateErrorReport([
        'MyComponent',
        'options',
        'MyComponent',
        'MyChild',
        'options',
        'MyChild',
        'MyChild'
      ]))
        .toEqual([
          '2 MyComponent',
          '2 options',
          '3 MyChild'
        ].join('\n'));
    });
  });
});
