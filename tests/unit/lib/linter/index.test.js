import { doxenLinter } from '@/linter/index.js';

describe('Doxen linter', () => {
  const consoleInfo = console.info;

  let demos;
  let options;
  let linterSettings;

  beforeEach(() => {
    vi.useFakeTimers();
    console.info = vi.fn();
    demos = {};
    options = {};
    linterSettings = { demos: {} };
  });

  afterEach(() => {
    console.info = consoleInfo;
    vi.useRealTimers();
  });

  test('Success - logs out all messages', () => {
    doxenLinter(demos, options, linterSettings);

    expect(console.info.mock.calls)
      .toEqual([
        ['Vue-Doxen Linter started'],
        ['Vue-Doxen Linter completed in 0ms.']
      ]);
  });

  test('Fails on 1 error - logs out all messages and throws', () => {
    demos = {
      MyComponent: {
        name: 'MyComponent'
      }
    };
    linterSettings = {
      demos: {
        mustHaveDescription: true
      }
    };

    try {
      doxenLinter(demos, options, linterSettings);
    } catch (error) {
      expect(error)
        .toEqual('Vue-Doxen Linter: Found 1 error.');
    }

    expect(console.info.mock.calls)
      .toEqual([
        ['Vue-Doxen Linter started'],
        ['The MyComponent demo must have a component description.'],
        ['Vue-Doxen Linter completed in 0ms.'],
        ['\n1 MyComponent\n']
      ]);
  });

  test('Fails on 2 errors - logs out all messages and throws', () => {
    demos = {
      MyComponent: {
        name: 'MyComponent'
      },
      MyChild: {
        name: 'MyChild'
      }
    };
    linterSettings = {
      demos: {
        mustHaveDescription: true
      }
    };

    try {
      doxenLinter(demos, options, linterSettings);
    } catch (error) {
      expect(error)
        .toEqual('Vue-Doxen Linter: Found 2 errors.');
    }

    expect(console.info.mock.calls)
      .toEqual([
        ['Vue-Doxen Linter started'],
        ['The MyComponent demo must have a component description.'],
        ['The MyChild demo must have a component description.'],
        ['Vue-Doxen Linter completed in 0ms.'],
        ['\n1 MyComponent\n1 MyChild\n']
      ]);
  });
});
