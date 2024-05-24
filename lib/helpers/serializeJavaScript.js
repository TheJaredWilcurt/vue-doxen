/**
 * @file I tried a dozen different JS serialize/pretty-print libraries and they were all
 * either pretty bad or abandoned long ago. So sadly, I had to make my own for this project.
 *
 * I used js-object-pretty-print as a base (circa 2017), but have changed basically every
 * line, removed large chunks and added in new functionality.
 * Though you can npm install it: https://www.npmjs.com/package/js-object-pretty-print
 * The source no longer exists: https://github.com/cvadillo/js-object-pretty-print
 * and I don't know why. This is actually the case for many of the libraries I tried.
 * I guess this problem space is too annoying to maintain a general solution for.
 */

/**
 * Attempts to serialize any JavaScript object, including those with
 * Map, Set, functions, native built-ins (Boolean, Number...), etc.
 *
 * @param  {object}  jsObject             Any JavaScript object
 * @param  {number}  [indentation=2]      Number of spaces in a one level indent. Default to 2.
 * @param  {boolean} [fullFunction=true]  Defaults to true to show entire function signatures. false = Show just the word function.
 * @return {string}                       A serialized string
 */
export const serializeJavaScript = function (jsObject, indentation, fullFunction) {
  /* FALSY VALUES */
  if (jsObject === false) {
    return 'false';
  }
  if (jsObject === true) {
    return 'true';
  }
  if (jsObject === undefined) {
    return 'undefined';
  }
  // Zero, Negative Zero, and both BigInt Zeroes
  if ([0, -0, 0n, 0x0n].includes(jsObject)) {
    return '0';
  }
  if (jsObject === '') {
    return '\'\'';
  }
  if (jsObject === null) {
    return 'null';
  }
  if (typeof(jsObject) === 'number') {
    if (isNaN(jsObject)) {
      return 'NaN';
    }
    return jsObject.toString();
  }

  if (indentation === undefined) {
    indentation = 2;
  }
  if (fullFunction !== false) {
    fullFunction = true;
  }

  const repeatString = function (string, length) {
    return (new Array(length))
      .fill(string)
      .join('');
  };

  const indentString = repeatString(' ', indentation);
  const newLine = '\n';
  const newLineJoin = ',' + newLine;
  const TOSTRING = Object.prototype.toString;
  // As we loop over things, keep track of what we've seen to avoid circular references
  const visited = [];

  const nativeConstructors = [];
  const buildNativeConstructorsList = function () {
    /**
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
     * Note: Not all global objects listed there can be combined when an empty string to
     * produce a native function string, needed in the following condition.
     */
    const nativeConstructorsAsStrings = [
      'AggregateError',
      'Array',
      'ArrayBuffer',
      'BigInt',
      'BigInt64Array',
      'BigUint64Array',
      'Boolean',
      'DataView',
      'Date',
      'Error',
      'EvalError',
      'FinalizationRegistry',
      'Float32Array',
      'Float64Array',
      'Function',
      'Int8Array',
      'Int16Array',
      'Int32Array',
      'Intl.Collator',
      'Intl.DateTimeFormat',
      'Intl.DisplayNames',
      'Intl.ListFormat',
      'Intl.Locale',
      'Intl.NumberFormat',
      'Intl.PluralRules',
      'Intl.RelativeTimeFormat',
      'Intl.Segmenter',
      'Iterator',
      'Map',
      'Number',
      'Object',
      'Promise',
      'Proxy',
      'RangeError',
      'ReferenceError',
      'RegExp',
      'Set',
      'SharedArrayBuffer',
      'String',
      'Symbol',
      'SyntaxError',
      'TypeError',
      'Uint8Array',
      'Uint8ClampedArray',
      'Uint16Array',
      'Uint32Array',
      'URIError',
      'WeakMap',
      'WeakRef',
      'WeakSet'
    ];

    /**
     * Not all native constructors exist in all environments, some browsers or older Node
     * versions may not support everything. So here we check the window/global object
     * for their existence before pushing them onto the array for use in this function.
     * This prevents run-time bombs from popping up, and the need to meticulously document
     * the varied support of these features. However, to support both browsers and Node, we
     * use globalThis, which has wide support among Node/Browsers since 2019. But if you are
     * targeting legacy environments, you'd need to replace it with global or window.
     */
    for (const nativeConstructor of nativeConstructorsAsStrings) {
      if (globalThis[nativeConstructor]) {
        nativeConstructors.push(globalThis[nativeConstructor]);
      }
    }
  };
  const getNativeBuiltInName = function (value) {
    if (typeof(value) !== 'function') {
      return;
    }

    if (!nativeConstructors.length) {
      buildNativeConstructorsList();
    }

    if (nativeConstructors.includes(value)) {
      // Number => 'function Number() { [native code] }' => 'Number'
      return (value + '').split(' ')[1].split('(')[0];
    }
    return;
  };

  /**
   * Detects native browser events and returns a human-readable
   * stringified name or undefined if not a native event. We call
   * this first because _cloneDeep converts native events to empty
   * objects.
   *
   * @param  {object} obj  Any object, including native events
   * @return {string}      The human readble even type or undefined
   */
  const handleNativeEvents = function (obj) {
    if (
      typeof(obj) === 'object' &&
      String(obj).startsWith('[object ') &&
      String(obj).endsWith('Event]')
    ) {
      const type = String(obj)
        .replace('[object ', '')
        .replace('Event]', '');
      return 'Native ' + type + ' Event';
    }
    return undefined;
  };

  const valueType = function (object) {
    if (getNativeBuiltInName(object)) {
      return 'NATIVE_BUILT_IN';
    }
    if (handleNativeEvents(object)) {
      return 'NATIVE_EVENT';
    }
    const TYPES = {
      undefined: 'undefined',
      number: 'number',
      boolean: 'boolean',
      string: 'string',
      '[object Function]': 'function',
      '[object RegExp]': 'regexp',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object Error]': 'error'
    };
    const type = (
      TYPES[typeof(object)] ||
      TYPES[TOSTRING.call(object)] ||
      (object ? 'object' : 'null')
    );
    return type;
  };

  /**
   * Takes a string like '{\n  \n}' and returns '{}'.
   *
   * @param  {string} value  Any string.
   * @return {string}        The original value or cleaned up.
   */
  const squishEmptyObjectStrings = function (value) {
    const squishedValue = value
      .split('\n')
      .map((line) => {
        return line.trim();
      })
      .filter(Boolean)
      .join('')
      .trim();
    if (['{}', '[]'].includes(squishedValue)) {
      return squishedValue;
    }
    return value;
  };

  /**
   * Wraps an object key in quotes if it contains complex characters.
   *
   * @param  {string} key  The value for an object key
   * @return {string}      The original value, or it wrapped in single quotes
   */
  const wrapObjectKeyIfNeeded = function (key) {
    const numbers = '0123456789';
    const weird = '_$°';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = lower.toUpperCase();
    const allAllowed = [
      numbers,
      weird,
      lower,
      upper
    ].join('').split('');

    const hasBadLetters = !!key
      .split('')
      .filter((letter) => {
        return !allAllowed.includes(letter);
      })
      .length;
    const startsWithNumber = numbers.split('').includes(key[0]);

    if (hasBadLetters || startsWithNumber) {
      return '\'' + key + '\'';
    }
    return key;
  };

  const prettyObjectPrint = function (object, indent) {
    let lines = [];

    indent = indent + indentString;
    Object.keys(object).forEach(function (property) {
      let value = pretty(object[property], indent);
      value = squishEmptyObjectStrings(value);
      property = wrapObjectKeyIfNeeded(property);
      lines.push(indent + property + ': ' + value);
    });
    const output = lines.join(newLineJoin) + newLine;
    return output;
  };
  const prettyArray = function (array, indent) {
    let value = [];

    indent = indent + indentString;
    for (let i = 0; i < array.length; i++) {
      value.push(pretty(array[i], indent, indent));
    }

    return value.join(newLineJoin) + newLine;
  };
  const functionSignature = function (element, indent) {
    element = element.toString();
    const lines = element.split(newLine);
    const amountOfSpacesAtStartOfLine = lines[lines.length - 1].search(/\S/);
    const startingIndentation = (new Array(amountOfSpacesAtStartOfLine)).fill(' ').join('');
    element = lines
      .map((line) => {
        if (startingIndentation && line.startsWith(startingIndentation)) {
          return indent + line.replace(startingIndentation, '');
        }
        return line;
      })
      .join(newLine);

    const signatureExpression = new RegExp('function\\s*.*\\s*\\(.*\\)');
    let signature = signatureExpression.exec(element);
    signature = signature ? signature[0] : '[object Function]';

    if (fullFunction) {
      return element;
    }
    return '\'' + signature + '\'';
  };

  const pretty = function (element, indent, fromArray) {
    fromArray = fromArray || '';
    let type = valueType(element);
    let output = '';
    if (visited.indexOf(element) === -1) {
      switch (type) {
        case 'NATIVE_BUILT_IN':
          return fromArray + getNativeBuiltInName(element);

        case 'NATIVE_EVENT':
          return fromArray + handleNativeEvents(element);

        case 'array':
          visited.push(element);
          output = fromArray + '[' + newLine + prettyArray(element, indent) + indent + ']';
          output = squishEmptyObjectStrings(output);
          return output;

        case 'boolean':
          return fromArray + (element ? 'true' : 'false');

        case 'date':
          return fromArray + 'new Date(\'' + element.toISOString() + '\')';

        case 'number':
          return fromArray + element;

        case 'object':
          visited.push(element);
          output = fromArray + '{' + newLine + prettyObjectPrint(element, indent) + indent + '}';
          output = squishEmptyObjectStrings(output);
          return output;

        case 'string':
          return [
            fromArray,
            '\'',
            element
              .replaceAll('\\', '\\\\')
              .replaceAll('\n', '\\n')
              .replaceAll('\'', '\\\'')
              .replaceAll('\\\\\'', '\\\''),
            '\''
          ].join('');

        case 'function':
          return fromArray + functionSignature(element, indent);

        case 'undefined':
          return fromArray + 'undefined';

        case 'null':
          return fromArray + 'null';

        default:
          if (element.toString) {
            return fromArray + '\'' + element.toString() + '\'';
          }
          /* v8 ignore next 4 */
          // Coverage ignored because this is here for future safety, nothing in JS today
          // would hit this line except `undefined`, and that is handled in other places
          // prior to here.
          return fromArray + '<<<ERROR>>> Cannot get the string value of the element';
      }
    }
    return fromArray + 'circular reference to ' + element.toString();
  };

  return pretty(jsObject, '');
};
