module.exports = (() => {
  let AbstractFileProcessor = require('./AbstractFileProcessor');
  let fs = require('fs');

  class JSONProcessor extends AbstractFileProcessor {

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
              resolve(JSON.parse(res));
            } catch (err) {
              this.processErrors(configEntry, ['Unable to parse JSON content']);
            }
          } else {
            resolve({});
          }
        });
      });

      return promise;
    }

  }

  return JSONProcessor;
})();
