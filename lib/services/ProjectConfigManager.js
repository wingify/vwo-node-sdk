const Joi = require('@hapi/joi');

const ConfigFileSchema = require('../schemas/ConfigFileSchema');
const CampaignUtils = require('../utils/CampaignUtils');

function ProjectConfigManager(config) {
  this.validateConfigFileAndSdkKey(config);
  this.processConfigFile(config.configFile);
}

ProjectConfigManager.prototype.validateConfigFileAndSdkKey = function(config) {
  if (!config.configFile && !config.sdkKey) {
    this.__configObj = null;
    return;
  }

  this.__configObj = config;
  if (config.sdkKey) {
    let isValidConfigFile = this.validateConfigFile(config.configFile);

    if (!isValidConfigFile) {
      throw new Error('Config file is corrupted!');
    }
  }
};

ProjectConfigManager.prototype.validateConfigFile = function(configFile) {
  let result = Joi.validate(configFile, ConfigFileSchema, {
    allowUnknown: true
  });

  console.log('res', result);
  return result.error === null;
};

ProjectConfigManager.prototype.processConfigFile = function(configFile) {
  for (let i = 0; i < configFile.campaigns.length; i++) {
    let campaign = configFile.campaigns[i];

    this._setVariationBucketing(campaign);
  }

  return configFile;
};

ProjectConfigManager.prototype.getConfigFile = function() {
  return this.__configObj.configFile;
};

ProjectConfigManager.prototype._setVariationBucketing = function(campaign) {
  CampaignUtils.setVariationAllocation(campaign);
};

module.exports = ProjectConfigManager;
