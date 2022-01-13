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

const FunctionUtil = {
  cloneObject: obj => {
    if (!obj) {
      return obj;
    }

    let clonedObj = JSON.parse(JSON.stringify(obj));

    return clonedObj;
  },
  getRandomNumber: () => {
    return Math.random();
  },
  getCurrentUnixTimestamp: () => {
    return Math.ceil(+new Date() / 1000);
  },
  getCurrentUnixTimestampInMillis: () => {
    return +new Date();
  },
  matchWithRegex: (string, regex) => {
    try {
      return string.match(new RegExp(regex));
    } catch (err) {
      const logging = require('../services/logging');
      const FileNameEnum = require('../enums/FileNameEnum');

      const logger = logging.getLogger();
      const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
      const file = FileNameEnum.FunctionUtil;

      logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.SEGMENTATION_REGEX_CREATION_FAILED, {
          file,
          regex
        })
      );
      return null;
    }
  },
  getCurrentTime() {
    return new Date().toISOString();
  },
  convertObjectKeysToString(properties, excludedProperties) {
    let queryParams = '';
    excludedProperties = excludedProperties || [];

    for (let prop in properties) {
      if (properties.hasOwnProperty(prop)) {
        if (excludedProperties.indexOf(prop) === -1) {
          queryParams += prop + '=' + properties[prop] + '&';
        }
      }
    }

    return queryParams;
  },
  objectValues(obj) {
    let values = [];

    for (const prop in obj) {
      values.push(obj[prop]);
    }
    return values;
  }
};

module.exports = FunctionUtil;
