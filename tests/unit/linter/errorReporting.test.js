import { generateErrorReport } from '@@@@/errorReporting.js';

describe('Linter error reporting', () => {
  const consoleInfo = console.info;

  beforeEach(() => {
    console.info = vi.fn();
  });

  afterEach(() => {
    console.info = consoleInfo;
  });

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

    test('Generates report with one error', () => {
      const ERROR = {
        ruleName: 'x.y.z',
        demoName: 'MyComponent',
        message: 'Fix problem.'
      };
      generateErrorReport([ERROR]);

      expect(console.info)
        .toHaveBeenCalledWith([
          '  ╔══════════════╗',
          '  ║ MyComponent  ║',
          '  ╠══════════════╣',
          '  ║ x.y.z        ║',
          '  ╟──────────────╢',
          '  ║ Fix problem. ║',
          '  ╚══════════════╝'
        ].join('\n'));
    });

    test('Generates report with two different errors on the same demo', () => {
      const ERROR1 = {
        ruleName: 'x.y.z',
        demoName: 'MyComponent',
        message: 'Fix problem.'
      };
      const ERROR2 = {
        ruleName: 'a.b.c',
        demoName: 'MyComponent',
        message: 'Fix other problem.'
      };
      generateErrorReport([ERROR1, ERROR2]);

      expect(console.info)
        .toHaveBeenCalledWith([
          '  ╔════════════════════╗',
          '  ║ MyComponent        ║',
          '  ╠════════════════════╣',
          '  ║ x.y.z              ║',
          '  ╟────────────────────╢',
          '  ║ Fix problem.       ║',
          '  ╠════════════════════╣',
          '  ║ a.b.c              ║',
          '  ╟────────────────────╢',
          '  ║ Fix other problem. ║',
          '  ╚════════════════════╝'
        ].join('\n'));
    });

    test('Generates report with two similar errors on the same demo', () => {
      const ERROR1 = {
        ruleName: 'x.y.z',
        demoName: 'MyComponent',
        message: 'Fix problem.'
      };
      const ERROR2 = {
        ruleName: 'x.y.z',
        demoName: 'MyComponent',
        message: 'Fix other problem.'
      };
      generateErrorReport([ERROR1, ERROR2]);

      expect(console.info)
        .toHaveBeenCalledWith([
          '  ╔════════════════════╗',
          '  ║ MyComponent        ║',
          '  ╠════════════════════╣',
          '  ║ x.y.z              ║',
          '  ╟────────────────────╢',
          '  ║ Fix problem.       ║',
          '  ║ Fix other problem. ║',
          '  ╚════════════════════╝'
        ].join('\n'));
    });

    test('Generates report with two errors on different demos', () => {
      const ERROR1 = {
        ruleName: 'x.y.z',
        demoName: 'MyComponent',
        message: 'Fix problem.'
      };
      const ERROR2 = {
        ruleName: 'x.y.z',
        demoName: 'MyChild',
        message: 'Fix other problem.'
      };
      generateErrorReport([ERROR1, ERROR2]);

      expect(console.info)
        .toHaveBeenCalledWith([
          '  ╔══════════════╗',
          '  ║ MyComponent  ║',
          '  ╠══════════════╣',
          '  ║ x.y.z        ║',
          '  ╟──────────────╢',
          '  ║ Fix problem. ║',
          '  ╚══════════════╝'
        ].join('\n'));

      expect(console.info)
        .toHaveBeenCalledWith([
          '  ╔════════════════════╗',
          '  ║ MyChild            ║',
          '  ╠════════════════════╣',
          '  ║ x.y.z              ║',
          '  ╟────────────────────╢',
          '  ║ Fix other problem. ║',
          '  ╚════════════════════╝'
        ].join('\n'));
    });
  });
});
