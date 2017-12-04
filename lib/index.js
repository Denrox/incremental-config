module.exports = (() => {
  const processorFactory = require('./processor/processorFactory');

  async function decorateConfig (configToDecorate, configEntry) {
    let result = {};
    let entryHandler = processorFactory.build(configEntry.type);
    let dataToDecorate;

    Object.keys(configToDecorate).forEach((key) => {
      result[key] = configToDecorate[key];
    });

    dataToDecorate = await entryHandler.handle(configEntry);
    if (dataToDecorate) {
      Object.keys(dataToDecorate).forEach((key) => {
        result[key] = dataToDecorate[key];
      });
    }

    return result;
  }

  return async function (configStructure) {
    let config = {};
    let i;

    if (!configStructure ||
        (!Array.isArray(configStructure) &&
        typeof configStructure !== 'object')) {
      throw new Error('Wrong config format specified');
    }

    if (!Array.isArray(configStructure)) {
      config = await decorateConfig(config, configStructure);
    } else {
      for (i = 0; i < configStructure.length; i++) {
        config = await decorateConfig(config, configStructure[i]);
      }
    }

    return config;
  };
})();
