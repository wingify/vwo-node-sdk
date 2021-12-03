/**
 * Copyright 2019-2021 Wingify Software Pvt. Ltd.
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

const EventQueue = require('./services/EventQueue');
const SettingsFileService = require('./services/SettingsFileManager');
const FunctionUtil = require('./utils/FunctionUtil');

let BatchEventsDispatcher;
let customEventUtil;
let BatchEventsQueue;

if (typeof process.env !== 'undefined') {
  BatchEventsQueue = require('./services/BatchEventsQueue');
  BatchEventsDispatcher = require('./utils/BatchEventsDispatcher').dispatch;
  customEventUtil = require('./utils/CustomEventUtil');
}

const DataTypeUtil = require('./utils/DataTypeUtil');
const logging = require('./services/logging');
const FileNameEnum = require('./enums/FileNameEnum');
const HooksManager = require('./services/HooksManager');
const UsageStats = require('./services/UsageStats');
const ApiEnum = require('./enums/ApiEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;

const file = FileNameEnum.VWO;

class VWO {
  // Setting various services on the instance to be accessible by its member functions
  constructor(config = {}) {
    this.getVariation = this.getVariationName; // to be backward compatible
    this.userStorageService = config.userStorageService;
    this.logger = config.logger;
    this.returnPromiseFor = config.returnPromiseFor;

    // Initialize Hooks manager so that callbacks can be invoked
    HooksManager.init(config);
    let settingsFileManager = new SettingsFileService(config);

    // Validate the config file i.e. check if required fields contain appropriate data
    if (!settingsFileManager.isSettingsFileValid()) {
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

    settingsFileManager.checkAndPoll(); // Checks if pollingInterval is passed then starts polling settingsFile

    // Setup event quque for sending impressions to VWO server
    this.eventQueue = new EventQueue();
    this.SettingsFileManager = settingsFileManager;

    this.usageStats = new UsageStats();
    if (!settingsFileManager.getConfig().isDevelopmentMode) {
      this.usageStats.collectUsageStats(settingsFileManager.getConfig());
    }

    if (typeof process.env !== 'undefined') {
      if (config.batchEvents) {
        const accountId = settingsFileManager.getSettingsFile().accountId;
        const sdkKey = settingsFileManager.getSettingsFile().sdkKey;

        this.batchEventsQueue = new BatchEventsQueue(
          Object.assign({}, config.batchEvents, {
            accountId,
            dispatcher: (events, callback) =>
              BatchEventsDispatcher(
                {
                  ev: events
                },
                callback,
                Object.assign(
                  {},
                  {
                    a: accountId
                  },
                  this.usageStats.getUsageStats()
                ),
                sdkKey
              )
          })
        );

        this.batchEventsQueue.flushAndClearTimer.bind(this.batchEventsQueue);
      }
    }

    // Process settingsFile for various things. For eg: assign bucket range to variation, etc.
    this.SettingsFileManager.processSettingsFile();

    this.logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SDK_INITIALIZED, {
        file
      })
    );
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
  activate(campaignKey, userId, options = {}) {
    try {
      let self = this;

      // Check if returnPromiseFor is provided. If yes, return a promise instead of value
      // i.e. wait till the network call is not successful
      if (self.returnPromiseFor && (self.returnPromiseFor.activate || self.returnPromiseFor.all)) {
        return new Promise(resolve => {
          let variationName;
          options.responseCallback = (_error, _response) => {
            resolve(variationName);
          };
          variationName = api.activate(self, campaignKey, userId, options);

          // If we get null from the API i.e. no tracking call was sent
          // In this case, respponseCallback will not be fired and hence we have to manually resolve the promise
          if (!variationName) {
            resolve(variationName);
          } else if (DataTypeUtil.isObject(variationName)) {
            resolve(variationName.variationName);
          }
        });
      }

      const apiResponse = api.activate(self, campaignKey, userId, options);

      if (DataTypeUtil.isObject(apiResponse)) {
        return apiResponse.variationName;
      }

      return apiResponse;
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
  getVariationName(campaignKey, userId, options = {}) {
    try {
      let self = this;

      // Check if returnPromiseFor is provided. If yes, return a promise instead of value
      if (self.returnPromiseFor && (self.returnPromiseFor.getVariationName || self.returnPromiseFor.all)) {
        return new Promise(resolve => {
          // since this API does not send any async call, we can simply resolve the returned value
          resolve(api.getVariation(self, campaignKey, userId, options));
        });
      }

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
  track(campaignSpecifier, userId, goalIdentifier, options = {}) {
    try {
      let self = this;

      // Check if returnPromiseFor is provided. If yes, return a promise instead of value
      // i.e. wait till the network call is not successful
      if (self.returnPromiseFor && (self.returnPromiseFor.track || self.returnPromiseFor.all)) {
        return new Promise(resolve => {
          let trackResponse;
          let counter = 0;
          options.responseCallback = (_error, _response) => {
            counter += 1;
            // In case of global goals, when all campaigns are tracked, then only resolve
            if (counter === FunctionUtil.objectValues(trackResponse).filter(Boolean).length) {
              resolve(trackResponse);
            }
          };
          trackResponse = api.track(self, campaignSpecifier, userId, goalIdentifier, options);
          // If we get null/false from the API i.e. no tracking call was sent
          // In this case, respponseCallback will not be fired and hence we have to manually resolve the promise
          // Or, in case of global goals, if none campaign got success, manually resolve
          if (!trackResponse || !FunctionUtil.objectValues(trackResponse).some(Boolean)) {
            resolve(trackResponse);
          }
        });
      }

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
  isFeatureEnabled(campaignKey, userId, options = {}) {
    try {
      let self = this;

      // Check if returnPromiseFor is provided. If yes, return a promise instead of value
      // i.e. wait till the network call is not successful
      if (self.returnPromiseFor && (self.returnPromiseFor.isFeatureEnabled || self.returnPromiseFor.all)) {
        return new Promise(resolve => {
          let isFeatureEnabledApiResponse;
          options.responseCallback = (_error, _response) => {
            resolve(!!isFeatureEnabledApiResponse);
          };
          isFeatureEnabledApiResponse = api.isFeatureEnabled(self, campaignKey, userId, options);
          // If we get null from the API i.e. no tracking call was sent
          // In this case, respponseCallback will not be fired and hence we have to manually resolve the promise
          if (DataTypeUtil.isNull(isFeatureEnabledApiResponse)) {
            resolve(false);
          } else if (DataTypeUtil.isObject(isFeatureEnabledApiResponse)) {
            resolve(!!isFeatureEnabledApiResponse.isFeatureEnabled);
          }
        });
      }

      const apiResponse = api.isFeatureEnabled(self, campaignKey, userId, options);

      if (DataTypeUtil.isObject(apiResponse)) {
        return !!apiResponse.isFeatureEnabled;
      }

      return !!apiResponse;
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
  getFeatureVariableValue(campaignKey, variableKey, userId, options = {}) {
    try {
      let self = this;

      // Check if returnPromiseFor is provided. If yes, return a promise instead of value
      if (self.returnPromiseFor && (self.returnPromiseFor.getFeatureVariableValue || self.returnPromiseFor.all)) {
        return new Promise(resolve => {
          // since this API does not send any async call, we can simply resolve the returned value
          resolve(api.getFeatureVariableValue(self, campaignKey, variableKey, userId, options));
        });
      }

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
      let customDimensionMap;

      if (arguments.length === 2) {
        // Argument reshuffling.
        customDimensionMap = tagKey;
        userId = tagValue;

        tagKey = ' ';
        tagValue = ' ';
      } else if (arguments.length === 3) {
        customDimensionMap = {};
      } else {
        this.logger.log(
          LogLevelEnum.ERROR,
          LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.PUSH_INVALID_PARAMS, {
            file,
            method: ApiEnum.PUSH
          })
        );
        return false;
      }

      // Check if returnPromiseFor is provided. If yes, return a promise instead of value
      // i.e. wait till the network call is not successful
      if (self.returnPromiseFor && (self.returnPromiseFor.push || self.returnPromiseFor.all)) {
        return new Promise(resolve => {
          let apiResponse;
          let counter = 0;

          const options = {
            responseCallback: (_error, _response) => {
              counter += 1;
              // In case of multiple custom dimensions, when all are tracked, then only resolve
              if (counter === FunctionUtil.objectValues(apiResponse).filter(Boolean).length) {
                resolve(apiResponse);
              }
            }
          };
          apiResponse = api.push(self, tagKey, tagValue, userId, customDimensionMap, options);
          // If we get false from the API i.e. no tracking call was sent
          // In this case, respponseCallback will not be fired and hence we have to manually resolve the promise
          if (!apiResponse) {
            resolve(false);
          }
        });
      }

      return api.push(self, tagKey, tagValue, userId, customDimensionMap);
    } catch (err) {
      this.logger.log(LogLevelEnum.ERROR, err.message);
      return false;
    }
  }
  /**
   * Manually flush impression events to VWO which are queued in batch queue as per batchEvents config
   */
  flushEvents() {
    if (typeof process.env !== 'undefined') {
      return new Promise((resolve, _reject) => {
        const accountId = this.SettingsFileManager.getSettingsFile().accountId;

        if (this.batchEventsQueue) {
          customEventUtil.getInstance().once('batchCallCompleteion', (status, message) => {
            if (status) {
              resolve({
                status: true,
                message: message || 'Batch call sent to VWO'
              });
            } else {
              resolve({
                status: false,
                message: message || 'Batch call could not be processed'
              });
            }
          });

          this.batchEventsQueue.flushAndClearTimer();

          return;
        }

        this.logger.log(
          LogLevelEnum.ERROR,
          LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.NO_BATCH_QUEUE, {
            file,
            accountId
          })
        );

        resolve({
          status: false,
          message: 'No batchEvents config present in launch API'
        });
      });
    }
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
  getAndUpdateSettingsFile(accountId, sdkKey) {
    return this.SettingsFileManager.getAndUpdateSettingsFile(accountId, sdkKey);
  }
}

module.exports = VWO;
