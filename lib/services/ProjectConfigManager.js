const Joi = require('@hapi/joi');

const settingsFileSchema = require('../schemas/settingsFileSchema');
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

  isValidsettingsFileAndSdkKey(config) {
    if (!config.settingsFile || !config.sdkKey) {
      this.__configObj = null;
      return false;
    }

    this.__configObj = config;
    if (config.sdkKey) {
      let isValidsettingsFile = this.validatesettingsFile(config.settingsFile);

      if (!isValidsettingsFile) {
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

  validatesettingsFile(settingsFile) {
    let result = Joi.validate(settingsFile, settingsFileSchema, {
      allowUnknown: true
    });

    return result.error === null;
  }

  processsettingsFile(config) {
    let settingsFile = config.settingsFile;

    for (let i = 0; i < settingsFile.campaigns.length; i++) {
      let campaign = settingsFile.campaigns[i];

      this._setVariationBucketing(campaign);
    }

    config.logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SETTINGS_FILE_PROCESSED, {
        file: FileNameEnum.ProjectConfigManager
      })
    );

    return settingsFile;
  }

  getConfig() {
    return this.__configObj;
  }

  getsettingsFile() {
    return this.__configObj.settingsFile;
  }
}
module.exports = ProjectConfigManager;
