import { serializeJavaScript } from '@/helpers/serializeJavaScript.js';

describe('Serialize JavaScript', () => {
  let externalObject;
  let value;

  beforeEach(() => {
    const date = new Date(2023, 12, 31);
    vi.useFakeTimers();
    vi.setSystemTime(date);

    let undefinedValue;

    function externalMethod (foo, bar) {
      let baz = foo + bar;

      return baz;
    }

    externalObject = {
      key: 'value'
    };

    value = {
      name: 'MyComponent',
      type: [
        String,
        Number,
        Boolean
      ],
      externalObject,
      longString: 'one\'s\ntwo\n"three"',
      emptyObject: {},
      emptyArray: [],
      objectWithArray: {
        arrayOfStrings: [
          'foo',
          'bar',
          'baz'
        ]
      },
      dates: [
        new Date(),
        new Date('05/25/1954')
      ],
      numbers: [
        10,
        883,
        5213023,
        -10,
        Infinity,
        -Infinity,
        NaN,
        0
      ],
      booleans: [
        true,
        false
      ],
      pretendClickEvent: {
        toString: function () {
          return '[object MouseEvent]';
        }
      },
      isTrue: true,
      isFalse: false,
      localMethod: function (foo, bar) {
        let baz = foo + bar;

        return baz;
      },
      externalMethod,
      acceptableArrowFunction: (foo, bar) => {
        return foo + bar;
      },
      /* eslint-disable-next-line arrow-parens */
      uglyAF: foo => foo.toUpperCase(),
      isUndefined: undefinedValue,
      isNull: null,
      isError: new Error('This is an error')
    };

    // Circular reference
    externalObject.value = value;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('Throws when nothing passed in', () => {
    let serialized;
    let error;

    try {
      serialized = serializeJavaScript();
    } catch (caught) {
      error = caught;
    }

    expect(serialized)
      .toEqual(undefined);

    expect(error)
      .toEqual('Error: No JavaScript object provided to serialize.');
  });

  test('Object serialized with default arguments', () => {
    let serialized;
    let error;

    try {
      serialized = serializeJavaScript(value);
    } catch (caught) {
      error = caught;
    }

    expect(error)
      .toEqual(undefined);

    expect(serialized)
      .toMatchSnapshot();
  });

  test('Object serialized without full function expansion', () => {
    let serialized;
    let error;

    try {
      serialized = serializeJavaScript(value, undefined, false);
    } catch (caught) {
      error = caught;
    }

    expect(error)
      .toEqual(undefined);

    expect(serialized)
      .toMatchSnapshot();
  });

  test('Object serialized with indentation', () => {
    let serialized;
    let error;

    try {
      serialized = serializeJavaScript(value, 4);
    } catch (caught) {
      error = caught;
    }

    expect(error)
      .toEqual(undefined);

    expect(serialized)
      .toMatchSnapshot();
  });
});
