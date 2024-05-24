import { serializeJavaScript } from '@/helpers/serializeJavaScript.js';

describe('Serialize JavaScript', () => {
  let externalObject;
  let value;
  let serialized;
  let error;

  beforeEach(() => {
    serialized = undefined;
    error = undefined;

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
      'hyphenated-key': 'model-value',
      'key with spaces': 1,
      '5startsWithNumber': 5,
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

  describe('Serialize non-objects', () => {
    test('falsy', () => {
      expect(serializeJavaScript(false))
        .toEqual('false');

      expect(serializeJavaScript(undefined))
        .toEqual('undefined');

      expect(serializeJavaScript(0))
        .toEqual('0');

      expect(serializeJavaScript(-0))
        .toEqual('0');

      expect(serializeJavaScript(0n))
        .toEqual('0');

      expect(serializeJavaScript(0x0n))
        .toEqual('0');

      expect(serializeJavaScript(''))
        .toEqual('\'\'');

      expect(serializeJavaScript(null))
        .toEqual('null');

      expect(serializeJavaScript(NaN))
        .toEqual('NaN');
    });

    test('true', () => {
      expect(serializeJavaScript(true))
        .toEqual('true');
    });

    test('Numbers', () => {
      expect(serializeJavaScript(22))
        .toEqual('22');

      expect(serializeJavaScript(-22))
        .toEqual('-22');

      expect(serializeJavaScript(245.532))
        .toEqual('245.532');

      expect(serializeJavaScript(-3.14))
        .toEqual('-3.14');
    });
  });

  describe('Serialize objects', () => {
    test('Object serialized with default arguments', () => {
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
});
