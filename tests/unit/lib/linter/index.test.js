import { wrapOutput } from '@/linter/errorReporting.js';
import { doxenLinter } from '@/linter/index.js';

describe('Doxen linter', () => {
  const consoleInfo = console.info;

  const DummyComponent = {
    name: 'DummyComponent',
    render: vi.fn()
  };

  let demos;
  let options;
  let linterSettings;

  beforeEach(() => {
    vi.useFakeTimers();
    console.info = vi.fn();
    demos = { DummyComponent };
    options = {};
    linterSettings = { demos: {} };
  });

  afterEach(() => {
    console.info = consoleInfo;
    vi.useRealTimers();
  });

  test('Success - logs out all messages', () => {
    let error;
    try {
      doxenLinter(demos, options, linterSettings);
    } catch (err) {
      error = err;
    }

    expect(console.info.mock.calls)
      .toEqual([
        [wrapOutput('Vue-Doxen Linter started')],
        [wrapOutput('Vue-Doxen Linter completed in 0ms.')]
      ]);

    expect(error)
      .toEqual(undefined);
  });

  test('Fails on empty demos object', () => {
    demos = {};
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
        [wrapOutput('Vue-Doxen Linter: The demos object is empty or invalid.')],
        [wrapOutput('Vue-Doxen Linter completed in 0ms.')]
      ]);

    expect(error)
      .toEqual(undefined);
  });

  test('Fails on 1 error - logs out all messages and throws', () => {
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
        [
          [
            '  ╒════════════════════════════════════════════════════════════╕',
            '  │ DummyComponent                                             │',
            '  ╞════════════════════════════════════════════════════════════╡',
            '  │ demos.mustHaveDescription                                  │',
            '  ├────────────────────────────────────────────────────────────┤',
            '  │ The DummyComponent demo must have a component description. │',
            '  ╘════════════════════════════════════════════════════════════╛'
          ].join('\n')
        ],
        [wrapOutput('Vue-Doxen Linter completed in 0ms.')]
      ]);

    expect(error)
      .toEqual('\n' + wrapOutput('Vue-Doxen Linter: Found 1 error.'));
  });

  test('Fails on 2 errors - logs out all messages and throws', () => {
    demos = {
      DummyComponent,
      MyComponent: DummyComponent,
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
        [wrapOutput('The MyChild demo, is not a demo object or Vue component.')],
        [
          [
            '  ╒════════════════════════════════════════════════════════════╕',
            '  │ DummyComponent                                             │',
            '  ╞════════════════════════════════════════════════════════════╡',
            '  │ demos.mustHaveDescription                                  │',
            '  ├────────────────────────────────────────────────────────────┤',
            '  │ The DummyComponent demo must have a component description. │',
            '  ╘════════════════════════════════════════════════════════════╛'
          ].join('\n')
        ],
        [
          [
            '  ╒═════════════════════════════════════════════════════════╕',
            '  │ MyComponent                                             │',
            '  ╞═════════════════════════════════════════════════════════╡',
            '  │ demos.mustHaveDescription                               │',
            '  ├─────────────────────────────────────────────────────────┤',
            '  │ The MyComponent demo must have a component description. │',
            '  ╘═════════════════════════════════════════════════════════╛'
          ].join('\n')
        ],
        [wrapOutput('Vue-Doxen Linter completed in 0ms.')]
      ]);

    expect(error)
      .toEqual('\n' + wrapOutput('Vue-Doxen Linter: Found 2 errors.'));
  });
});
