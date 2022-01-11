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

const { getCurrentTime } = require('../../utils/FunctionUtil');
const { LogLevelEnum, LogLevelInfoEnum, LogLevelColorInfoEnum } = require('../../enums/LogLevelEnum');

class ConsoleLogManager {
  constructor() {
    this.logLevel = LogLevelEnum.NOTSET;
    this.prefix = `VWO-SDK`;
    this.isColoredLogEnabled = false;
  }

  log(level, message) {
    if (!this.shouldLog(level)) {
      return;
    }

    let logMessage;
    if (this.isColoredLogEnabled) {
      logMessage = `${this.prefix} - ${LogLevelColorInfoEnum[level]} ${getCurrentTime()} ${message}`;
    } else {
      logMessage = `${this.prefix} - ${LogLevelInfoEnum[level]} ${getCurrentTime()} ${message}`;
    }

    this.consoleLog(level, [logMessage]);
  }

  shouldLog(targetLogLevel) {
    return targetLogLevel >= this.logLevel;
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
      case LogLevelEnum.INFO:
        console.info.apply(console, logArguments);
        break;
      case LogLevelEnum.WARN:
        console.warn.apply(console, logArguments);
        break;
      case LogLevelEnum.ERROR:
        console.error.apply(console, logArguments);
        break;
      default:
        console.log.apply(console, logArguments);
        break;
    }
  }
}

module.exports = ConsoleLogManager;
