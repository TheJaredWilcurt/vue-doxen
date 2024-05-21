import { serializeJavaScript } from '@/helpers/serializeJavaScript.js';

describe('Serialize JavaScript', () => {
  let address;
  let value;

  beforeEach(() => {
    const date = new Date(2023, 12, 31);
    vi.useFakeTimers();
    vi.setSystemTime(date);

    let undefinedValue;

    function onAnother (foo, bar) {
      let baz = foo + bar;

      return baz;
    }

    address = {
      street: 'Callejon de las ranas 128',
      city: 'Falfurrias',
      state: 'Texas',
      zip: '88888-9999'
    };

    value = {
      name: 'Damaso Infanzon Manzo',
      type: [
        String,
        Number,
        Boolean
      ],
      address,
      longString: 'one\'s\ntwo\n"three"',
      favorites: {
        music: [
          'Mozart',
          'Beethoven',
          'The Beatles'
        ]
      },
      dates: [
        new Date(),
        new Date('05/25/1954')
      ],
      numbers: [
        10,
        883,
        521
      ],
      boolean: [
        true,
        false,
        false,
        false
      ],
      isObject: true,
      isDuck: false,
      onWhatever: function (foo, bar) {
        let baz = foo + bar;

        return baz;
      },
      onAnother,
      foo: undefinedValue,
      thisShouldBeNull: null,
      error: new Error('This is an error')
    };

    // Circular reference
    address.value = value;
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

    expect(typeof(serialized))
      .toEqual('undefined');

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

    expect(serialized)
      .toMatchSnapshot();

    expect(error)
      .toEqual(undefined);
  });
});
