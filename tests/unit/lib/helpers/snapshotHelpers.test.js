import { dataValue } from '@/helpers/snapshotHelpers.js';

describe('Snapshot Helpers', () => {
  describe('dataValue', () => {
    test('Native events', () => {
      const SimulateClickEvent = function () {};
      SimulateClickEvent.prototype.toString = () => '[object ClickEvent]';
      const simulateClickEvent = new SimulateClickEvent();

      expect(dataValue(simulateClickEvent))
        .toEqual('Native Click Event');
    });

    test('Various types', () => {
      expect(dataValue(null))
        .toEqual('null');

      expect(dataValue(undefined))
        .toEqual('undefined');

      expect(dataValue(7))
        .toEqual('7');

      expect(dataValue([1, 2, 3]))
        .toEqual('[1,2,3]');

      expect(dataValue(NaN))
        .toEqual('NaN');

      expect(dataValue(Infinity))
        .toEqual('Infinity');

      expect(dataValue(-Infinity))
        .toEqual('-Infinity');

      expect(dataValue(new Set([1, 2])))
        .toEqual('[1,2]');

      expect(dataValue(new Date('2024')))
        .toEqual('1704067200000');

      expect(dataValue(new Date('INVALID_DATE')))
        .toEqual('Invalid Date');

      expect(dataValue([BigInt(9007199254740991)]))
        .toEqual('');

      expect(dataValue(new Set([BigInt(9007199254740991)])))
        .toEqual('');

      expect(dataValue(Boolean))
        .toEqual('Function');

      expect(dataValue((new Error('Text'))))
        .toEqual('Error: Text');

      expect(dataValue({ a: 2, b: 4 }))
        .toEqual('{a:2,b:4}');

      expect(dataValue('Text'))
        .toEqual('\'Text\'');

      expect(dataValue('Test "Test" \'Test\''))
        .toEqual('\'Test \\\'Test\\\' "Test"\'');
    });
  });
});
