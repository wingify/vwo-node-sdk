const ValidateUtil = require('../utils/ValidateUtil');

const Bucketer = require('./BucketingService');

const logging = require('../logging');
const FileNameEnum = require('../enums/FileNameEnum');
const { LogLevelEnum, LogMessageEnum, LogMessageUtil } = logging;
const logger = logging.getLogger();

const VariationDecider = {
  /**
   * Returns the Variation Allotted to User
   *
   * @param {String} userId the unique ID assigned to User
   * @param {Object} campaign
   *
   * @return {Object} Variation object allotted to User
   */
  getVariationAllotted: (userId, campaign) => {
    let response = {
      variationId: null,
      variationName: null
    };

    if (!ValidateUtil.isValidValue(userId)) {
      logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.INVALID_USER_ID, {
          file: FileNameEnum.BucketingService,
          userId,
          method: 'getVariationAllotted'
        })
      );

      return response;
    }

    if (Bucketer.isUserPartOfCampaign(userId, campaign)) {
      let variation = VariationDecider.getVariationOfCampaignForUser(userId, campaign);

      response.variationId = variation.id;
      response.variationName = variation.name;

      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.GOT_VARIATION_FOR_USER, {
          file: FileNameEnum.VariationDecider,
          variationName: variation.name,
          userId,
          campaignTestKey: campaign.key,
          method: 'getVariationAllotted'
        })
      );
    } else {
      logger.log(
        LogLevelEnum.DEBUG,
        LogMessageUtil.build(LogMessageEnum.DEBUG_MESSAGES.USER_NOT_PART_OF_CAMPAIGN, {
          file: FileNameEnum.VariationDecider,
          userId,
          campaignTestKey: campaign.key,
          method: 'getVariationAllotted'
        })
      );
    }

    return response;
  },

  /**
   * Assigns random variation ID to a particular user depending on the PercentTraffic.
   * Makes user a part of campaign if user's included in Traffic.
   *
   * @param {String} userId the unique ID assigned to a user
   * @param {Object} campaign the Campaign of which user is to be made a part of
   *
   * @return {Object|null} Variation allotted to User
   */
  getVariationOfCampaignForUser: (userId, campaign) => {
    if (!ValidateUtil.isValidValue(userId)) {
      logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.INVALID_USER_ID, {
          file: FileNameEnum.BucketingService,
          userId,
          method: 'getVariationOfCampaignForUser'
        })
      );

      return null;
    }

    if (!campaign) {
      logger.log(
        LogLevelEnum.ERROR,
        LogMessageUtil.build(LogMessageEnum.ERROR_MESSAGES.INVALID_CAMPAIGN, {
          file: FileNameEnum.BucketingService,
          method: 'getVariationOfCampaignForUser'
        })
      );

      return null;
    }

    let variation = Bucketer.bucketUserToVariation(userId, campaign);

    if (variation && variation.name) {
      logger.log(
        LogLevelEnum.INFO,
        LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.GOT_VARIATION_FOR_USER, {
          file: FileNameEnum.VariationDecider,
          variationName: variation.name,
          userId,
          campaignTestKey: campaign.key
        })
      );
      return {
        name: variation.name,
        id: variation.id
      };
    }

    logger.log(
      LogLevelEnum.INFO,
      LogMessageUtil.build(LogMessageEnum.INFO_MESSAGES.USER_GOT_NO_VARIATION, {
        file: FileNameEnum.VariationDecider,
        userId,
        campaignTestKey: campaign.key
      })
    );

    return null;
  }
};

module.exports = VariationDecider;
