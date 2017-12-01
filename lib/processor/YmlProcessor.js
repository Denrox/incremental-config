module.exports = (() => {
  let AbstractFileProcessor = require('./AbstractFileProcessor');
  let fs = require('fs');
  let yaml = require('yamljs');

  class YmlProcessor extends AbstractFileProcessor {

    async handle (configEntry) {
      let validationErrors = await this.validate(configEntry);
      let promise;

      if (validationErrors && validationErrors.length > 0) {
        this.processErrors(configEntry, validationErrors);
      }

      promise = new Promise((resolve) => {
        fs.readFile(configEntry.source.path, configEntry.source.charset || 'utf8', (err, res) => {
          if (!err && res) {
            try {
              resolve(yaml.parse(res));
            } catch (err) {
              this.processErrors(configEntry, ['Unable to parse YML content']);
            }
          } else {
            resolve({});
          }
        });
      });

      return promise;
    }

  }

  return YmlProcessor;
})();
