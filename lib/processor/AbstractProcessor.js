module.exports = (() => {
  class AbstractProcessor {

    processErrors (configEntry, validationErrors) {
      throw new Error('Error while processing config files: ' +
        'configEntry: ' + JSON.stringify(configEntry) +
        ', got errors: ' + JSON.stringify(validationErrors)
      );
    }

  }

  return AbstractProcessor;
})();
