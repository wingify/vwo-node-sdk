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

const ApiEnum = require('../enums/ApiEnum');
const logging = require('../services/logging');
const FileNameEnum = require('../enums/FileNameEnum');
const EventEnum = require('../enums/EventEnum');
const ValidateUtil = require('../utils/ValidateUtil');
const ImpressionUtil = require('../utils/ImpressionUtil');
const DataTypeUtil = require('../utils/DataTypeUtil');

let BatchEventsDispatcher;

if (typeof process.env !== 'undefined') {
  BatchEventsDispatcher = require('../utils/BatchEventsDispatcher');
}

const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;

const file = FileNameEnum.Push;

/**
 * This API method: Pushes the key-value tag pair for a particular user
 *
 * 1. validates the arguments being passed
 * 2. Sends a call to VWO push api
 *
 * @param {Object} vwoInstance               VWO instance which has logger, settingsFile etc.
 * @param {String} tagKey                    tag key
 * @param {String} tagValue                  tag Value
 * @param {String} userId                    ID assigned to a user
 *
 * @return {Boolean}                         true if request is pushed to eventQueue, false if params are invalid or settings file is unavailable
 */
function push(vwoInstance, tagKey, tagValue, userId, customDimensionMap, { responseCallback } = {}) {
  const api = ApiEnum.PUSH;

  if (
    !ValidateUtil.areValidParamsForAPIMethod({
      method: ApiEnum.PUSH,
      tagKey,
      tagValue,
      userId,
      customDimensionMap,
      responseCallback
    })
  ) {
    vwoInstance.logger.log(
      LogLevelEnum.ERROR,
      LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.PUSH_INVALID_PARAMS, {
        file,
        method: api
      })
    );
    return false;
  }

  if (tagKey.length > 255) {
    vwoInstance.logger.log(
      LogLevelEnum.ERROR,
      LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.TAG_KEY_LENGTH_EXCEEDED, {
        file,
        tagKey,
        userId
      })
    );
    return false;
  }

  if (tagValue.length > 255) {
    vwoInstance.logger.log(
      LogLevelEnum.ERROR,
      LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.TAG_VALUE_LENGTH_EXCEEDED, {
        file,
        tagKey,
        userId,
        tagValue
      })
    );
    return false;
  }

  if (tagKey === ' ' && tagValue === ' ' && (!customDimensionMap || Object.keys(customDimensionMap).length === 0)) {
    vwoInstance.logger.log(
      LogLevelEnum.ERROR,
      LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.PUSH_INVALID_PARAMS, {
        file,
        method: api
      })
    );
    return false;
  }

  if (tagKey !== ' ' && tagValue !== ' ') {
    customDimensionMap[tagKey] = tagValue;
  }

  // Get the cached configuration
  let config = vwoInstance.SettingsFileManager.getConfig();
  let settingsFile = vwoInstance.SettingsFileManager.getSettingsFile(api);

  // If no settings are found, simply false
  if (!settingsFile) {
    return false;
  }

  let result = {};
  if (config.batchEvents) {
    Object.keys(customDimensionMap).forEach(key => {
      const tagValue = DataTypeUtil.isString(customDimensionMap[key])
        ? customDimensionMap[key]
        : JSON.stringify(customDimensionMap[key]);
      let properties = ImpressionUtil.buildBatchEventForPushing(settingsFile, key, tagValue, userId);
      vwoInstance.batchEventsQueue.enqueue(properties);

      result[key] = true;
    });
  } else if (settingsFile.isEventArchEnabled) {
    let properties = ImpressionUtil.getEventsBaseProperties(settingsFile, EventEnum.VWO_SYNC_VISITOR_PROP);
    let payload = ImpressionUtil.getPushPayloadData(
      settingsFile,
      userId,
      EventEnum.VWO_SYNC_VISITOR_PROP,
      customDimensionMap
    );
    vwoInstance.eventQueue.process(config, properties, vwoInstance, { payload, responseCallback });

    result.success = true;
  } else {
    const events = [];
    const customDimensionKeys = Object.keys(customDimensionMap);

    customDimensionKeys.forEach(key => {
      let properties;
      const tagValue = DataTypeUtil.isString(customDimensionMap[key])
        ? customDimensionMap[key]
        : JSON.stringify(customDimensionMap[key]);

      if (typeof process.env === 'undefined') {
        properties = ImpressionUtil.buildEventForPushing(settingsFile, key, tagValue, userId);
        vwoInstance.eventQueue.process(config, properties, vwoInstance, { responseCallback });
      } else if (customDimensionKeys.length === 1) {
        properties = ImpressionUtil.buildEventForPushing(settingsFile, key, tagValue, userId);
      } else {
        properties = ImpressionUtil.buildBatchEventForPushing(settingsFile, key, tagValue, userId);
      }

      events.push(properties);
      result[key] = true;
    });

    if (typeof process.env !== 'undefined') {
      if (customDimensionKeys.length === 1) {
        vwoInstance.eventQueue.process(config, events[0], vwoInstance, { responseCallback });
      } else {
        if (!config.isDevelopmentMode) {
          BatchEventsDispatcher.dispatch(
            {
              ev: events
            },
            responseCallback,
            Object.assign(
              {},
              {
                a: vwoInstance.SettingsFileManager.getSettingsFile().accountId
              },
              vwoInstance.usageStats.getUsageStats()
            ),
            vwoInstance.SettingsFileManager.getSettingsFile().sdkKey
          );
        }
      }
    }
  }

  if (config.isDevelopmentMode) {
    return Object.assign({}, result, { isDevelopmentMode: config.isDevelopmentMode });
  }

  return result;
}

module.exports = push;
