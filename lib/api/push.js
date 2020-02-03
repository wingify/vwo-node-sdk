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

const ApiEnum = require('../enums/ApiEnum');
const logging = require('../services/logging');
const FileNameEnum = require('../enums/FileNameEnum');
const ValidateUtil = require('../utils/ValidateUtil');
const ImpressionUtil = require('../utils/ImpressionUtil');

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
function push(vwoInstance, tagKey, tagValue, userId) {
  const api = ApiEnum.PUSH;

  if (!ValidateUtil.areValidParamsForAPIMethod({ method: ApiEnum.PUSH, tagKey, tagValue, userId })) {
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

  // Get the cached configuration
  let config = vwoInstance.SettingsFileManager.getConfig();
  let settingsFile = config.settingsFile;

  // If no settings are found, simply log and return no variation
  if (!settingsFile) {
    vwoInstance.logger.log(
      LogLevelEnum.ERROR,
      LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.GET_VARIATION_API_CONFIG_CORRUPTED, {
        file,
        method: api
      })
    );
    return false;
  }

  let properties = ImpressionUtil.buildEventForPushing(settingsFile, tagKey, tagValue, userId);

  vwoInstance.eventQueue.process(config, properties, vwoInstance);

  return true;
}

module.exports = push;
