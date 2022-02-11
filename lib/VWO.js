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

const api = require('./api');

const FileNameEnum = require('./enums/FileNameEnum');
const ApiEnum = require('./enums/ApiEnum');

const DataTypeUtil = require('./utils/DataTypeUtil');
const FunctionUtil = require('./utils/FunctionUtil');

const EventQueue = require('./services/EventQueue');
const SettingsFileService = require('./services/SettingsFileManager');
const logging = require('./services/logging');
const HooksManager = require('./services/HooksManager');
const UrlService = require('./services/UrlService');
const UsageStats = require('./services/UsageStats');

let BatchEventsDispatcher;
let customEventUtil;
let BatchEventsQueue;

if (typeof process.env !== 'undefined') {
  BatchEventsQueue = require('./services/BatchEventsQueue');
  BatchEventsDispatcher = require('./utils/BatchEventsDispatcher').dispatch;
  customEventUtil = require('./utils/CustomEventUtil');
}

const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const file = FileNameEnum.VWO;

class VWO {
  // Setting various services on the instance to be accessible by its member functions
  constructor(config = {}) {
    this.getVariation = this.getVariationName; // to be backward compatible
    this.userStorageService = config.userStorageService;
    this.logger = config.logger;
    this.returnPromiseFor = config.returnPromiseFor;
    this.optOut = false;

    let settingsFileManager = new SettingsFileService(config);

    // Validate the config file i.e. check if required fields contain appropriate data
    if (!settingsFileManager.isSettingsFileValid()) {
      this.logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.SETTINGS_FILE_INVALID, {
          file
        })
      );

      return;
    }

    this.logger.log(
      LogLevelEnum.INFO,
      LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.CONFIG_VALID, {
        file
      })
    );

    // Initialize Hooks manager so that callbacks can be invoked
    HooksManager.init(config);

    // Setup event quque for sending impressions to VWO server
    this.eventQueue = new EventQueue();
    this.usageStats = new UsageStats();

    this.SettingsFileManager = settingsFileManager;
    settingsFileManager.checkAndPoll(); // Checks if pollingInterval is passed then starts polling settingsFile

    if (!config.isDevelopmentMode) {
      this.usageStats.collectUsageStats(settingsFileManager.getConfig());
    }

    // Only for Node.js SDK
    if (typeof process.env !== 'undefined') {
      if (config.batchEvents) {
        const accountId = settingsFileManager.getSettingsFile().accountId;
        const sdkKey = settingsFileManager.getSettingsFile().sdkKey;

        this.batchEventsQueue = new BatchEventsQueue(
          Object.assign(
            {},
            config.batchEvents,
            { isDevelopmentMode: config.isDevelopmentMode },
            {
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
            }
          )
        );

        this.batchEventsQueue.flushAndClearTimer.bind(this.batchEventsQueue);
      }
    }

    // Process settingsFile for various things. For eg: assign bucket range to variation, etc.
    this.SettingsFileManager.processSettingsFile();

    this.logger.log(
      LogLevelEnum.INFO,
      LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.SDK_INITIALIZED, {
        file
      })
    );

    this.UrlService = UrlService.init(config.settingsFile);
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
        self.logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.CONFIG_RETURN_PROMISE, {
            file,
            method: ApiEnum.ACTIVATE
          })
        );
        return new Promise(resolve => {
          if (this.optOut) {
            this.logger.log(
              LogLevelEnum.INFO,
              LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
                file,
                api: ApiEnum.ACTIVATE
              })
            );
            resolve(null);
          } else {
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
          }
        });
      }

      if (this.optOut) {
        this.logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
            file,
            api: ApiEnum.ACTIVATE
          })
        );
        return null;
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
        self.logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.CONFIG_RETURN_PROMISE, {
            file,
            method: ApiEnum.GET_VARIATION_NAME
          })
        );
        return new Promise(resolve => {
          if (this.optOut) {
            this.logger.log(
              LogLevelEnum.INFO,
              LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
                file,
                api: ApiEnum.GET_VARIATION_NAME
              })
            );
            resolve(null);
          } else {
            // since this API does not send any async call, we can simply resolve the returned value
            resolve(api.getVariation(self, campaignKey, userId, options));
          }
        });
      }

      if (this.optOut) {
        this.logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
            file,
            api: ApiEnum.GET_VARIATION_NAME
          })
        );
        return null;
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
        self.logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.CONFIG_RETURN_PROMISE, {
            file,
            method: ApiEnum.TRACK
          })
        );
        return new Promise(resolve => {
          if (this.optOut) {
            this.logger.log(
              LogLevelEnum.INFO,
              LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
                file,
                api: ApiEnum.TRACK
              })
            );
            resolve(null);
          } else {
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
            } else if (trackResponse && trackResponse.isDevelopmentMode) {
              delete trackResponse.isDevelopmentMode;
              resolve(trackResponse);
            }
          }
        });
      }

      if (this.optOut) {
        this.logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
            file,
            api: ApiEnum.TRACK
          })
        );
        return null;
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
        self.logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.CONFIG_RETURN_PROMISE, {
            file,
            method: ApiEnum.IS_FEATURE_ENABLED
          })
        );
        return new Promise(resolve => {
          if (this.optOut) {
            this.logger.log(
              LogLevelEnum.INFO,
              LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
                file,
                api: ApiEnum.IS_FEATURE_ENABLED
              })
            );
            resolve(false);
          } else {
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
          }
        });
      }

      if (this.optOut) {
        this.logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
            file,
            api: ApiEnum.IS_FEATURE_ENABLED
          })
        );
        return false;
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
        self.logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.CONFIG_RETURN_PROMISE, {
            file,
            method: ApiEnum.GET_FEATURE_VARIABLE_VALUE
          })
        );
        return new Promise(resolve => {
          if (this.optOut) {
            this.logger.log(
              LogLevelEnum.INFO,
              LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
                file,
                api: ApiEnum.GET_FEATURE_VARIABLE_VALUE
              })
            );
            resolve(null);
          } else {
            // since this API does not send any async call, we can simply resolve the returned value
            resolve(api.getFeatureVariableValue(self, campaignKey, variableKey, userId, options));
          }
        });
      }

      if (this.optOut) {
        this.logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
            file,
            api: ApiEnum.GET_FEATURE_VARIABLE_VALUE
          })
        );
        return null;
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
          LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.API_BAD_PARAMETERS, {
            file,
            api: ApiEnum.PUSH
          })
        );
        return false;
      }

      // Check if returnPromiseFor is provided. If yes, return a promise instead of value
      // i.e. wait till the network call is not successful
      if (self.returnPromiseFor && (self.returnPromiseFor.push || self.returnPromiseFor.all)) {
        self.logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.CONFIG_RETURN_PROMISE, {
            file,
            method: ApiEnum.PUSH
          })
        );
        return new Promise(resolve => {
          if (this.optOut) {
            this.logger.log(
              LogLevelEnum.INFO,
              LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
                file,
                api: ApiEnum.PUSH
              })
            );
            resolve(null);
          } else {
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
            } else if (apiResponse && apiResponse.isDevelopmentMode) {
              delete apiResponse.isDevelopmentMode;
              resolve(apiResponse);
            }
          }
        });
      }

      if (this.optOut) {
        this.logger.log(
          LogLevelEnum.INFO,
          LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
            file,
            api: ApiEnum.PUSH
          })
        );
        return null;
      }

      return api.push(self, tagKey, tagValue, userId, customDimensionMap);
    } catch (err) {
      this.logger.log(LogLevelEnum.ERROR, err.message);
      return false;
    }
  }

  setOptOut() {
    this.logger.log(
      LogLevelEnum.INFO,
      LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.OPT_OUT_API_CALLED, {
        file
      })
    );

    if (this.returnPromiseFor && (this.returnPromiseFor.optOut || this.returnPromiseFor.all)) {
      return new Promise(resolve => {
        this._destroyInstanceVariables();
        if (this.batchEventsQueue) {
          this.flushEvents().then(() => {
            this.batchEventsQueue = undefined;
            resolve(true);
          });
        } else {
          resolve(true);
        }
      });
    }

    if (this.batchEventsQueue) {
      this.flushEvents().then(() => {
        this.batchEventsQueue = undefined;
      });
    }

    this._destroyInstanceVariables();

    return true;
  }
  /**
   * Manually flush impression events to VWO which are queued in batch queue as per batchEvents config
   */
  flushEvents() {
    const accountId = this.SettingsFileManager.getSettingsFile().accountId;

    if (typeof process.env !== 'undefined') {
      this.logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.EVENT_BATCH_FLUSH, {
          file,
          accountId
        })
      );

      return new Promise((resolve, _reject) => {
        if (this.optOut) {
          this.logger.log(
            LogLevelEnum.INFO,
            LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
              file,
              api: 'flushEvents'
            })
          );
          resolve({
            status: false,
            message: 'opted out'
          });
        } else {
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
        }
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
    if (this.optOut) {
      this.logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.API_NOT_ENABLED, {
          file,
          api: 'getAndUpdateSettingsFile'
        })
      );
      return new Promise(resolve => {
        resolve(null);
      });
    }
    return this.SettingsFileManager.getAndUpdateSettingsFile(accountId, sdkKey);
  }

  _destroyInstanceVariables() {
    this.userStorageService = undefined;
    this.SettingsFileManager = undefined;
    this.usageStats = undefined;
    this.eventQueue = undefined;
    this.optOut = true;
  }
}

module.exports = VWO;
