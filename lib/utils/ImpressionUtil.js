/**
 * Copyright 2019 Wingify Software Pvt. Ltd.
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

const Constants = require('../constants');

const UuidUtil = require('./UuidUtil');
const ValidateUtil = require('./ValidateUtil');
const FunctionUtil = require('./FunctionUtil');

const logging = require('../logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const logger = logging.getLogger();

module.exports = {
  /**
   * Build properties for the impression event
   *
   * @param {String} userId the unique ID assigned to a user
   * @param {String} campaignTestKey, the Campaign ID
   * @param {Number} variationId, the Variation ID
   * @param {String} goalId, the Goal ID
   * @param {String} revenue, the revenue generated on conversion
   *
   * @return null if campaign ID or variation ID is invalid
   */
  buildEvent: (configObj, campaignTestKey, variationId, userId, goal = {}, revenue = null) => {
    const { accountId } = configObj;
    const goalId = goal.id;

    let isTrackUserAPI;
    let isTrackGoalAPI;

    if (goalId !== undefined && goalId !== null) {
      isTrackGoalAPI = true;
    } else {
      isTrackUserAPI = true;
    }

    let properties = {
      account_id: accountId,
      experiment_id: campaignTestKey,
      ap: Constants.PLATFORM,
      uId: encodeURIComponent(userId),
      combination: variationId,
      random: FunctionUtil.getRandomNumber(),
      sId: FunctionUtil.getCurrentUnixTimestamp(),
      u: UuidUtil.generateFor(userId, accountId),
      sdk: Constants.SDK_NAME,
      'sdk-v': Constants.SDK_VERSION
    };

    if (isTrackUserAPI) {
      properties.ed = JSON.stringify({ p: 'server' });
      properties.url = Constants.HTTPS_PROTOCOL + Constants.ENDPOINTS.BASE_URL + Constants.ENDPOINTS.TRACK_USER;

      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.IMPRESSION_FOR_TRACK_USER, {
          file: FileNameEnum.ImpressionUtil,
          properties: JSON.stringify(properties)
        })
      );
    } else if (isTrackGoalAPI) {
      properties.url = Constants.HTTPS_PROTOCOL + Constants.ENDPOINTS.BASE_URL + Constants.ENDPOINTS.TRACK_GOAL;

      properties['goal_id'] = goalId;
      if (goal.type === Constants.GOAL_TYPES.REVENUE && ValidateUtil.isValidValue(revenue)) {
        properties['r'] = revenue;
      }

      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.IMPRESSION_FOR_TRACK_GOAL, {
          file: FileNameEnum.ImpressionUtil,
          properties: JSON.stringify(properties)
        })
      );
    }

    return properties;
  }
};
