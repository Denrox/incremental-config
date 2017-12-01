module.exports = (() => {
  const JSONProcessor = require('./JSONProcessor');
  const ObjectProcessor = require('./ObjectProcessor');
  const YmlProcessor = require('./YmlProcessor');

  class ProcessorFactory {

    build (entryType) {
      let result = null;

      switch (entryType) {
        case 'json':
          result = new JSONProcessor();
          break;
        case 'yml':
          result = new YmlProcessor();
          break;
        default:
          result = new ObjectProcessor();
          break;
      }

      return result;
    }

  }

  return new ProcessorFactory();
})();
