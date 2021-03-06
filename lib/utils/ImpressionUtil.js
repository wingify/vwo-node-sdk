/**
 * Copyright 2019-2021 Wingify Software Pvt. Ltd.
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
const UrlEnum = require('../enums/UrlEnum');
const GoalTypeEnum = require('../enums/GoalTypeEnum');

const UuidUtil = require('./UuidUtil');
const ValidateUtil = require('./ValidateUtil');
const FunctionUtil = require('./FunctionUtil');

const logging = require('../services/logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const logger = logging.getLogger();

/**
 * Return primary properties required for every network call to VWO server
 * @param {Object} configObj
 * @param {String} userId
 *
 * @returns primary properties
 */
function getPrimaryProperties(configObj, userId) {
  return {
    sId: FunctionUtil.getCurrentUnixTimestamp(),
    u: UuidUtil.generateFor(userId, configObj.accountId)
  };
}

/**
 * Return base properties required for every network call to VWO server
 * @param {Object} configObj
 * @param {String} userId
 *
 * @returns base properties
 */
function getBaseProperties(configObj, userId) {
  const { accountId } = configObj;

  return Object.assign({}, getPrimaryProperties(configObj, userId), ImpressionUtil.getReportingProperties(configObj), {
    account_id: accountId,
    random: FunctionUtil.getRandomNumber(),
    ap: Constants.PLATFORM
  });
}

let ImpressionUtil = {
  /**
   * Build properties for the impression event
   *
   * @param {String} userId the unique ID assigned to a user
   * @param {String} tagKey the tag name
   * @param {String} tagValue the tag value
   */
  buildEventForPushing(configObj, tagKey, tagValue, userId) {
    const properties = Object.assign({}, getBaseProperties(configObj, userId));
    properties.url = Constants.HTTPS_PROTOCOL + UrlEnum.BASE_URL + UrlEnum.PUSH;
    properties.tags = JSON.stringify({
      u: {
        [encodeURIComponent(tagKey)]: encodeURIComponent(tagValue)
      }
    });
    logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.IMPRESSION_FOR_PUSH, {
        file: FileNameEnum.ImpressionUtil,
        properties: this._getStringifiedLogProperties(properties)
      })
    );

    return properties;
  },
  /**
   * Build properties for the bulk impression event
   *
   * @param {String} userId the unique ID assigned to a user
   * @param {String} tagKey the tag name
   * @param {String} tagValue the tag value
   */
  buildBatchEventForPushing(configObj, tagKey, tagValue, userId) {
    if (typeof process.env !== 'undefined') {
      const properties = Object.assign({}, getPrimaryProperties(configObj, userId));
      properties.eT = 3;
      properties.t = encodeURIComponent(
        JSON.stringify({
          u: {
            [tagKey]: tagValue
          }
        })
      );
      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.IMPRESSION_FOR_PUSH, {
          file: FileNameEnum.ImpressionUtil,
          properties: JSON.stringify(properties)
        })
      );

      return properties;
    }
  },
  /**
   * Build properties for the impression event
   *
   * @param {String} userId the unique ID assigned to a user
   * @param {String} campaignKey, the Campaign ID
   * @param {Number} variationId, the Variation ID
   *
   * @return null if campaign ID or variation ID is invalid
   */
  buildEventForTrackingUser(configObj, campaignKey, variationId, userId, usageStats) {
    let properties = Object.assign(
      {
        experiment_id: campaignKey,
        combination: variationId
      },
      getBaseProperties(configObj, userId),
      usageStats
    );
    properties.ed = JSON.stringify({ p: 'server' });
    properties.url = Constants.HTTPS_PROTOCOL + UrlEnum.BASE_URL + UrlEnum.TRACK_USER;

    logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.IMPRESSION_FOR_TRACK_USER, {
        file: FileNameEnum.ImpressionUtil,
        properties: this._getStringifiedLogProperties(properties)
      })
    );

    return properties;
  },
  /**
   * Build properties for the bulk impression event
   *
   * @param {String} userId the unique ID assigned to a user
   * @param {String} campaignKey, the Campaign ID
   * @param {Number} variationId, the Variation ID
   *
   * @return null if campaign ID or variation ID is invalid
   */
  buildBatchEventForTrackingUser(configObj, campaignKey, variationId, userId) {
    if (typeof process.env !== 'undefined') {
      let properties = Object.assign(
        {
          e: campaignKey,
          c: variationId
        },
        getPrimaryProperties(configObj, userId)
      );
      properties.eT = 1;
      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.IMPRESSION_FOR_TRACK_USER, {
          file: FileNameEnum.ImpressionUtil,
          properties: JSON.stringify(properties)
        })
      );

      return properties;
    }
  },
  /**
   * Build properties for the impression event
   *
   * @param {String} userId the unique ID assigned to a user
   * @param {String} campaignKey, the Campaign ID
   * @param {Number} variationId, the Variation ID
   * @param {String} goalId, the Goal ID
   * @param {String} revenue, the revenue generated on conversion
   *
   * @return null if campaign ID or variation ID is invalid
   */
  buildEventForTrackingGoal(configObj, campaignKey, variationId, userId, goal = {}, revenue = null) {
    const goalId = goal.id;

    let properties = Object.assign(
      {
        experiment_id: campaignKey,
        combination: variationId
      },
      getBaseProperties(configObj, userId)
    );

    properties.url = Constants.HTTPS_PROTOCOL + UrlEnum.BASE_URL + UrlEnum.TRACK_GOAL;

    properties['goal_id'] = goalId;
    if (goal.type === GoalTypeEnum.REVENUE && ValidateUtil.isValidValue(revenue)) {
      properties['r'] = revenue;
    }

    logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.IMPRESSION_FOR_TRACK_GOAL, {
        file: FileNameEnum.ImpressionUtil,
        properties: this._getStringifiedLogProperties(properties)
      })
    );

    return properties;
  },
  /**
   * Build properties for the bulk impression event
   *
   * @param {String} userId the unique ID assigned to a user
   * @param {String} campaignKey, the Campaign ID
   * @param {Number} variationId, the Variation ID
   * @param {String} goalId, the Goal ID
   * @param {String} revenue, the revenue generated on conversion
   *
   * @return null if campaign ID or variation ID is invalid
   */
  buildBatchEventForTrackingGoal(configObj, campaignKey, variationId, userId, goal = {}, revenue = null) {
    if (typeof process.env !== 'undefined') {
      let properties = Object.assign(
        {
          e: campaignKey,
          c: variationId
        },
        getPrimaryProperties(configObj, userId)
      );
      properties.eT = 2;

      properties.g = goal.id;
      if (goal.type === GoalTypeEnum.REVENUE && ValidateUtil.isValidValue(revenue)) {
        properties.r = revenue;
      }

      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.IMPRESSION_FOR_TRACK_GOAL, {
          file: FileNameEnum.ImpressionUtil,
          properties: JSON.stringify(properties)
        })
      );

      return properties;
    }
  },

  /**
   * Return an object containing properties required for segmenting reports
   * @param {Object} configObj
   * @returns reporting properties
   */
  getReportingProperties(configObj) {
    const { sdkKey } = configObj;

    return {
      [Constants.SDK_QUERY_PARAM]: Constants.SDK_NAME,
      [Constants.SDK_VERSION_QUERY_PARAM]: Constants.SDK_VERSION,
      env: sdkKey
    };
  },

  /**
   * Remove the sensitive keys from the properties to te displayed in the log.
   * @param {Object} properties
   * @returns properties without sensitive keys
   */
  _getStringifiedLogProperties(properties) {
    const logProperties = Object.assign({}, properties);
    delete logProperties.env;
    return JSON.stringify(logProperties);
  }
};

module.exports = ImpressionUtil;
