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

const cloneDeep = require('lodash.clonedeep');
const logging = require('../services/logging');
const FileNameEnum = require('../enums/FileNameEnum');

const logger = logging.getLogger();
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const file = FileNameEnum.FunctionUtil;

const FunctionUtil = {
  cloneObject: obj => {
    if (!obj) {
      return obj;
    }

    let clonedObj = cloneDeep(obj);

    return clonedObj;
  },
  getRandomNumber: () => {
    return Math.random();
  },
  getCurrentUnixTimestamp: () => {
    return Math.ceil(+new Date() / 1000);
  },
  matchWithRegex: (string, regex) => {
    try {
      return string.match(new RegExp(regex));
    } catch (err) {
      logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.REGEX_CREATION_FAILED, {
          file
        })
      );
      return null;
    }
  }
};

module.exports = FunctionUtil;
