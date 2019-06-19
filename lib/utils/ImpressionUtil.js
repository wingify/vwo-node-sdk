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
   * Trigger the goal by sending it to server
   *
   * @param {String} userId the unique ID assigned to a user
   * @param {String} campaignId, the Campaign ID
   * @param {Number} variationId, the Variation ID
   * @param {String} goalId, the Goal ID
   * @param {String} revenue, the revenue generated on conversion
   *
   * @return null if campaign ID or variation ID is invalid
   */
  buildEvent: (configObj, expId, variationId, userId, goalId = null, revenue = null) => {
    const { accountId } = configObj;

    let isTrackUserAPI;
    let isTrackGoalAPI;

    if (goalId !== undefined && goalId !== null) {
      isTrackGoalAPI = true;
    } else {
      isTrackUserAPI = true;
    }

    let properties = {
      account_id: accountId,
      experiment_id: expId,
      platform: Constants.PLATFORM,
      uId: userId,
      combination: variationId,
      random: FunctionUtil.getRandomNumber(),
      sId: FunctionUtil.getCurrentUnixTimestamp(),
      u: UuidUtil.generateFor(userId, accountId),
      ed: JSON.stringify({ p: 'server' })
    };

    if (isTrackUserAPI) {
      properties.url = Constants.ENDPOINTS.BASE_URL + Constants.ENDPOINTS.TRACK_USER;

      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.IMPRESSION_FOR_TRACK_USER, {
          file: FileNameEnum.ImpressionUtil,
          properties: JSON.stringify(properties)
        })
      );
    } else if (isTrackGoalAPI) {
      properties.url = Constants.ENDPOINTS.BASE_URL + Constants.ENDPOINTS.TRACK_GOAL;

      properties['goal_id'] = goalId;
      if (ValidateUtil.isValidValue(revenue)) {
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
