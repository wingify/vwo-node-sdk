const { LogLevelEnum, LogNumberLevel } = require('../enums/LogLevelEnum');
const LogMessageEnum = require('../enums/LogMessageEnum');
const LogMessageUtil = require('../utils/LogMessageUtil');

const ConsoleLogManager = require('./ConsoleLogManager');

let globalLogLevel = LogLevelEnum.NOTSET;
let isColoredLogEnabled = false;
let globalLogHandler = new ConsoleLogManager();

class LogManager {
  constructor(name) {
    this.name = name;
    this.isColoredLogEnabled = isColoredLogEnabled;
  }

  _customLog(level, message) {
    if (!globalLogHandler) {
      return;
    }

    if (level < globalLogLevel) {
      return;
    }

    globalLogHandler.log(level, message);
  }

  log(level, message) {
    try {
      this._customLog(level, message);
    } catch (er) {
      console.error('VWO: Could not log.');
    }
  }

  info(message) {
    this._customLog(LogLevelEnum.INFO, message);
  }
  debug(message) {
    this._customLog(LogLevelEnum.DEBUG, message);
  }
  warn(message) {
    this._customLog(LogLevelEnum.WARN, message);
  }
  error(message) {
    this._customLog(LogLevelEnum.ERROR, message);
  }
}

function getLogger(name) {
  return new LogManager(name);
}

function setLogHandler(logger) {
  globalLogHandler = logger;
}

function setLogLevel(level) {
  if (level === undefined) {
    globalLogLevel = LogLevelEnum.ERROR;
  } else {
    globalLogLevel = level;
  }
}

function getLogLevel() {
  return globalLogLevel;
}

function setLogColorMode(value) {
  isColoredLogEnabled = value;
  globalLogHandler.isColoredLogEnabled = isColoredLogEnabled;
}

function getLogColorMode() {
  return isColoredLogEnabled;
}

module.exports = {
  LogLevelEnum,
  LogNumberLevel,
  LogMessageUtil,
  LogMessageEnum,
  getLogger,
  setLogHandler,
  setLogLevel,
  getLogLevel,
  LogManager,
  setLogColorMode,
  getLogColorMode
};
