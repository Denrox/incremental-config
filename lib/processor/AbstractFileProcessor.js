module.exports = (() => {
  let AbstractProcessor = require('./AbstractProcessor');
  let fs = require('fs');

  class AbstractFileProcessor extends AbstractProcessor {

    async validate (configEntry) {
      let errors = [];
      let promise;

      promise = new Promise((resolve) => {
        if (!configEntry.source ||
            !configEntry.source.path ||
            typeof configEntry.source.path !== 'string') {
          errors.push(
            'Source field should be a valid file path'
          );

          resolve(errors);
        } else {
          fs.access(configEntry.source.path, fs.R_OK, (err) => {
            if (err) {
              errors.push(
                'Source field does not point to readable file'
              );
            }

            resolve(errors);
          });
        }
      });

      return promise;
    }

  }

  return AbstractFileProcessor;
})();
