const { LogLevelEnum, LogLevelInfoEnum } = require('../enums/LogLevelEnum');

class ConsoleLogManager {
  constructor() {
    this.logLevel = LogLevelEnum.NOTSET;
    this.prefix = `VWO-SDK`;
  }

  log(level, message) {
    if (!this.shouldLog(level)) {
      return;
    }

    let logMessage = `${this.prefix} - ${LogLevelInfoEnum[level]} ${this.getCurrentTime()} ${message}`;

    this.consoleLog(level, [logMessage]);
  }

  shouldLog(targetLogLevel) {
    return targetLogLevel >= this.logLevel;
  }

  getCurrentTime() {
    return new Date().toISOString();
  }

  setLogLevel(level) {
    if (level === undefined) {
      this.logLevel = LogLevelEnum.ERROR;
    } else {
      this.logLevel = level;
    }
  }

  consoleLog(level, logArguments) {
    switch (level) {
      case LogLevelEnum.DEBUG:
        console.log.apply(console, logArguments);
        break;
      case LogLevelEnum.INFO:
        console.info.apply(console, logArguments);
        break;
      case LogLevelEnum.WARNING:
        console.warn.apply(console, logArguments);
        break;
      case LogLevelEnum.ERROR:
        console.error.apply(console, logArguments);
        break;
      default:
        console.log.apply(console, logArguments);
    }
  }
}

module.exports = ConsoleLogManager;
