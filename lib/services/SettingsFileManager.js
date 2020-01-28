/**
 * Copyright 2019 Wingify Software Pvt. Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const settingsFileSchema = require('../schemas/SettingsFileSchema');
const CampaignUtil = require('../utils/CampaignUtil');

const logging = require('./logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;

class SettingsFileManager {
  // PRIVATE METHODS

  constructor(config) {
    if (config && config.settingsFile) {
      if (!config.settingsFile.campaigns) {
        config.settingsFile.campaigns = [];
      }
    }

    this.__configObj = config;
  }

  _setVariationBucketing(campaign) {
    CampaignUtil.setVariationAllocation(campaign);
  }

  // PUBLIC METHODS

  isSettingsFileValid(config) {
    if (!config || !config.settingsFile) {
      this.__configObj = null;
      return false;
    }

    this.__configObj = config;

    let isValidsettingsFile = settingsFileSchema.test(config.settingsFile);

    if (!isValidsettingsFile) {
      config.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.SETTINGS_FILE_CORRUPTED, {
          file: FileNameEnum.SettingsFileManager
        })
      );

      return false;
    }

    return true;
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
        file: FileNameEnum.SettingsFileManager
      })
    );

    return settingsFile;
  }

  getConfig() {
    return this.__configObj;
  }

  getSettingsFile() {
    return this.__configObj.settingsFile;
  }
}
module.exports = SettingsFileManager;
