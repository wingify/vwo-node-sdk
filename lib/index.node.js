const VWO = require('./VWO');

module.exports = {
  /**
   * Initializes the Api and parses the datafile
   * Validates the Api Key
   *
   * @param {String} apiKey the API Key obtained in the console
   * @param {String} configFilePath the file path to JSON Config file
   */
  createInstance: function (config) {
    // validate config params here

    return new VWO(config);
  }
};
