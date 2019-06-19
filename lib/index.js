const VWO = require('./VWO');
const ProjectConfigManager = require('./services/ProjectConfigManager');

const logging = require('./logging');
const FileNameEnum = require('./enums/FileNameEnum');
const { setLogger, setLogLevel, LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const logger = logging.getLogger();

// By default, all ERRORS should be logged
logging.setLogLevel(LogLevelEnum.ERROR);

module.exports = {
  logging,
  setLogger,
  setLogLevel,
  /**
   * Initializes the Api and parses the datafile
   * Validates the Api Key
   *
   * @param {String} apiKey the API Key obtained in the console
   * @param {String} configFilePath the file path to JSON Config file
   */
  createInstance: function(config) {
    config = config || {};

    if (config.logging && config.logging.logger) {
      logging.setLogHandler(config.logging.logger);
      logging.setLogLevel(logging.LogLevel.NOTSET);

      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.CUSTOM_LOGGER_USED, {
          file: FileNameEnum.INDEX
        })
      );
    }

    if (config.logging && config.logging.level !== undefined) {
      logging.setLogLevel(config.logging.level);
      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.LOG_LEVEL_SET, {
          file: FileNameEnum.INDEX,
          level: config.logging.level
        })
      );
    }

    config.logger = config.logger || logger;

    let projectConfigManager = new ProjectConfigManager({
      configFile: config.configFile,
      sdkKey: config.sdkKey
    });

    if (!projectConfigManager.isValidConfigFileAndSdkKey(config)) {
      throw new Error(
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.INVALID_CONFIGURATION, {
          file: FileNameEnum.INDEX
        })
      );
    }

    logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.VALID_CONFIGURATION, {
        file: FileNameEnum.INDEX
      })
    );

    config.ProjectConfigManager = projectConfigManager;
    // validate config params here

    return new VWO(config);
  }
};
