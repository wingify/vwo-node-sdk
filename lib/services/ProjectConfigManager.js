const Joi = require('@hapi/joi');

const ConfigFileSchema = require('../schemas/ConfigFileSchema');
const CampaignUtil = require('../utils/CampaignUtil');

const logging = require('../logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;

class ProjectConfigManager {
  // PRIVATE METHODS

  _setVariationBucketing(campaign) {
    CampaignUtil.setVariationAllocation(campaign);
  }

  // PUBLIC METHODS

  isValidConfigFileAndSdkKey(config) {
    if (!config.configFile || !config.sdkKey) {
      this.__configObj = null;
      return false;
    }

    this.__configObj = config;
    if (config.sdkKey) {
      let isValidConfigFile = this.validateConfigFile(config.configFile);

      if (!isValidConfigFile) {
        config.logger.log(
          LogLevelEnum.ERROR,
          LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.SETTINGS_FILE_CORRUPTED, {
            file: FileNameEnum.ProjectConfigManager
          })
        );

        return false;
      }
    }

    return true;
  }

  validateConfigFile(configFile) {
    let result = Joi.validate(configFile, ConfigFileSchema, {
      allowUnknown: true
    });

    return result.error === null;
  }

  processConfigFile(config) {
    let configFile = config.configFile;

    for (let i = 0; i < configFile.campaigns.length; i++) {
      let campaign = configFile.campaigns[i];

      this._setVariationBucketing(campaign);
    }

    config.logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SETTINGS_FILE_PROCESSED, {
        file: FileNameEnum.ProjectConfigManager
      })
    );

    return configFile;
  }

  getConfig() {
    return this.__configObj;
  }

  getConfigFile() {
    return this.__configObj.configFile;
  }
}
module.exports = ProjectConfigManager;
