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
  if (!jsObject) {
    throw 'Error: no Javascript object provided';
  }
  if (indentation === undefined) {
    indentation = 2;
  }
  if (fullFunction !== false) {
    fullFunction = true;
  }

  const repeatString = function (source, length) {
    let destination = '';

    for (let index = 0; index < length; index++) {
      destination += source;
    }

    return destination;
  };

  let indentString = repeatString(' ', indentation);
  let newLine = '\n';
  let newLineJoin = ',' + newLine;
  let TOSTRING = Object.prototype.toString;
  // As we loop over things, keep track of what we've seen to avoid circular references
  let visited = [];

  const nativeBuiltInMapper = function (value) {
    /**
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
     * Note: Not all global objects listed there can be combined when an empty string to
     * produce a native function string, needed in the following condition.
     */
    const nativeConstructors = [
      AggregateError,
      Array,
      ArrayBuffer,
      BigInt,
      BigInt64Array,
      BigUint64Array,
      Boolean,
      DataView,
      Date,
      Error,
      EvalError,
      FinalizationRegistry,
      Float32Array,
      Float64Array,
      Function,
      Int8Array,
      Int16Array,
      Int32Array,
      Intl.Collator,
      Intl.DateTimeFormat,
      Intl.DisplayNames,
      Intl.ListFormat,
      Intl.Locale,
      Intl.NumberFormat,
      Intl.PluralRules,
      Intl.RelativeTimeFormat,
      Intl.Segmenter,
      Map,
      Number,
      Object,
      Promise,
      Proxy,
      RangeError,
      ReferenceError,
      RegExp,
      Set,
      String,
      Symbol,
      SyntaxError,
      TypeError,
      Uint8Array,
      Uint8ClampedArray,
      Uint16Array,
      Uint32Array,
      URIError,
      WeakMap,
      WeakRef,
      WeakSet
    ];

    // These two have issues in Firefox:
    if (globalThis.Iterator) {
      nativeConstructors.push(Iterator);
    }
    if (globalThis.SharedArrayBuffer) {
      nativeConstructors.push(SharedArrayBuffer);
    }

    if (nativeConstructors.includes(value)) {
      // Number => 'function Number() { [native code] }' => 'Number'
      return (value + '').split(' ')[1].split('(')[0];
    }
    return;
  };
  const valueType = function (object) {
    if (nativeBuiltInMapper(object)) {
      return 'NATIVE_BUILT_IN';
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

  const prettyObjectPrint = function (object, indent) {
    let value = [];

    indent += indentString;
    Object.keys(object).forEach(function (property) {
      value.push(indent + property + ': ' + pretty(object[property], indent));
    });
    return value.join(newLineJoin) + newLine;
  };
  const prettyArray = function (array, indent) {
    let value = [];

    indent += indentString;
    for (let index = 0; index < array.length; index += 1) {
      value.push(pretty(array[index], indent, indent));
    }

    return value.join(newLineJoin) + newLine;
  };
  const functionSignature = function (element, indent) {
    element = element.toString();
    const lines = element.split('\n');
    const amountOfSpacesAtStartOfLine = lines[lines.length - 1].search(/\S/);
    const startingIndentation = (new Array(amountOfSpacesAtStartOfLine)).fill(' ').join('');
    element = lines
      .map((line) => {
        if (line.startsWith(startingIndentation)) {
          return indent + line.replace(startingIndentation, '');
        }
        return line;
      })
      .join('\n');

    const signatureExpression = new RegExp('function\\s*.*\\s*\\(.*\\)');
    let signature = signatureExpression.exec(element);
    signature = signature ? signature[0] : '[object Function]';

    if (fullFunction) {
      return element;
    }
    return '\'' + signature + '\'';
  };

  const pretty = function (element, indent, fromArray) {
    let type = valueType(element);
    fromArray = fromArray || '';
    if (visited.indexOf(element) === -1) {
      switch (type) {
        case 'NATIVE_BUILT_IN':
          return fromArray + nativeBuiltInMapper(element);

        case 'array':
          visited.push(element);
          return fromArray + '[' + newLine + prettyArray(element, indent) + indent + ']';

        case 'boolean':
          return fromArray + (element ? 'true' : 'false');

        case 'date':
          return fromArray + 'new Date(\'' + element.toISOString() + '\')';

        case 'number':
          return fromArray + element;

        case 'object':
          visited.push(element);
          return fromArray + '{' + newLine + prettyObjectPrint(element, indent) + indent + '}';

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
          return fromArray + '<<<ERROR>>> Cannot get the string value of the element';
      }
    }
    return fromArray + 'circular reference to ' + element.toString();
  };

  return pretty(jsObject, '');
};
