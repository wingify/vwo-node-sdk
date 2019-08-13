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
  buildEvent: (configObj, campaignTestKey, variationId, userId, goalId = null, revenue = null) => {
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
