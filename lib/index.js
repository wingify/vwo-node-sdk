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

const VWO = require('./VWO');

const DataTypeUtil = require('./utils/DataTypeUtil');
const FunctionUtil = require('./utils/FunctionUtil');
const { objectValues } = require('./utils/ObjectUtil');
const SettingsFileUtil = require('./utils/SettingsFileUtil');
const GoalTypeEnum = require('./enums/GoalTypeEnum');
const { MAX_EVENTS_PER_REQUEST } = require('./constants');

const logging = require('./services/logging');
const ApiEnum = require('./enums/ApiEnum');
const FileNameEnum = require('./enums/FileNameEnum');
const file = FileNameEnum.INDEX;
const { setLogHandler, setLogLevel, LogLevelEnum, LogNumberLevel, LogMessageEnum, LogMessageUtil } = logging;

const logger = logging.getLogger();

// By default, all ERRORS should be logged
logging.setLogLevel(LogLevelEnum.ERROR);

function logError(parameter = '', type = '') {
  const log = LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.CONFIG_PARAMETER_INVALID, {
    file: file,
    parameter,
    type,
    api: ApiEnum.LAUNCH
  });

  throw new Error(logger.log(LogLevelEnum.ERROR, log));
}

function logInfo(parameter = '', type = '') {
  const log = LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.CONFIG_PARAMETER_USED, {
    file: file,
    parameter,
    type
  });

  console.info(`VWO-SDK - [INFO]:   ${FunctionUtil.getCurrentTime()} ${log}`);
}

module.exports = {
  logging,
  setLogger: setLogHandler,
  setLogLevel,
  getSettingsFile: SettingsFileUtil.get,
  GoalTypeEnum,
  LogLevelEnum,
  /**
   * Initializes the SDK and parses the settingsfile
   *
   * @param {Object} config configuration for the SDK
   */
  launch: function(sdkConfig) {
    let config = {};
    try {
      // validating config schema
      FunctionUtil.cloneObject(sdkConfig);
      if (
        !DataTypeUtil.isUndefined(sdkConfig.shouldTrackReturningUser) &&
        !DataTypeUtil.isBoolean(sdkConfig.shouldTrackReturningUser)
      ) {
        logError('shouldTrackReturningUser', 'boolean');
      } else if (!DataTypeUtil.isUndefined(sdkConfig.shouldTrackReturningUser)) {
        logInfo('shouldTrackReturningUser', 'boolean');
      }

      if (
        !DataTypeUtil.isUndefined(sdkConfig.isDevelopmentMode) &&
        !DataTypeUtil.isBoolean(sdkConfig.isDevelopmentMode)
      ) {
        logError('isDevelopmentMode', 'boolean');
      } else if (!DataTypeUtil.isUndefined(sdkConfig.isDevelopmentMode)) {
        logInfo('isDevelopmentMode', 'boolean');
      }

      if (sdkConfig.goalTypeToTrack && !objectValues(GoalTypeEnum).includes(sdkConfig.goalTypeToTrack)) {
        logError('goalTypeToTrack', 'string(REVENUE_TRACKING, CUSTOM_GOAL, ALL)');
      } else if (sdkConfig.goalTypeToTrack) {
        logInfo('goalTypeToTrack', 'string(REVENUE_TRACKING, CUSTOM_GOAL, ALL)');
      }

      if (
        sdkConfig.logging &&
        sdkConfig.logging.level &&
        !objectValues(LogLevelEnum).includes(sdkConfig.logging.level)
      ) {
        logError('logLevel', 'number(1,2,3,4)');
      } else if (sdkConfig.logging && sdkConfig.logging.level) {
        logInfo('logLevel', 'number(1,2,3,4)');
      }

      if (sdkConfig.pollingInterval && !DataTypeUtil.isNumber(sdkConfig.pollingInterval)) {
        logError('pollingInterval', 'number(in miliiseconds)');
      } else if (sdkConfig.pollingInterval) {
        logInfo('pollingInterval', 'number(in miliiseconds)');
      }

      if (sdkConfig.pollingInterval && DataTypeUtil.isUndefined(sdkConfig.sdkKey)) {
        logError();
      }

      if (sdkConfig.pollingInterval && !DataTypeUtil.isString(sdkConfig.sdkKey)) {
        logError('sdkKey', 'string');
      }

      if (!DataTypeUtil.isUndefined(sdkConfig.batchEvents) && !DataTypeUtil.isObject(sdkConfig.batchEvents)) {
        logError('batchEvents', 'object');
      } else if (!DataTypeUtil.isUndefined(sdkConfig.batchEvents)) {
        logInfo('batchEvents', 'object');
      }

      if (!DataTypeUtil.isUndefined(sdkConfig.returnPromiseFor) && !DataTypeUtil.isObject(sdkConfig.returnPromiseFor)) {
        logError('returnPromiseFor', 'object');
      } else if (!DataTypeUtil.isUndefined(sdkConfig.returnPromiseFor)) {
        logInfo('returnPromiseFor', 'object');
      }

      if (!DataTypeUtil.isUndefined(sdkConfig.integrations) && !DataTypeUtil.isObject(sdkConfig.integrations)) {
        logError('integrations', 'object');
      } else if (!DataTypeUtil.isUndefined(sdkConfig.integrations)) {
        logInfo('integrations', 'object');
      }

      if (
        !DataTypeUtil.isUndefined(sdkConfig.userStorageService) &&
        !DataTypeUtil.isObject(sdkConfig.userStorageService)
      ) {
        logError('userStorageService', 'object');
      } else if (!DataTypeUtil.isUndefined(sdkConfig.userStorageService)) {
        logInfo('userStorageService', 'object');
      }

      // For JavaScript SDK, batching is not required and is not available
      if (DataTypeUtil.isObject(sdkConfig.batchEvents) && typeof process.env === 'undefined') {
        sdkConfig.batchEvents = null;
      }

      // For Node.js SDK
      if (typeof process.env !== 'undefined') {
        if (
          DataTypeUtil.isObject(sdkConfig.batchEvents) &&
          (!(
            (DataTypeUtil.isNumber(sdkConfig.batchEvents.eventsPerRequest) &&
              sdkConfig.batchEvents.eventsPerRequest > 0 &&
              sdkConfig.batchEvents.eventsPerRequest <= MAX_EVENTS_PER_REQUEST) ||
            (DataTypeUtil.isNumber(sdkConfig.batchEvents.requestTimeInterval) &&
              sdkConfig.batchEvents.requestTimeInterval >= 1)
          ) ||
            (sdkConfig.batchEvents.flushCallback && !DataTypeUtil.isFunction(sdkConfig.batchEvents.flushCallback)))
        ) {
          logError('batchEvents', 'object');
        }
      }

      config = sdkConfig;
    } catch (err) {
      logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.CONFIG_CORRUPTED, {
          file: file,
          api: ApiEnum.LAUNCH
        })
      );

      config = {};
    }

    // If DEV mode, set colorful logs to true
    if (config.isDevelopmentMode) {
      logging.setLogColorMode(true);
    }

    // If logging is enabled, use the logger and logLevel defined by the client
    if (config.logging && DataTypeUtil.isObject(config.logging)) {
      if (config.logging.haveColoredLogs !== undefined) {
        logging.setLogColorMode(config.logging.haveColoredLogs);
      }

      if (
        config.logging.logger &&
        DataTypeUtil.isObject(config.logging.logger) &&
        DataTypeUtil.isFunction(config.logging.logger.log)
      ) {
        logging.setLogHandler(config.logging.logger);
        logging.setLogLevel(logging.LogLevelEnum.NOTSET);

        logger.log(
          LogLevelEnum.DEBUG,
          LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.CONFIG_CUSTOM_LOGGER_USED, {
            file: file
          })
        );
      } else if (config.logging.logger) {
        logError('logging.logger', 'object');
      }

      if (config.logging.level !== undefined) {
        logging.setLogLevel(config.logging.level);
        logger.log(
          LogLevelEnum.DEBUG,
          LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.CONFIG_LOG_LEVEL_SET, {
            file: file,
            level: LogNumberLevel['_' + config.logging.level]
          })
        );
      }
    }

    // DEBUG log for knowing whether it's DEV mode
    if (config.isDevelopmentMode) {
      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.CONFIG_DEVELOPMENT_MODE_STATUS, {
          file: file
        })
      );
    }

    // Set logger on config Obkect, to be required later
    config.logger = (config.logging && config.logging.logger) || logger;

    // Create an instance of VWO class which exposes API methods
    return new VWO(config);
  }
};
