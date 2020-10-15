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

const VWO = require('./VWO');

const DataTypeUtil = require('./utils/DataTypeUtil');
const FunctionUtil = require('./utils/FunctionUtil');
const { objectValues } = require('./utils/ObjectUtil');
const SettingsFileUtil = require('./utils/SettingsFileUtil');
const GoalTypeEnum = require('./enums/GoalTypeEnum');
const { MAX_EVENTS_PER_REQUEST } = require('./constants');

const logging = require('./services/logging');
const FileNameEnum = require('./enums/FileNameEnum');
const file = FileNameEnum.INDEX;
const { setLogHandler, setLogLevel, LogLevelEnum, LogNumberLevel, LogMessageEnum, LogMessageUtil } = logging;

const logger = logging.getLogger();

// By default, all ERRORS should be logged
logging.setLogLevel(LogLevelEnum.ERROR);

function logError(log) {
  logger.log(LogLevelEnum.ERROR, log);

  throw new Error(logger.log(LogLevelEnum.ERROR, log));
}

module.exports = {
  logging,
  setLogger: setLogHandler,
  setLogLevel,
  getSettingsFile: SettingsFileUtil.get,
  GoalTypeEnum,
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
        throw new Error('shouldTrackReturningUser should be boolean');
      }
      if (
        !DataTypeUtil.isUndefined(sdkConfig.isDevelopmentMode) &&
        !DataTypeUtil.isBoolean(sdkConfig.isDevelopmentMode)
      ) {
        throw new Error('isDevelopmentMode should be boolean');
      }
      if (sdkConfig.goalTypeToTrack && !objectValues(GoalTypeEnum).includes(sdkConfig.goalTypeToTrack)) {
        throw new Error('goalTypeToTrack should be certain strings');
      }
      if (
        sdkConfig.logging &&
        sdkConfig.logging.level &&
        !objectValues(LogLevelEnum).includes(sdkConfig.logging.level)
      ) {
        throw new Error('log level should be certain values');
      }

      if (sdkConfig.pollingInterval && !DataTypeUtil.isNumber(sdkConfig.pollingInterval)) {
        const log = LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.POLLING_INTERVAL_INVALID, {
          file: file
        });

        logError(log);
      }

      if (sdkConfig.pollingInterval && DataTypeUtil.isUndefined(sdkConfig.sdkKey)) {
        const log = LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.SDK_KEY_NOT_PROVIVED, {
          file: file
        });

        logError(log);
      }

      if (sdkConfig.pollingInterval && !DataTypeUtil.isString(sdkConfig.sdkKey)) {
        const log = LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.SDK_KEY_NOT_STRING, {
          file: file
        });

        logError(log);
      }

      if (!DataTypeUtil.isUndefined(sdkConfig.batchEvents) && !DataTypeUtil.isObject(sdkConfig.batchEvents)) {
        const log = LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.EVENT_BATCHING_NOT_OBJECT, {
          file: file
        });

        logError(log);
      }

      if (DataTypeUtil.isObject(sdkConfig.batchEvents) && typeof process.env === 'undefined') {
        sdkConfig.batchEvents = null;
      }

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
        throw new Error('Invalid batchEvents config');
      }

      config = sdkConfig;
    } catch (err) {
      logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.SDK_CONFIG_CORRUPTED, {
          file: file
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
          LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.CUSTOM_LOGGER_USED, {
            file: file
          })
        );
      } else if (config.logging.logger) {
        logger.log(
          LogLevelEnum.ERROR,
          LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.CUSTOM_LOGGER_MISCONFIGURED, {
            file: file
          })
        );
      }

      if (config.logging.level !== undefined) {
        logging.setLogLevel(config.logging.level);
        logger.log(
          LogLevelEnum.DEBUG,
          LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.LOG_LEVEL_SET, {
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
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SET_DEVELOPMENT_MODE, {
          file: file
        })
      );
    }

    // Set logger on config Obkect, to be required later
    config.logger = config.logger || logger;

    // Create an instance of VWO class which exposes API methods
    return new VWO(config);
  }
};
