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
const SettingsFileUtil = require('./utils/SettingsFileUtil');

const logging = require('./services/logging');
const FileNameEnum = require('./enums/FileNameEnum');
const { setLogHandler, setLogLevel, LogLevelEnum, LogNumberLevel, LogMessageEnum, LogMessageUtil } = logging;

const logger = logging.getLogger();

// By default, all ERRORS should be logged
logging.setLogLevel(LogLevelEnum.ERROR);

module.exports = {
  logging,
  setLogger: setLogHandler,
  setLogLevel,
  getSettingsFile: SettingsFileUtil.get,
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
      config = sdkConfig;
    } catch (err) {
      logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.SDK_CONFIG_CORRUPTED, {
          file: FileNameEnum.INDEX,
          value: config.logging.haveColoredLogs
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
            file: FileNameEnum.INDEX
          })
        );
      } else if (config.logging.logger) {
        logger.log(
          LogLevelEnum.ERROR,
          LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.CUSTOM_LOGGER_MISCONFIGURED, {
            file: FileNameEnum.INDEX
          })
        );
      }

      if (config.logging.level !== undefined) {
        logging.setLogLevel(config.logging.level);
        logger.log(
          LogLevelEnum.DEBUG,
          LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.LOG_LEVEL_SET, {
            file: FileNameEnum.INDEX,
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
          file: FileNameEnum.INDEX
        })
      );
    }

    // Set logger on config Obkect, to be required later
    config.logger = config.logger || logger;

    // Create an instance of VWO class which exposes API methods
    return new VWO(config);
  }
};
