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

const Constants = require('../constants');
const UrlEnum = require('../enums/UrlEnum');
const GoalTypeEnum = require('../enums/GoalTypeEnum');

const UuidUtil = require('./UuidUtil');
const ValidateUtil = require('./ValidateUtil');
const FunctionUtil = require('./FunctionUtil');

const logging = require('../services/logging');
const FileNameEnum = require('../enums/FileNameEnum');
const DataTypeUtil = require('./DataTypeUtil');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const logger = logging.getLogger();
const UrlService = require('../services/UrlService');
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
    properties.url = Constants.HTTPS_PROTOCOL + UrlService.getBaseUrl() + UrlEnum.PUSH;
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
    properties.url = Constants.HTTPS_PROTOCOL + UrlService.getBaseUrl() + UrlEnum.TRACK_USER;

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

    properties.url = Constants.HTTPS_PROTOCOL + UrlService.getBaseUrl() + UrlEnum.TRACK_GOAL;

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
   * Builds generic properties for different tracking calls required by VWO servers.
   * @param {Object} configObj
   * @param {String} eventName
   * @returns properties
   */
  getEventsBaseProperties(config, eventName, usageStats = {}) {
    const { sdkKey } = config;

    let properties = Object.assign(
      {
        en: eventName,
        a: config.accountId,
        env: sdkKey,
        eTime: FunctionUtil.getCurrentUnixTimestampInMillis(),
        random: FunctionUtil.getRandomNumber(),
        p: 'FS'
      },
      usageStats
    );

    properties.url = Constants.HTTPS_PROTOCOL + UrlService.getBaseUrl() + UrlEnum.EVENTS;
    return properties;
  },

  /**
   * Builds generic payload required by all the different tracking calls.
   * @param {Object} configObj
   * @param {String} userId
   * @param {String} eventName
   * @param {Object} usageStats
   * @returns properties
   */
  getEventBasePayload(configObj, userId, eventName) {
    const uuid = UuidUtil.generateFor(userId, configObj.accountId);
    const { sdkKey } = configObj;

    let props = {
      sdkName: Constants.SDK_NAME,
      sdkVersion: Constants.SDK_VERSION,
      $visitor: {
        props: {
          vwo_fs_environment: sdkKey
        }
      }
    };

    // if (usageStats) {
    //   props = Object.assign({}, props, usageStats);
    // }

    let properties = {
      d: {
        msgId: `${uuid}-${FunctionUtil.getCurrentUnixTimestamp()}`,
        visId: uuid,
        sessionId: FunctionUtil.getCurrentUnixTimestamp(),
        event: {
          props: props,
          name: eventName,
          time: FunctionUtil.getCurrentUnixTimestampInMillis()
        },
        visitor: {
          props: {
            vwo_fs_environment: sdkKey
          }
        }
      }
    };

    return properties;
  },

  /**
   * Builds payload to track the visitor.
   * @param {Object} configObj
   * @param {String} userId
   * @param {String} eventName
   * @param {String} campaignId
   * @param {Number} variationId
   * @returns track-user payload
   */
  getTrackUserPayloadData(configObj, userId, eventName, campaignId, variationId) {
    const properties = this.getEventBasePayload(configObj, userId, eventName);

    properties.d.event.props.id = campaignId;
    properties.d.event.props.variation = variationId;

    // this is currently required by data-layer team, we can make changes on DACDN and remove it from here
    properties.d.event.props.isFirst = 1;

    logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.IMPRESSION_FOR_EVENT_ARCH_TRACK_USER, {
        file: FileNameEnum.ImpressionUtil,
        accountId: configObj.accountId,
        userId,
        campaignId
      })
    );

    return properties;
  },

  /**
   * Builds payload to track the Goal.
   * @param {Object} configObj
   * @param {String} userId
   * @param {String} eventName
   * @param {Object} metricMap
   * @param {String} revenueValue
   * @returns track-goal payload
   */
  getTrackGoalPayloadData(configObj, userId, eventName, metricMap, revenueValue, revenuePropList) {
    const properties = this.getEventBasePayload(configObj, userId, eventName);

    let metric = {};
    Object.keys(metricMap).forEach(key => {
      metric[`id_${key}`] = [`g_${metricMap[key].goal.id}`];
      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.IMPRESSION_FOR_EVENT_ARCH_TRACK_GOAL, {
          file: FileNameEnum.ImpressionUtil,
          goalName: eventName,
          accountId: configObj.accountId,
          u: userId,
          campaignId: key
        })
      );
    });

    properties.d.event.props.vwoMeta = {
      metric: metric
    };

    if (revenuePropList && revenueValue && revenuePropList.size > 0) {
      revenuePropList.forEach(revenueProp => {
        properties.d.event.props.vwoMeta[revenueProp] = revenueValue;
      });
    }

    properties.d.event.props.isCustomEvent = true;
    return properties;
  },

  /**
   * Builds payload to appply post segmentation on VWO campaign reports.
   * @param {Object} configObj
   * @param {String} userId
   * @param {String} eventName
   * @param {Object} customDimensionMap
   * @returns push payload
   */
  getPushPayloadData(configObj, userId, eventName, customDimensionMap) {
    const properties = this.getEventBasePayload(configObj, userId, eventName);

    properties.d.event.props.isCustomEvent = true;

    Object.keys(customDimensionMap).forEach(function(key) {
      const tagValue = DataTypeUtil.isString(customDimensionMap[key])
        ? customDimensionMap[key]
        : JSON.stringify(customDimensionMap[key]);
      properties.d.event.props.$visitor.props[key] = tagValue;
      properties.d.visitor.props[key] = tagValue;
    });

    logger.log(
      LogLevelEnum.DEBUG,
      LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.IMPRESSION_FOR_EVENT_ARCH_PUSH, {
        file: FileNameEnum.ImpressionUtil,
        accountId: configObj.accountId,
        userId,
        property: JSON.stringify(customDimensionMap)
      })
    );

    return properties;
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
