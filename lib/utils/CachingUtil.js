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

const DataTypeUtil = require('./DataTypeUtil');
const logging = require('../services/logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const logger = logging.getLogger();

const file = FileNameEnum.CachingUtil;

let CachingUtil = {
  _cache: {},
  _generateCacheKey: (keyPrefix, key) => {
    let finalKey = '';

    if (DataTypeUtil.isString(key) || DataTypeUtil.isNumber(key)) {
      finalKey = `${keyPrefix}__${key}`;
    } else if (DataTypeUtil.isObject(key)) {
      let combinedKeys = '';

      for (let objKey in key) {
        if (key.hasOwnProperty(objKey)) {
          combinedKeys += `__${key[objKey]}`;
        }
      }

      finalKey = `${keyPrefix}${combinedKeys}`;
    }

    return finalKey;
  },

  resetCache: () => {
    CachingUtil._cache = {};
    logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.RESET_CACHE, {
        file
      })
    );
  },
  get: (keyPrefix, key) => {
    if (keyPrefix && key) {
      let finalKey = CachingUtil._generateCacheKey(keyPrefix, key);

      if (CachingUtil._cache[finalKey]) {
        logger.log(
          LogLevelEnum.DEBUG,
          LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.GOT_FROM_CACHE, {
            file,
            finalKey
          })
        );

        return CachingUtil._cache[finalKey];
      }

      return false;
    }

    return false;
  },
  set: (keyPrefix, key, data) => {
    if (key && data) {
      let finalKey = CachingUtil._generateCacheKey(keyPrefix, key);

      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.SET_IN_CACHE, {
          file,
          finalKey
        })
      );

      CachingUtil._cache[finalKey] = data;
    }

    return false;
  }
  /* remove: (keyPrefix, key) => {
    if (key && keyPrefix) {
      let finalKey = CachingUtil._generateCacheKey(keyPrefix, key);

      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.REMOVE_FROM_CACHE, {
          file,
          finalKey
        })
      );
      delete CachingUtil._cache[finalKey];

      return true;
    }

    return false;
  } */
};

module.exports = CachingUtil;
