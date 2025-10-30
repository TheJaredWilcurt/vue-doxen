import { wrapOutput } from '@/linter/errorReporting.js';
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
        [wrapOutput('Vue-Doxen Linter started')],
        [wrapOutput('Vue-Doxen Linter completed in 0ms.')]
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
    let error;

    try {
      doxenLinter(demos, options, linterSettings);
    } catch (err) {
      error = err;
    }

    expect(console.info.mock.calls)
      .toEqual([
        [wrapOutput('Vue-Doxen Linter started')],
        ['The MyComponent demo must have a component description.'],
        [wrapOutput('Vue-Doxen Linter completed in 0ms.')],
        [wrapOutput('1 MyComponent')]
      ]);

    expect(error)
      .toEqual('\n' + wrapOutput('Vue-Doxen Linter: Found 1 error.'));
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
    let error;

    try {
      doxenLinter(demos, options, linterSettings);
    } catch (err) {
      error = err;
    }

    expect(console.info.mock.calls)
      .toEqual([
        [wrapOutput('Vue-Doxen Linter started')],
        ['The MyComponent demo must have a component description.'],
        ['The MyChild demo must have a component description.'],
        [wrapOutput('Vue-Doxen Linter completed in 0ms.')],
        [wrapOutput('1 MyComponent\n1 MyChild')]
      ]);

    expect(error)
      .toEqual('\n' + wrapOutput('Vue-Doxen Linter: Found 2 errors.'));
  });
});
