/**
 * Copyright 2019-2020 Wingify Software Pvt. Ltd.
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

const api = require('./api');

const CachingUtil = require('./utils/CachingUtil');

const EventQueue = require('./services/EventQueue');
const SettingsFileService = require('./services/SettingsFileManager');

const logging = require('./services/logging');
const FileNameEnum = require('./enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;

const file = FileNameEnum.VWO;

class VWO {
  // Setting various services on the instance to be accessible by its member functions
  constructor(config = {}) {
    this.getVariation = this.getVariationName; // to be backward compatible
    this.userStorageService = config.userStorageService;
    this.logger = config.logger;

    let SettingsFileManager = new SettingsFileService(config);

    // Validate the config file i.e. check if required fields contain appropriate data
    if (!SettingsFileManager.isSettingsFileValid()) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.INVALID_SETTINGS_FILE, {
          file
        })
      );

      return;
    }

    this.logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.VALID_CONFIGURATION, {
        file
      })
    );

    SettingsFileManager.checkAndPoll(); // Checks if pollingInterval is passed then starts polling settingsFile

    // Setup event quque for sending impressions to VWO server
    this.eventQueue = new EventQueue();
    this.SettingsFileManager = SettingsFileManager;

    // Process settingsFile for various things. For eg: assign bucket range to variation, etc.
    this.SettingsFileManager.processSettingsFile();

    this.logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SDK_INITIALIZED, {
        file
      })
    );

    // Reset any cached values on re-initializing the SDK
    CachingUtil.resetCache();
  }

  // PUBLIC METHODS
  /**
   * This API method: Gets the variation assigned for the user for the campaign and send the metrics to VWO server
   *
   * @param {String} campaignKey       unique campaign key specified in VWO app
   * @param {String} userId            ID assigned to a user
   * @param {Object} options           optional params - customVariables, variationTargetingVariables
   *
   * @return {String|null}             If variation is assigned then variation-name otherwise null in case of user not becoming part
   */
  activate(campaignKey, userId, options) {
    try {
      let self = this;

      return api.activate(self, campaignKey, userId, options);
    } catch (err) {
      this.logger.log(LogLevelEnum.ERROR, err.message);
      return null;
    }
  }

  /**
   * This API method: Gets the variation assigned for the user for the campaign
   *
   * @param {String} campaignKey       unique campaign key specified in VWO app
   * @param {String} userId            ID assigned to a user
   * @param {Object} options           optional params - customVariables, variationTargetingVariables
   *
   * @return {String|null}             If variation is assigned then variation-name otherwise null in case of user not becoming part
   */
  getVariationName(campaignKey, userId, options) {
    try {
      let self = this;

      return api.getVariation(self, campaignKey, userId, options);
    } catch (err) {
      this.logger.log(LogLevelEnum.ERROR, err.message);
      return null;
    }
  }

  /**
   * This API method: Marks the conversion of the campaign for a particular goal
   *
   * @param {String/Array<string>/null/undefined} campaignSpecifier campaign keys to track           unique campaignSpecifier
   * @param {String} userId                ID assigned to a user
   * @param {String} goalIdentifier         unique campaign's goal identifier
   * @param {Object} options               optional params - customVariables, variationTargetingVariables, revenueValue
   */
  track(campaignSpecifier, userId, goalIdentifier, options) {
    try {
      let self = this;

      return api.track(self, campaignSpecifier, userId, goalIdentifier, options);
    } catch (err) {
      this.logger.log(LogLevelEnum.ERROR, err.message);
      return null;
    }
  }

  /**
   * This API method checks: Whether a feature is enabled or not for the given user
   *
   * @param {String} campaignKey       Unique key for a campaign
   * @param {String} userId            Unique identifier for the user
   * @param {Object} options           optional params - customVariables, variationTargetingVariables
   *
   * @return {Boolean}                 true if feature enabled, false otherwise
   */
  isFeatureEnabled(campaignKey, userId, options) {
    try {
      let self = this;

      return api.isFeatureEnabled(self, campaignKey, userId, options);
    } catch (err) {
      this.logger.log(LogLevelEnum.ERROR, err.message);
      return false;
    }
  }

  /**
   * This API method: Return the variable for that variation(if Feature Test),
   *    otherwise the default values being set in Feature
   *
   * @param {String} campaignKey   Unique key for a campaign
   * @param {String} variableKey   Unique key for a feature's variable
   * @param {String} userId        Unique identifier for the user
   * @param {Object} options           optional params - customVariables, variationTargetingVariables
   *
   * @return {string|number|double|boolean|null} Variable value as is set in the VWO app i.e.
   *                                             maintaining the data-type,
   *                                             null if anything fails like campaign / variable not found
   */
  getFeatureVariableValue(campaignKey, variableKey, userId, options) {
    try {
      let self = this;

      return api.getFeatureVariableValue(self, campaignKey, variableKey, userId, options);
    } catch (err) {
      this.logger.log(LogLevelEnum.ERROR, err.message);
      return null;
    }
  }

  /**
   * This API method: Pushes the key-value tag pair for a particular user
   *
   * @param {String} tagKey                    tag key
   * @param {String} tagValue                  tag Value
   * @param {String} userId                    ID assigned to a user
   *
   * @return {Boolean}                    true if request is pushed to eventQueue, false if params are invalid or settings file is unavailable
   */
  push(tagKey, tagValue, userId) {
    try {
      let self = this;

      return api.push(self, tagKey, tagValue, userId);
    } catch (err) {
      this.logger.log(LogLevelEnum.ERROR, err.message);
      return false;
    }
  }
}
module.exports = VWO;
