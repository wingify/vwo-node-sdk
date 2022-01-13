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

/**
 * Took reference from: "loglevel" - https://github.com/pimterry/loglevel
 *
 * Name: loglevel
 * Published Name: loglevel
 * URL: https://github.com/pimterry/loglevel
 * Description: Minimal lightweight logging for JavaScript, adding reliable log level methods to wrap any available console.log methods
 * Author: Tim Perry (https://github.com/pimterry)
 * LICENSE: MIT License
 * Local Modifications: This library is not used as a dependency. Source code was referenced and is modified as per requirements.
 *
 */

// TODO: change path
const LogMessageEnum = {
  DEBUG_MESSAGES: require('vwo-sdk-log-messages/src/debug-messages.json'),
  INFO_MESSAGES: require('vwo-sdk-log-messages/src/info-messages.json'),
  WARNING_MESSAGES: require('vwo-sdk-log-messages/src/warning-messages.json'),
  ERROR_MESSAGES: require('vwo-sdk-log-messages/src/error-messages.json')
};

const { LogLevelEnum, LogNumberLevel } = require('../../enums/LogLevelEnum');
const LogMessageUtil = require('../../utils/LogMessageUtil');

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
    if (level < globalLogLevel) {
      return;
    }

    globalLogHandler.log(level, message);
  }

  log(level, message, disableLogs = false) {
    if (disableLogs) {
      return;
    }
    try {
      this._customLog(level, message);
    } catch (err) {
      console.error('VWO: Could not log.', err);
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
  getLogColorMode,
  globalLogHandler
};
