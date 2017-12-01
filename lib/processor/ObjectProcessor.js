module.exports = (() => {
  let AbstractProcessor = require('./AbstractProcessor');

  class ObjectProcessor extends AbstractProcessor {

    async validate (configEntry) {
      let errors = [];

      if (!configEntry.source || typeof configEntry.source !== 'object') {
        errors.push(
          'Source field should be an object'
        );
      }

      return errors;
    }

    async handle (configEntry) {
      let validationErrors = await this.validate(configEntry);

      if (validationErrors && validationErrors.length > 0) {
        this.processErrors(configEntry, validationErrors);
      }

      return configEntry.source;
    }

  }

  return ObjectProcessor;
})();
