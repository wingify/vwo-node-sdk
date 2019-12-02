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
    if (!SettingsFileManager.isSettingsFileValid(config)) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.INVALID_CONFIGURATION, {
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

    // Setup event quque for sending impressions to VWO server
    this.eventQueue = new EventQueue();
    this.SettingsFileManager = SettingsFileManager;

    // Process settingsFile for various things. For eg: assign bucket range to variation, etc.
    this.SettingsFileManager.processsettingsFile(config);

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
   * 1. Validates the arguments being passed
   * 2. Checks if user is eligible to get bucketed into the campaign,
   * 3. Assigns the determinitic variation to the user(based on userId), if user becomes part of campaign
   *    If userStorageService is used, it will look into it for the variation and if found, no further processing is done
   * 4. Sends an impression call to VWO server to track user
   *
   * @param {String} campaignKey       unique campaign key specified in VWO app
   * @param {String} userId            ID assigned to a user
   *
   * @return {String|null}             If variation is assigned then variation-name otherwise null in case of user not becoming part
   */
  activate(campaignKey, userId) {
    try {
      let self = this;

      return api.activate(self, campaignKey, userId);
    } catch (err) {
      this.logger.log(LogLevelEnum.ERROR, err.message);
      return null;
    }
  }

  /**
   * This API method: Gets the variation assigned for the user for the campaign
   *
   * 1. Validates the arguments being passed
   * 2. Checks if user is eligible to get bucketed into the campaign,
   * 3. Assigns the determinitic variation to the user(based on userId), if user becomes part of campaign
   *    If userStorageService is used, it will look into it for the variation and if found, no further processing is done
   *
   * @param {String} campaignKey       unique campaign key specified in VWO app
   * @param {String} userId            ID assigned to a user
   *
   * @return {String|null}             If variation is assigned then variation-name otherwise null in case of user not becoming part
   */
  getVariationName(campaignKey, userId) {
    try {
      let self = this;

      return api.getVariationName(self, campaignKey, userId);
    } catch (err) {
      this.logger.log(LogLevelEnum.ERROR, err.message);
      return null;
    }
  }

  /**
   * This API method: Marks the conversion of the campaign for a particular goal
   *
   * 1. validates the arguments being passed
   * 2. Checks if user is eligible to get bucketed into the campaign,
   * 3. Gets the assigned determinitic variation to the user(based on userId), if user becomes part of campaign
   * 4. Sends an impression call to VWO server to track goal data
   *
   * @param {Number} campaignKey           unique campaign test key
   * @param {String} userId                    ID assigned to a user
   * @param {String} goalIdentifier             unique campaign's goal identifier
   * @param {Number|Float|String} revenueValue revenue generated on activateing the goal
   */
  track(campaignKey, userId, goalIdentifier, revenueValue) {
    try {
      let self = this;

      return api.track(self, campaignKey, userId, goalIdentifier, revenueValue);
    } catch (err) {
      this.logger.log(LogLevelEnum.ERROR, err.message);
      return false;
    }
  }

  /**
   * This API method checks: Whether a feature is enabled or not for the given user
   *
   * 1. Validates the arguments being passed
   * 2. Checks if user is eligible for campaign and check if feature is enabled for the user.
   * 4. If feature enabled, sends a call to VWO server for tracking visitor
   *
   * @param {String} campaignKey       Unique key for a campaign
   * @param {String} userId            Unique identifier for the user
   *
   * @return {Boolean}                 true if feature enabled, false otherwise
   */
  isFeatureEnabled(campaignKey, userId) {
    try {
      let self = this;

      return api.isFeatureEnabled(self, campaignKey, userId);
    } catch (err) {
      this.logger.log(LogLevelEnum.ERROR, err.message);
      return false;
    }
  }

  /**
   * This API method:
   * 1. Validates the arguments being passed
   * 2. Checks if user is eligible for campaign and check if feature is enabled for the user.
   * 4. If feature enabled, return the variable for that variation(if Feature Test),
   *    otherwise the default values being set in Feature
   *
   * @param {String} campaignKey   Unique key for a campaign
   * @param {String} variableKey   Unique key for a feature's variable
   * @param {String} userId        Unique identifier for the user
   *
   * @return {string|number|double|boolean|null} Variable value as is set in the VWO app i.e.
   *                                             maintaining the data-type,
   *                                             null if anything fails like campaign / variable not found
   */
  getFeatureVariableValue(campaignKey, variableKey, userId) {
    try {
      let self = this;

      return api.getFeatureVariableValue(self, campaignKey, variableKey, userId);
    } catch (err) {
      this.logger.log(LogLevelEnum.ERROR, err.message);
      return null;
    }
  }
}
module.exports = VWO;
