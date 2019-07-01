const VWO = require('./VWO');

const SettingsFileUtil = require('./utils/SettingsFileUtil');
const DataTypeUtil = require('./utils/DataTypeUtil');

const logging = require('./logging');
const FileNameEnum = require('./enums/FileNameEnum');
const { setLogger, setLogLevel, LogLevelEnum, LogNumberLevel, LogMessageEnum, LogMessageUtil } = logging;

const logger = logging.getLogger();

// By default, all ERRORS should be logged
logging.setLogLevel(LogLevelEnum.ERROR);

module.exports = {
  logging,
  setLogger,
  setLogLevel,
  getSettingsFile: SettingsFileUtil.get,
  /**
   * Initializes the SDK and parses the settingsfile
   *
   * @param {Object} config configuration for the SDK
   */
  createInstance: function(projectConfig) {
    let config = {};
    // Deep-clone the original config
    // Object.asssign is not good for deep-cloneing
    try {
      config = JSON.parse(JSON.stringify(projectConfig)) || {};
    } catch (err) {
      logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.PROJECT_CONFIG_CORRUPTED, {
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

        logger.log(
          LogLevelEnum.DEBUG,
          LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SET_COLORED_LOG, {
            file: FileNameEnum.INDEX,
            value: config.logging.haveColoredLogs
          })
        );
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
