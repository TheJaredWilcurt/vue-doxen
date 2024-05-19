const jestSerializerVueTJW = require('jest-serializer-vue-tjw');

const isHtmlString = function (received) {
  return (
    typeof(received) === 'string' &&
    (
      received.startsWith('<') ||
      received.startsWith('"<')
    )
  );
};
const isVueWrapper = function (received) {
  return (
    typeof(received) === 'object' &&
    typeof(received.html) === 'function'
  );
};

module.exports = {
  test: function (received) {
    return isHtmlString(received) || isVueWrapper(received);
  },
  print: function (received) {
    return jestSerializerVueTJW.print(received);
  }
};
