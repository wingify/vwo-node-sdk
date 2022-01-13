/**
 * Copyright 2019-2022 Wingify Software Pvt. Ltd.
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

const CampaignUtil = require('../utils/CampaignUtil');
const FunctionUtil = require('../utils/FunctionUtil');
const SettingsFileUtil = require('../utils/SettingsFileUtil');

const logging = require('./logging');
const FileNameEnum = require('../enums/FileNameEnum');
const validateSettingsFile = require('../schemas/SettingsFileSchema');
const { isObject } = require('../utils/DataTypeUtil');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;

const file = FileNameEnum.SettingsFileManager;

class SettingsFileManager {
  // PRIVATE METHODS

  constructor(config) {
    if (config) {
      if (
        (config.settingsFile && isObject(config.settingsFile.campaigns)) ||
        (config.settingsFile && !config.settingsFile.campaigns)
      ) {
        config.settingsFile.campaigns = [];
      }

      this._configObj = config;
      this._clonedSettingsFile = config.settingsFile ? FunctionUtil.cloneObject(config.settingsFile) : null;
    } else {
      this._configObj = null;
      this._clonedSettingsFile = null;
    }
  }

  _setVariationBucketing(campaign) {
    CampaignUtil.setVariationAllocation(campaign);
  }

  // PUBLIC METHODS

  isSettingsFileValid() {
    if (!this._configObj || !this._clonedSettingsFile) {
      return false;
    }
    let isValidSettingsFile = validateSettingsFile(this._clonedSettingsFile);

    if (!isValidSettingsFile) {
      this._configObj.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.SETTINGS_FILE_CORRUPTED, {
          file
        })
      );

      return false;
    }

    return true;
  }

  checkAndPoll() {
    if (!this._configObj.pollingInterval || !this._configObj.sdkKey) {
      return;
    }

    let lastSettingsFile = JSON.stringify(this._clonedSettingsFile);
    setInterval(() => {
      SettingsFileUtil.get(this._clonedSettingsFile.accountId, this._configObj.sdkKey)
        .then(latestSettingsFile => {
          this._configObj.logger.log(
            LogLevelEnum.INFO,
            LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.POLLING_SUCCESS, {
              file,
              accountId: this._clonedSettingsFile.accountId
            })
          );
          const stringifiedLatestSettingsFile = JSON.stringify(latestSettingsFile);

          if (stringifiedLatestSettingsFile !== lastSettingsFile) {
            lastSettingsFile = stringifiedLatestSettingsFile;

            this.updateSettingsFile(latestSettingsFile);

            this._configObj.logger.log(
              LogLevelEnum.INFO,
              LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.POLLING_SETTINGS_FILE_UPDATED, {
                file,
                accountId: this._clonedSettingsFile.accountId
              })
            );
          } else {
            this._configObj.logger.log(
              LogLevelEnum.INFO,
              LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.POLLING_SETTINGS_FILE_NOT_UPDATED, {
                file,
                accountId: this._clonedSettingsFile.accountId
              })
            );
          }
        })
        .catch(_e => {
          this._configObj.logger.log(
            LogLevelEnum.ERROR,
            LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.POLLING_FAILED, {
              file,
              accountId: this._clonedSettingsFile.accountId
            })
          );
        });
    }, this._configObj.pollingInterval);

    this._configObj.logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.POLLING_SETTINGS_FILE_REGISTERED, {
        file,
        pollingInterval: this._configObj.pollingInterval
      })
    );
  }
  processSettingsFile() {
    let settingsFile = this._clonedSettingsFile;

    for (let i = 0; i < settingsFile.campaigns.length; i++) {
      let campaign = settingsFile.campaigns[i];

      this._setVariationBucketing(campaign);
    }

    this._configObj.logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SETTINGS_FILE_PROCESSED, {
        file,
        accountId: this._clonedSettingsFile.accountId
      })
    );

    return settingsFile;
  }

  /**
   * Fetch latest settings-file and update so that vwoClientInstance could use latest settings
   * Helpful especially when using webhooks
   *
   * @param {Number} accountId
   * @param {String} sdkKey
   *
   * @return {Promise}
   */
  getAndUpdateSettingsFile(accountId = this._clonedSettingsFile.accountId, sdkKey = this._clonedSettingsFile.sdkKey) {
    return new Promise((resolve, _reject) => {
      SettingsFileUtil.get(accountId, sdkKey, null, { isViaWebhook: true })
        .then(settings => {
          this.updateSettingsFile(settings);
          resolve(settings);
        })
        .catch(_err => {});
    });
  }

  /**
   * Update the settings-file on the instance so that latest settings could be used from next hit onwards
   * @param {Object} settings
   */
  updateSettingsFile(settings) {
    this._clonedSettingsFile = FunctionUtil.cloneObject(settings);
    this.processSettingsFile();
  }

  getConfig() {
    return this._configObj;
  }

  getSettingsFile(api) {
    if (!this._clonedSettingsFile) {
      this._configObj.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.API_HAS_CORRUPTED_SETTINGS_FILE, {
          file,
          api
        })
      );
    }
    return this._clonedSettingsFile;
  }
}
module.exports = SettingsFileManager;
